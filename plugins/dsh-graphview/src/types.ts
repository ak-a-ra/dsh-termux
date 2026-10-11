/**
 * dsh-graphview type contracts.
 *
 * These mirror noema's on-disk MemoryRecord frontmatter (see
 * noema-core `crates/noema-core/src/memory.rs`) so the adapter can project
 * traces straight into a graph without going through the noema-mcp binary at
 * read time. That is what makes a live graph viable on Termux even while the
 * bundled noema-mcp (glibc) binary cannot run under bionic.
 */

/** Memory kind — drives node color/shape in the graph (Obsidian "type" styling). */
export type MemoryKind =
  | 'preference'
  | 'decision'
  | 'constraint'
  | 'fact'
  | 'reference'
  | 'workflow'
  | 'warning'
  | 'error_fix'
  | string

/** Explicit typed edge between two memory records (`links[].rel` + `target`). */
export interface GraphLink {
  source: string
  target: string
  /** Relationship type from noema `MemoryLink.rel` (e.g. "references","depends_on"). */
  type: string
}

/** Derived (non-stored) edges used only when implicit edges are toggled on. */
export type ImplicitEdge = 'shared_tag' | 'shared_entity' | 'same_scope'

export interface GraphNode {
  id: string
  title: string | null
  /** noema `kind` — node category for styling. */
  kind: MemoryKind
  tags: string[]
  /** noema `entities` — anchors for implicit edge synthesis. */
  entities: string[]
  importance: number   // 0..1
  confidence: number  // 0..1
  scope: 'user' | 'project' | 'team' | 'org'
  status: 'active' | 'tombstoned'
  createdAt: string   // RFC3339
  updatedAt: string   // RFC3339
  /** short body excerpt for the node tooltip / label. */
  body: string
  /** relative path under NOEMA_ROOT (for "open in editor" actions). */
  path: string
  /** code anchor, if any (repo/paths/symbols) — linkable to IDE. */
  code?: { repo?: string; paths?: string[]; symbols?: string[]; lang?: string }
}

/** A complete node+link snapshot, the unit the viz renders. */
export interface GraphSnapshot {
  capturedAt: string
  /** noema root the snapshot was read from. */
  root: string
  /** all memory nodes (tombstoned included — filter client-side). */
  nodes: GraphNode[]
  /** explicit stored links only. */
  links: GraphLink[]
  /** whether implicit edges are currently materialized. */
  implicitEdges: boolean
}

/** One saved named graph view (mirrors Extended Graph "multiple views"). */
export interface GraphView {
  id: string
  name: string
  /** node kind filter (empty = all). */
  kinds: MemoryKind[]
  /** tag filter (any match shows node). */
  tags: string[]
  /** hidden explicit relationship types. */
  hiddenLinkTypes: string[]
  /** whether implicit edges are shown in this view. */
  implicitEdges: boolean
  /** hide tombstoned memories in this view. */
  hideTombstoned: boolean
  /** focus node id, or null for full graph. */
  focus: string | null
  /** layout preset. */
  layout: 'spring' | 'cose' | 'circle' | 'grid'
  /** camera state (zoom / pan) — optional, restored on load. */
  camera?: { x: number; y: number; zoom: number }
}

/** Adapter reads noema markdown traces and produces a snapshot. */
export interface MemoryAdapter {
  /** Absolute NOEMA_ROOT (env NOEMA_ROOT or dsh-noema setting). */
  readonly root: string
  /** Read + parse every memory trace under root → snapshot (explicit links only). */
  readSnapshot(): Promise<GraphSnapshot>
  /** Watch root for trace changes and emit diffs (for live refresh). */
  watch(cb: (snap: GraphSnapshot) => void): Unsub
}
export type Unsub = () => void
