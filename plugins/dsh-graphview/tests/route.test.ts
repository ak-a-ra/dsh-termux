import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseQuery, project } from '../src/project.js'
import { NoemaFilesystemAdapter } from '../src/memory-adapter.js'
import type { GraphSnapshot } from '../src/memory-adapter.js'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Same synthetic store shape as adapter.test.ts but built in-memory: a (fact),
// b (preference), c (constraint, tombstoned), links a->b (depends_on), b->c (references).
const snap: GraphSnapshot = {
  capturedAt: '2026-10-11T18:00:00Z',
  root: '/fake/noema/root',
  nodes: [
    { id: 'a', title: null, kind: 'fact', tags: ['demo'], entities: ['memory'], importance: 0.5, confidence: 1, scope: 'user', status: 'active', createdAt: '', updatedAt: '', body: 'b', path: 'a.md' },
    { id: 'b', title: null, kind: 'preference', tags: ['demo', 'user'], entities: ['memory'], importance: 0.7, confidence: 1, scope: 'user', status: 'active', createdAt: '', updatedAt: '', body: 'b', path: 'b.md' },
    { id: 'c', title: null, kind: 'constraint', tags: ['graph'], entities: ['memory'], importance: 0.9, confidence: 1, scope: 'user', status: 'tombstoned', createdAt: '', updatedAt: '', body: 'b', path: 'c.md' },
  ],
  links: [
    { source: 'a', target: 'b', type: 'depends_on' },
    { source: 'b', target: 'c', type: 'references' },
  ],
  implicitEdges: false,
}

test('parseQuery defaults + parsing', () => {
  const empty = parseQuery(new URLSearchParams(''))
  assert.deepEqual(empty.kinds, [])
  assert.equal(empty.implicitEdges, false)
  assert.equal(empty.hideTombstoned, true)
  assert.equal(empty.focus, null)

  const q = parseQuery(new URLSearchParams('kinds=fact,preference&tags=demo&hiddenLinkTypes=references&implicitEdges=true&hideTombstoned=false&focus=b'))
  assert.deepEqual(q.kinds, ['fact', 'preference'])
  assert.deepEqual(q.tags, ['demo'])
  assert.deepEqual(q.hiddenLinkTypes, ['references'])
  assert.equal(q.implicitEdges, true)
  assert.equal(q.hideTombstoned, false)
  assert.equal(q.focus, 'b')
})

test('project default: hides tombstoned c -> 2 nodes, 1 edge (a->b)', () => {
  const r = project(snap, parseQuery(new URLSearchParams('')))
  const ids = r.nodes.map(n => n.id).sort()
  assert.deepEqual(ids, ['a', 'b'])
  assert.equal(r.links.length, 1)
  assert.equal(r.links[0].type, 'depends_on')
  assert.equal(r.implicitEdges, false)
})

test('project implicitEdges=true adds shared_entity edges among visible', () => {
  // a,b share entity 'memory' -> +1 implicit edge a-b ; c hidden by default
  const r = project(snap, parseQuery(new URLSearchParams('implicitEdges=true')))
  assert.equal(r.links.length, 2) // 1 explicit + 1 implicit a-b
  assert.ok(r.links.some(l => l.type === 'shared_entity'))
})

test('project kinds=fact returns only a', () => {
  const r = project(snap, parseQuery(new URLSearchParams('kinds=fact')))
  assert.equal(r.nodes.length, 1)
  assert.equal(r.nodes[0].id, 'a')
  assert.equal(r.links.length, 0) // a->b dropped because b filtered out
})

test('project tags=graph (any-match) -> c has graph; c tombstoned so hidden -> 0 nodes', () => {
  const r = project(snap, parseQuery(new URLSearchParams('tags=graph')))
  assert.equal(r.nodes.length, 0)
})

test('project tags=graph + hideTombstoned=false shows c', () => {
  const r = project(snap, parseQuery(new URLSearchParams('tags=graph&hideTombstoned=false')))
  assert.deepEqual(r.nodes.map(n => n.id), ['c'])
})

test('project hiddenLinkTypes=references drops b->c edge', () => {
  const r = project(snap, parseQuery(new URLSearchParams('hideTombstoned=false&hiddenLinkTypes=references')))
  // c visible; a->b kept; b->c dropped
  assert.equal(r.links.length, 1)
  assert.equal(r.links[0].type, 'depends_on')
})

test('project focus=b keeps b + ego {a,c} -> 3 nodes, 2 edges', () => {
  const r = project(snap, parseQuery(new URLSearchParams('focus=b&hideTombstoned=false')))
  const ids = r.nodes.map(n => n.id).sort()
  assert.deepEqual(ids, ['a', 'b', 'c'])
  assert.equal(r.links.length, 2)
})

test('adapter readSnapshot end-to-end against real noema frontmatter (integration)', async () => {
  // Build a real trace fixture using NoemaFilesystemAdapter.parseTrace shape,
  // then round-trip through project() to confirm schema alignment.
  const mk = (id: string, kind: string, body: string) =>
    '---json\n' + JSON.stringify({ id, scope: 'user', layer: 'cortex', kind,
      confidence: 1, importance: 0.5, sensitivity: 'internal', tags: [kind],
      entities: ['integration'], links: [], source: { kind: 'manual', agent: 't' },
      status: 'active', use_count: 0, created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z' }) + '\n---\n' + body + '\n'
  const dir = join(tmpdir(), 'gv-route-' + process.pid)
  await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, 'm1.md'), mk('m1', 'fact', 'anchor'))
  const adapter = new NoemaFilesystemAdapter(dir)
  const r = project(await adapter.readSnapshot(), parseQuery(new URLSearchParams('')))
  assert.equal(r.nodes.length, 1)
  assert.equal(r.nodes[0].kind, 'fact')
  assert.equal(r.nodes[0].entities[0], 'integration')
  await rm(dir, { recursive: true, force: true })
})
