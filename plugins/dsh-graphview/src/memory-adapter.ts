/**
 * memory-adapter.ts
 *
 * Reads noema's on-disk markdown traces directly from $NOEMA_ROOT. Each trace
 * is a markdown file whose frontmatter is a JSON block fenced by `---json\n` /
 * `\n---\n` (see noema-core `frontmatter.rs`). We parse the frontmatter into
 * GraphNodes and the `links` array into GraphLinks. No noema-mcp binary is
 * needed at read time — this is purely filesystem access, mirroring how
 * Obsidian reads its vault. That's what makes the graph usable on Termux
 * (bionic) even though the bundled noema-mcp is glibc-only.
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import type { GraphLink, GraphNode, GraphSnapshot, MemoryAdapter } from './types.js'

const TRACE_EXT = '.md'
const META_MARKER = '---json\n'

/** noema MemoryRecord frontmatter (only the fields we graph). */
interface NoemaFrontmatter {
  id: string
  scope?: string
  layer?: string
  kind: string
  confidence?: number
  importance?: number
  sensitivity?: string
  tags?: string[]
  entities?: string[]
  links?: Array<{ rel: string; target: string }>
  source?: { kind?: string; agent?: string; uri?: string }
  status?: 'active' | 'tombstoned'
  use_count?: number
  created_at: string
  updated_at: string
  last_used_at?: string | null
  code?: {
    repo?: string
    paths?: string[]
    symbols?: string[]
    head_commit?: string
    ref_commits?: string[]
    lang?: string
    error_sig?: string
    commands?: string[]
  }
}

export function resolveNoemaRoot(explicit?: string): string {
  if (explicit && explicit.length > 0) return explicit
  const env = process.env.NOEMA_ROOT
  if (env && env.length > 0) return env
  // dsh-noema default; override via settings if wired up.
  return join(process.env.HOME ?? process.cwd(), '.agent-memory')
}

export function platformScope(v: string | undefined): GraphNode['scope'] {
  if (v === 'project') return 'project'
  if (v === 'team') return 'team'
  if (v === 'org') return 'org'
  return 'user'
}

/** Extract a short title-ish / body excerpt (first non-empty line, trimmed). */
function excerpt(body: string): string {
  const first = body.split('\n').find(l => l.trim().length > 0)
  const line = first ?? ''
  return line.length > 160 ? line.slice(0, 157) + '…' : line
}

/** Parse one trace file into a node or return null if not a noema trace. */
export async function parseTrace(file: string, root: string): Promise<GraphNode | null> {
  const raw = await readFile(file, 'utf8').catch(() => null)
  if (raw === null) return null
  if (!raw.startsWith(META_MARKER)) return null // not a noema trace
  const end = raw.indexOf('\n---\n', META_MARKER.length)
  if (end === -1) return null
  let fm: NoemaFrontmatter
  try {
    fm = JSON.parse(raw.slice(META_MARKER.length, end))
  } catch {
    return null
  }
  // noema stores id like "mem_<base32>"; keep as-is.
  const body = raw.slice(end + '\n---\n'.length)
  return {
    id: fm.id,
    title: (fm.tags?.[0] ?? null), // no separate title field; first tag ≈ heading
    kind: fm.kind,
    tags: fm.tags ?? [],
    entities: fm.entities ?? [],
    importance: fm.importance ?? 0.5,
    confidence: fm.confidence ?? 1,
    scope: platformScope(fm.scope),
    status: fm.status ?? 'active',
    createdAt: fm.created_at,
    updatedAt: fm.updated_at,
    body: excerpt(body),
    path: relative(root, file),
    code: fm.code ? {
      repo: fm.code.repo,
      paths: fm.code.paths,
      symbols: fm.code.symbols,
      lang: fm.code.lang,
    } : undefined,
  }
}

/** Walk NOEMA_ROOT recursively collecting *.md traces. */
async function collectTraces(root: string, dir: string, out: string[]): Promise<void> {
  let entries: string[]
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      // skip node_modules-style; keep it shallow-first
      await collectTraces(root, full, out)
    } else if (e.isFile() && e.name.endsWith(TRACE_EXT) && !e.name.startsWith('README')) {
      out.push(full)
    }
  }
}

export class NoemaFilesystemAdapter implements MemoryAdapter {
  readonly root: string
  constructor(root?: string) {
    this.root = resolveNoemaRoot(root)
  }

  async readSnapshot(): Promise<GraphSnapshot> {
    const files: string[] = []
    await collectTraces(this.root, this.root, files)
    const nodes: GraphNode[] = []
    const links: GraphLink[] = []
    for (const f of files) {
      const n = await parseTrace(f, this.root)
      if (!n) continue
      nodes.push(n)
      for (const l of (await this._fm(f))?.links ?? []) links.push({ source: n.id, target: l.target, type: l.rel })
    }
    return { capturedAt: new Date().toISOString(), root: this.root, nodes, links, implicitEdges: false }
  }

  // internal: re-parse frontmatter to grab the links array (small duplication avoids
  // returning partial nodes from parseTrace just to read links).
  private async _fm(file: string): Promise<NoemaFrontmatter | null> {
    const raw = await readFile(file, 'utf8').catch(() => null)
    if (!raw || !raw.startsWith(META_MARKER)) return null
    const end = raw.indexOf('\n---\n', META_MARKER.length)
    if (end === -1) return null
    try { return JSON.parse(raw.slice(META_MARKER.length, end)) } catch { return null }
  }

  watch(cb: (snap: GraphSnapshot) => void): Unsub {
    // TODO: chokidar-style polling watch over traces/ for live refresh.
    // For Phase 1 the client calls `graphview_refresh` on demand.
    const iv = setInterval(() => { this.readSnapshot().then(cb).catch(() => {}) }, 10_000)
    return () => clearInterval(iv)
  }
}

export { MemoryAdapter }
