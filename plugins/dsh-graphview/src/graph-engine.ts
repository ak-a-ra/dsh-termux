/**
 * graph-engine.ts
 *
 * Pure projection of a GraphSnapshot into a filtered, focus-aware graphology
 * graph — the single source of truth the viz renders. Every policy (tombstoned
 * hide, kind/tag/link-type filter, focus neighbourhood, implicit-edge toggle)
 * is applied once in the constructor; `nodes()`/`edges()` always read from the
 * same built graph, so counts and rendering never disagree. Mirrors Obsidian
 * Extended Graph's view/filter/styling feature set, in process memory.
 */
import { Graph } from 'graphology'
import type { GraphLink, GraphNode, GraphSnapshot, GraphView, MemoryKind } from './types.js'

/** Immutable default view (every field required by the GraphView type). */
const DEFAULT_VIEW: Required<Pick<GraphView, 'kinds' | 'tags' | 'hiddenLinkTypes' | 'implicitEdges' | 'hideTombstoned' | 'focus' | 'layout'>> = {
  kinds: [], tags: [], hiddenLinkTypes: [], implicitEdges: false, hideTombstoned: true, focus: null, layout: 'spring',
}

export class GraphEngine {
  readonly snap: GraphSnapshot
  /** Active view (public so the host route can report e.g. implicitEdges). */
  view: typeof DEFAULT_VIEW
  /** The built, filtered, focus-aware graph. */
  readonly g: Graph<GraphNode, GraphLink & { implicit?: string }>

  constructor(snap: GraphSnapshot, view: Partial<GraphView> = {}) {
    this.snap = snap
    this.view = { ...DEFAULT_VIEW, ...view }
    this.g = this.build()
  }

  /** Visible nodes (from the built graph — respects focus + all filters). */
  nodes(): GraphNode[] {
    return this.g.nodes().map(id => this.g.getNodeAttributes(id) as GraphNode)
  }
  /** Visible edges (explicit + optional implicit, respecting link-type filter). */
  edges(): Array<GraphLink & { implicit?: string }> {
    return this.g.edges().map(e => this.g.getEdgeAttributes(e) as GraphLink & { implicit?: string })
  }
  /** The graphology graph for the renderer. */
  graph(): Graph<GraphNode, GraphLink & { implicit?: string }> {
    return this.g
  }

  /** Rebuild with a view patch (immutable — returns a new engine). */
  setView(patch: Partial<GraphView>): GraphEngine {
    return new GraphEngine(this.snap, { ...this.view, ...patch })
  }

  /** Node kind → human label (for tooltips). */
  kindLabel(n: GraphNode): string { return n.kind }
  /** Edge type → human label. */
  edgeLabel(l: GraphLink): string { return l.type || 'linked' }

  /** Which ids survive the visibility + focus rules. */
  private visibleIds(): Set<string> {
    const base = this.snap.nodes.filter(n => this.showNode(n)).map(n => n.id)
    let ids: string[] = base
    if (this.view.focus) ids = base.filter(id => this.egoSet(this.view.focus!, 1).has(id))
    return new Set(ids)
  }

  /** ids at graph distance <= `depth` from `focus` (incl. focus itself). */
  private egoSet(focus: string, depth: number): Set<string> {
    const keep = new Set<string>([focus])
    let frontier: string[] = [focus]
    for (let d = 0; d < depth; ++d) {
      const next: string[] = []
      for (const f of frontier) {
        for (const l of this.snap.links) {
          const other = l.source === f ? l.target : l.target === f ? l.source : null
          if (other !== null && !keep.has(other)) { keep.add(other); next.push(other) }
        }
      }
      frontier = next
    }
    return keep
  }

  private showNode(n: GraphNode): boolean {
    if (this.view.hideTombstoned && n.status === 'tombstoned') return false
    if (this.view.kinds.length > 0 && !this.view.kinds.includes(n.kind as MemoryKind)) return false
    if (this.view.tags.length > 0 && !n.tags.some(t => this.view.tags.includes(t))) return false
    return true
  }

  private build(): Graph<GraphNode, GraphLink & { implicit?: string }> {
    // multi:true so an explicit link (e.g. depends_on) can coexist with an
    // implicit shared_entity edge between the same two memories.
    const g = new Graph<GraphNode, GraphLink & { implicit?: string }>({ multi: true })
    const ids = this.visibleIds()
    for (const n of this.snap.nodes) if (ids.has(n.id)) g.addNode(n.id, n)
    // explicit links (respecting link-type filter)
    for (const l of this.snap.links) {
      if (this.view.hiddenLinkTypes.includes(l.type)) continue
      if (!ids.has(l.source) || !ids.has(l.target)) continue
      g.addEdge(l.source, l.target, l)
    }
    // implicit entity-edges (toggleable, like Juggl implicit links)
    if (this.view.implicitEdges) {
      const visible: GraphNode[] = []
      for (const id of ids) {
        const n = this.snap.nodes.find(x => x.id === id)
        if (n) visible.push(n)
      }
      for (const l of synthesizeImplicit(visible)) {
        if (!ids.has(l.source) || !ids.has(l.target)) continue
        g.addEdge(l.source, l.target, l)
      }
    }
    return g
  }
}

/** Synthesize one shared-entity edge per unordered node pair (dedup so a pair
 *  linked by two entities yields a single implicit edge, not a double line). */
export function synthesizeImplicit(nodes: GraphNode[]): Array<GraphLink & { implicit: 'shared_entity' }> {
  const byEntity = new Map<string, string[]>()
  for (const n of nodes) for (const e of n.entities) {
    const arr = byEntity.get(e) ?? []
    arr.push(n.id)
    byEntity.set(e, arr)
  }
  const out: Array<GraphLink & { implicit: 'shared_entity' }> = []
  const seen = new Set<string>()
  for (const ids of byEntity.values()) {
    if (ids.length < 2) continue
    for (let i = 0; i < ids.length; ++i)
      for (let j = i + 1; j < ids.length; ++j) {
        const key = ids[i] < ids[j] ? ids[i] + '\0' + ids[j] : ids[j] + '\0' + ids[i]
        if (seen.has(key)) continue
        seen.add(key)
        out.push({ source: ids[i], target: ids[j], type: 'shared_entity', implicit: 'shared_entity' })
      }
  }
  return out
}

void DEFAULT_VIEW
