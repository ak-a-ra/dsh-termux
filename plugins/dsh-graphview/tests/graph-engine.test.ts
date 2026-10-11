import { test } from 'node:test'
import assert from 'node:assert/strict'
import { GraphEngine } from '../src/graph-engine.js'
import type { GraphSnapshot, GraphNode, GraphLink } from '../src/types.js'

function mkNode(id: string, kind: string, tags: string[], entities: string[], status: 'active' | 'tombstoned' = 'active'): GraphNode {
  return { id, title: null, kind, tags, entities, importance: 0.5, confidence: 1, scope: 'user',
    status, createdAt: '2026-10-11T00:00:00Z', updatedAt: '2026-10-11T00:00:00Z', body: 'b', path: id + '.md' }
}

const nodes: GraphNode[] = [
  mkNode('a', 'fact', ['demo', 'graph'], ['memory', 'term']),       // a
  mkNode('b', 'preference', ['demo', 'user'], ['memory']),         // b
  mkNode('c', 'constraint', ['graph'], ['memory'], 'tombstoned'),   // c (tombstoned)
]
const links: GraphLink[] = [
  { source: 'a', target: 'b', type: 'depends_on' },
  { source: 'b', target: 'c', type: 'references' },
]
const snap: GraphSnapshot = { capturedAt: 't', root: '/r', nodes, links, implicitEdges: false }

test('default view: hides tombstoned, 2 nodes / 1 visible edge', () => {
  const g = new GraphEngine(snap)
  assert.equal(g.nodes().length, 2)
  // a->b visible; b->c hidden because c is tombstoned
  assert.equal(g.edges().length, 1)
  assert.equal(g.edges()[0].type, 'depends_on')
})

test('setView hideTombstoned:false shows all 3 nodes', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false })
  assert.equal(g.nodes().length, 3)
  // a->b + b->c both visible
  assert.equal(g.edges().length, 2)
})

test('kind filter keeps only matching kinds', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, kinds: ['fact'] })
  assert.equal(g.nodes().length, 1)
  assert.equal(g.nodes()[0].id, 'a')
})

test('tag filter (any-match) keeps a,b only', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, tags: ['demo'] })
  const ids = g.nodes().map(n => n.id).sort()
  assert.deepEqual(ids, ['a', 'b'])
})

test('hiddenLinkTypes strips depends_on', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, hiddenLinkTypes: ['depends_on'] })
  assert.equal(g.edges().length, 1)
  assert.equal(g.edges()[0].type, 'references')
})

test('implicitEdges synthesizes shared_entity edges (a-b, a-c, b-c)', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, implicitEdges: true })
  // 2 explicit + 3 implicit (all 3 share entity 'memory')
  assert.equal(g.edges().length, 5)
  assert.ok(g.edges().every(e => e.type === 'depends_on' || e.type === 'references' || e.type === 'shared_entity'))
})

test('focus:b restricts to ego (b + its neighbors a,c)', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, focus: 'b' })
  const ids = g.nodes().map(n => n.id).sort()
  assert.deepEqual(ids, ['a', 'b', 'c'])
  // focused subgraph keeps edges among a,b,c
  assert.equal(g.edges().length, 2)
})

test('focus on a keeps a + its only neighbor b', () => {
  const g = new GraphEngine(snap, { hideTombstoned: false, focus: 'a' })
  const ids = g.nodes().map(n => n.id).sort()
  assert.deepEqual(ids, ['a', 'b'])
  assert.equal(g.edges().length, 1)
})

test('setView is immutable (returns a new engine, original unchanged)', () => {
  const g0 = new GraphEngine(snap)
  const g1 = g0.setView({ kinds: ['fact'] })
  assert.notEqual(g0, g1)
  assert.equal(g0.nodes().length, 2)   // original unchanged
  assert.equal(g1.nodes().length, 1)  // filtered
})
