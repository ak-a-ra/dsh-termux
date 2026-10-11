/**
 * dsh-graphview — host-side plugin entry.
 *
 * Reads noema memory traces from $NOEMA_ROOT (no binary needed at read time),
 * projects them into a graph snapshot, and serves:
 *  1. a loopback HTTP route (`/noema-graphview/snapshot`) the Web client polls,
 *  2. a model-facing `graphview_refresh` tool (forces a re-read + cache bust).
 *
 * Mounts into the profile via cordis.patch.yml. Effect-scoped: every
 * registration is disposed when the plugin fiber unmounts. The route logic is
 * split into pure `parseQuery`/`project` functions so it is unit-testable
 * without a live Cordis host.
 */
import type { Context } from '@deepseek-ai/cordis'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { NoemaFilesystemAdapter } from './memory-adapter.js'
import type { GraphSnapshot } from './memory-adapter.js'
import { GraphEngine } from './graph-engine.js'
import { parseQuery, project } from './project.js'
import type { RouteResponse, GraphQueryParams } from './project.js'
import type { GraphSnapshot } from './memory-adapter.js'
import type { GraphView } from './types.js'

export const name = 'dsh-graphview'
/** tools for the refresh tool; memory adapter is pure FS so no other inject needed. */
export const inject = ['tools']

export interface GraphviewConfig {
  enabled?: boolean
  /** Override the memory root (else $NOEMA_ROOT or ~/.agent-memory). */
  memoryRoot?: string
}

let activeAdapter: NoemaFilesystemAdapter | null = null
let cached: GraphSnapshot | null = null
let cacheMs = 0
const CACHE_TTL = 2000

export function createAdapter(root?: string): NoemaFilesystemAdapter {
  return new NoemaFilesystemAdapter(root)
}

export function resetCache(): void {
  cached = null
  cacheMs = 0
}

export async function readSnapshot(adapter: NoemaFilesystemAdapter): Promise<GraphSnapshot> {
  const now = Date.now()
  if (cached && now - cacheMs < CACHE_TTL) return cached
  cached = await adapter.readSnapshot()
  cacheMs = now
  return cached
}

export async function apply(ctx: Context, config: GraphviewConfig = {}): Promise<() => Promise<void>> {
  const hostCtx = ctx as Context & { tools: { register: (t: unknown) => () => void } }
  const adapter = activeAdapter ?? createAdapter(config?.memoryRoot)
  activeAdapter = adapter
  const root = adapter.root

  ctx.logger.info('dsh-graphview mounted (root: ' + root + ')')

  const disposers: Array<() => void> = []

  // 1. model-facing tool: force a refresh of the cached snapshot.
  disposers.push(
    hostCtx.tools.register(
      defineTool({
        name: 'graphview_refresh',
        description: 'Reload the memory graph from disk. Call after writing memories (e.g. noema_remember / noema_import) so the graph view picks up new nodes and links without waiting for the cache TTL.',
        parameters: { root: { type: 'string', description: 'Override NOEMA_ROOT to scan (optional).' } },
        output: {
          schema: { type: 'object', additionalProperties: false, properties: { ok: { type: 'boolean', required: true }, nodes: { type: 'number', required: true }, links: { type: 'number', required: true }, root: { type: 'string', required: true }, refreshedAt: { type: 'string', required: true } } },
          render: (_args, v) => [{ type: 'text', text: `graph refreshed: ${v.nodes} nodes / ${v.links} links from ${v.root}` }],
        },
        async execute(args) {
          const snap = await new NoemaFilesystemAdapter(args.root as string | undefined).readSnapshot()
          cached = snap
          cacheMs = Date.now()
          return { ok: true, nodes: snap.nodes.length, links: snap.links.length, root: snap.root, refreshedAt: snap.capturedAt }
        },
      }),
    ),
  )

  // 2. loopback route for the Web client panel to fetch a filtered snapshot.
  //    Only mounts when a webServer service exists (headless profiles skip).
  ctx.inject(['webServer'], (wc: Context & { webServer: { register: (k: string, fn: (req: unknown) => Promise<unknown>) => void } }) => {
    const webServer = wc.webServer
    const handler = async (req: { searchParams?: URLSearchParams }): Promise<RouteResponse> => {
      const params = req.searchParams ?? new URLSearchParams()
      const snap = await readSnapshot(adapter)
      return project(snap, parseQuery(params))
    }
    const dispose = webServer.register('/noema-graphview/snapshot', handler as (req: unknown) => Promise<unknown>)
    return () => (typeof dispose === 'function' ? dispose() : undefined)
  })

  return async () => {
    for (const d of disposers.reverse()) await d()
    cached = null
    activeAdapter = null
  }
}

export { parseQuery, project, GraphEngine }
export type { GraphviewConfig, GraphSnapshot, GraphQueryParams, RouteResponse, GraphView }
