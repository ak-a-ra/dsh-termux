import { test } from 'node:test'
import assert from 'node:assert/strict'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { NoemaFilesystemAdapter } from '../src/memory-adapter.js'

test('default root resolves to ~/.agent-memory when NOEMA_ROOT unset', () => {
  const adapter = new NoemaFilesystemAdapter()
  const expected = join(homedir(), '.agent-memory')
  // If the env override is set, honor it; otherwise the dsh-noema default.
  const want = process.env.NOEMA_ROOT ?? expected
  assert.equal(adapter.root, want)
})

test('readSnapshot on an empty/absent store is graceful (no throw, empty arrays)', async () => {
  const adapter = new NoemaFilesystemAdapter()
  const snap = await adapter.readSnapshot()
  assert.equal(snap.root, adapter.root)
  assert.equal(snap.implicitEdges, false)
  assert.equal(Array.isArray(snap.nodes), true)
  assert.equal(Array.isArray(snap.links), true)
  assert.ok(typeof snap.capturedAt === 'string')
})
