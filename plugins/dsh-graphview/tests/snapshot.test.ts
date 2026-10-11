/** Smoke test for the memory-adapter's noema frontmatter parser.
 *  Run:  node --test tests/*.test.ts   (Node 22+ built-in test runner)
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('frontmatter JSON fence is parsed into id + kind', () => {
  const raw = '---json\n{"id":"mem_anchor","kind":"preference"}\n---\nbody line\n'
  assert.ok(raw.startsWith('---json\n'))
  const end = raw.indexOf('\n---\n', '---json\n'.length)
  assert.ok(end > 0)
  const fm = JSON.parse(raw.slice('---json\n'.length, end))
  assert.equal(fm.id, 'mem_anchor')
  assert.equal(fm.kind, 'preference')
})
