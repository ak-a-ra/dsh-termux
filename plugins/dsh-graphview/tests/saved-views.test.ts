import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadViews, saveView, deleteView, cloneQuery, VIEWS_KEY } from '../src/client/saved-views.js'
import type { ViewQuery } from '../src/client/saved-views.js'

function fakeStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  }
}

const base: ViewQuery = {
  kinds: ['fact'], tags: ['a'], hiddenLinkTypes: [], implicitEdges: true, hideTombstoned: true, focus: null,
}

test('saved-views: empty storage returns []', () => {
  assert.deepEqual(loadViews(fakeStorage() as unknown as Storage), [])
})

test('saved-views: save then load round-trips', () => {
  const s = fakeStorage() as unknown as Storage
  const views = saveView(s, 'core', base)
  assert.equal(views.length, 1)
  assert.equal(views[0].name, 'core')
  assert.equal(views[0].query.implicitEdges, true)
  assert.deepEqual(loadViews(s), views)
})

test('saved-views: re-saving same name replaces, order preserved', () => {
  const s = fakeStorage() as unknown as Storage
  saveView(s, 'a', base)
  saveView(s, 'b', { ...base, tags: [] })
  const views = saveView(s, 'a', { ...base, focus: 'x' })
  assert.deepEqual(views.map(v => v.name), ['b', 'a'])
  assert.equal(views[1].query.focus, 'x')
})

test('saved-views: blank name rejected', () => {
  const s = fakeStorage() as unknown as Storage
  assert.throws(() => saveView(s, '   ', base))
})

test('saved-views: delete removes, deleting last empties storage', () => {
  const s = fakeStorage() as unknown as Storage
  saveView(s, 'a', base)
  let views = deleteView(s, 'a')
  assert.deepEqual(views, [])
  assert.equal(s.getItem(VIEWS_KEY), null)
})

test('saved-views: corrupt storage tolerated', () => {
  const s = fakeStorage() as unknown as Storage
  s.setItem(VIEWS_KEY, '{not json')
  assert.deepEqual(loadViews(s), [])
  s.setItem(VIEWS_KEY, '["garbage", {"name":"ok","query":{}}]')
  const views = loadViews(s)
  assert.equal(views.length, 1)
  assert.equal(views[0].name, 'ok')
})

test('saved-views: cloneQuery deep-copies arrays', () => {
  const c = cloneQuery(base)
  c.kinds.push('decision'); c.tags.push('zz')
  assert.deepEqual(base.kinds, ['fact'])
  assert.deepEqual(base.tags, ['a'])
  assert.equal(c.focus, base.focus)
})
