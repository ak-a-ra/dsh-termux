/**
 * project.ts — pure route logic (no host-peer imports).
 *
 * Decoupled from the Cordis glue so it is unit-testable in a standalone
 * bundle. The host `apply()` in index.ts wires these into the loopback route
 * and the settings panel; the model-facing tool re-reads directly.
 */
import { GraphEngine } from './graph-engine.js'
import type { GraphSnapshot } from './memory-adapter.js'
import type { GraphNode, GraphLink, GraphView } from './types.js'

/** Query-string shape consumed by the snapshot route + client toolbar. */
export interface GraphQueryParams {
  kinds: string[]
  tags: string[]
  hiddenLinkTypes: string[]
  implicitEdges: boolean
  hideTombstoned: boolean
  focus: string | null
}
export interface RouteResponse {
  nodes: GraphNode[]
  links: Array<GraphLink & { implicit?: string }>
  capturedAt: string
  root: string
  implicitEdges: boolean
}

/** Parse the route query string into a typed view (pure). */
export function parseQuery(params: URLSearchParams): GraphQueryParams {
  const list = (k: string): string[] => (params.get(k)?.split(',').filter(Boolean) ?? []) as string[]
  return {
    kinds: list('kinds'),
    tags: list('tags'),
    hiddenLinkTypes: list('hiddenLinkTypes'),
    implicitEdges: params.get('implicitEdges') === 'true',
    hideTombstoned: params.get('hideTombstoned') !== 'false',
    focus: params.get('focus') ?? null,
  }
}

/** Project a snapshot + query into the JSON the client renders (pure). */
export function project(snap: GraphSnapshot, qp: GraphQueryParams): RouteResponse {
  const engine = new GraphEngine(snap, {
    kinds: qp.kinds as string[] as GraphView['kinds'],
    tags: qp.tags,
    hiddenLinkTypes: qp.hiddenLinkTypes,
    implicitEdges: qp.implicitEdges,
    focus: qp.focus,
    hideTombstoned: qp.hideTombstoned,
    layout: 'spring',
  })
  return {
    nodes: engine.nodes(),
    links: engine.edges(),
    capturedAt: snap.capturedAt,
    root: snap.root,
    implicitEdges: engine.view.implicitEdges,
  }
}
