import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { NoemaFilesystemAdapter, parseTrace } from '../src/memory-adapter.js'

// pull in the frontmatter-fence smoke test too
import './snapshot.test'

const root = join(tmpdir(), 'dsh-graphview-test-' + process.pid)

function trace(id: string, body = 'hello ' + id) {
  return [
    '---json',
    JSON.stringify({
      id, scope: 'user', layer: 'cortex', kind: 'fact', confidence: 0.9,
      importance: 0.8, sensitivity: 'internal', tags: ['demo', 'graph'],
      entities: ['memory'], links: [], source: { kind: 'manual', agent: 'tester' },
      status: 'active', use_count: 1, created_at: '2026-10-11T10:00:00Z',
      updated_at: '2026-10-11T10:05:00Z',
    }),
    '---',
    body,
    '',
  ].join('\n')
}

// node B links to A (explicit typed edge), node C links to A
const A = trace('mem_a', 'the anchor fact')
const B = trace('mem_b', 'depends on anchor').replace(/"links":\s*\[\]/, '"links":[{"rel":"depends_on","target":"mem_a"}]')
const C = trace('mem_c', 'references anchor too').replace(/"links":\s*\[\]/, '"links":[{"rel":"references","target":"mem_a"}]')

test.before(async () => {
  await rm(root, { recursive: true, force: true })
  await mkdir(root, { recursive: true })
  await writeFile(join(root, 'mem_a.md'), A)
  await writeFile(join(root, 'mem_b.md'), B)
  await writeFile(join(root, 'mem_c.md'), C)
})
test.after(async () => { await rm(root, { recursive: true, force: true }) })

test('parseTrace extracts id + kind + title-tag', async () => {
  const node = await parseTrace(join(root, 'mem_a.md'), root)
  assert.ok(node)
  assert.equal(node.id, 'mem_a')
  assert.equal(node.kind, 'fact')
  assert.deepEqual(node.tags, ['demo', 'graph'])
  assert.equal(node.importance, 0.8)
  assert.equal(node.scope, 'user')
})

test('adapter reads snapshot: 3 nodes + 2 explicit links', async () => {
  const adapter = new NoemaFilesystemAdapter(root)
  const snap = await adapter.readSnapshot()
  assert.equal(snap.nodes.length, 3, 'expected 3 memory nodes')
  assert.equal(snap.links.length, 2, 'expected 2 explicit links')
  const depsOn = snap.links.filter(l => l.type === 'depends_on')
  assert.equal(depsOn.length, 1)
  assert.deepEqual(depsOn[0], { source: 'mem_b', target: 'mem_a', type: 'depends_on' })
})

test('snapshot has explicit-links-only by default (no implicit)', async () => {
  const snap = await new NoemaFilesystemAdapter(root).readSnapshot()
  assert.equal(snap.implicitEdges, false)
  // mem_b and mem_c share no entity that would make an implicit edge yet;
  // all three share entity 'memory' -> implicit would add C(3,2)=3 edges.
  assert.equal(snap.links.length, 2)
})
