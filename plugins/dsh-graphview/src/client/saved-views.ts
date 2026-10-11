/**
 * dsh-graphview — saved named views.
 *
 * Pure logic, storage injected: the client passes localStorage, tests pass a
 * Map. A saved view is a named ViewQuery snapshot the user can re-apply.
 */

export interface ViewQuery {
  kinds: string[]
  tags: string[]
  hiddenLinkTypes: string[]
  implicitEdges: boolean
  hideTombstoned: boolean
  focus: string | null
}

export interface SavedView {
  name: string
  query: ViewQuery
  savedAt: string
}

export const VIEWS_KEY = 'dsh-graphview.views'

export function loadViews(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>): SavedView[] {
  try {
    const raw = storage.getItem(VIEWS_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isSavedView)
  } catch {
    return []
  }
}

export function saveView(
  storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>,
  name: string,
  query: ViewQuery,
): SavedView[] {
  const trimmed = name.trim()
  if (!trimmed) throw new Error('view name required')
  const views = loadViews(storage).filter(v => v.name !== trimmed)
  views.push({ name: trimmed, query: cloneQuery(query), savedAt: new Date().toISOString() })
  persist(storage, views)
  return views
}

export function deleteView(
  storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>,
  name: string,
): SavedView[] {
  const views = loadViews(storage).filter(v => v.name !== name)
  persist(storage, views)
  return views
}

function persist(storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>, views: SavedView[]): void {
  if (views.length === 0) storage.removeItem(VIEWS_KEY)
  else storage.setItem(VIEWS_KEY, JSON.stringify(views))
}

function isSavedView(v: unknown): v is SavedView {
  if (typeof v !== 'object' || v === null) return false
  const rec = v as Record<string, unknown>
  return typeof rec.name === 'string' && typeof rec.query === 'object' && rec.query !== null
}

export function cloneQuery(q: ViewQuery): ViewQuery {
  return {
    kinds: [...q.kinds], tags: [...q.tags], hiddenLinkTypes: [...q.hiddenLinkTypes],
    implicitEdges: q.implicitEdges, hideTombstoned: q.hideTombstoned, focus: q.focus,
  }
}
