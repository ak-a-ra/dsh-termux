/**
 * dsh-graphview — SVG export.
 *
 * sigma v2 renders to WebGL canvases, which cannot emit SVG via toDataURL, and
 * sigma has no built-in SVG exporter. So we serialize the projected graph
 * ourselves: nodes carry deterministic x/y (assigned by the client layout), so
 * this stays a pure function of Snapshot + options and is unit-testable.
 */

export interface SvgPoint { x: number; y: number }

export interface SvgNodeRef extends SvgPoint {
  id: string
  label: string
  color: string
  size: number
}

export interface SvgEdgeRef {
  source: string
  target: string
  color?: string
  dashed?: boolean
}

export interface SvgLayoutOptions {
  width?: number
  height?: number
  margin?: number
  background?: string
  showLabels?: boolean
  fontSize?: number
}

export function circularLayout(ids: string[], width: number, height: number, margin: number): Map<string, SvgPoint> {
  const pts = new Map<string, SvgPoint>()
  const cx = width / 2
  const cy = height / 2
  const rx = width / 2 - margin
  const ry = height / 2 - margin
  if (ids.length === 1) { pts.set(ids[0], { x: cx, y: cy }); return pts }
  ids.forEach((id, i) => {
    const angle = (2 * Math.PI * i) / ids.length - Math.PI / 2
    pts.set(id, { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) })
  })
  return pts
}

function esc(s: string): string {
  const AMP = String.fromCharCode(38) // & — written via charcode so the literal entity survives bundling
  return s.replace(/[&<>"]/g, ch => AMP + ({ '&': 'amp;', '<': 'lt;', '>': 'gt;', '"': 'quot;' } as Record<string, string>)[ch])
}

/** Render an SVG string. Throws when an edge references an unknown node. */
export function toSVG(nodes: SvgNodeRef[], edges: SvgEdgeRef[], opts: SvgLayoutOptions = {}): string {
  const width = opts.width ?? 1200
  const height = opts.height ?? 800
  const margin = opts.margin ?? 60
  const bg = opts.background ?? '#0f172a'
  const labels = opts.showLabels ?? true
  const fontSize = opts.fontSize ?? 11

  const byId = new Map(nodes.map(n => [n.id, n]))
  const parts: string[] = []
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`)
  parts.push(`<rect width="100%" height="100%" fill="${bg}"/>`)

  for (const e of edges) {
    const a = byId.get(e.source)
    const b = byId.get(e.target)
    if (!a || !b) throw new Error(`edge references unknown node: ${e.source} -> ${e.target}`)
    const dash = e.dashed ? ' stroke-dasharray="4 3"' : ''
    parts.push(`<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${e.color ?? '#475569'}" stroke-width="1"${dash}/>`)
  }

  for (const n of nodes) {
    parts.push(`<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.size.toFixed(1)}" fill="${n.color}"/>`)
    if (labels) {
      parts.push(`<text x="${(n.x + n.size + 4).toFixed(1)}" y="${(n.y + fontSize / 3).toFixed(1)}" fill="#e2e8f0" font-family="sans-serif" font-size="${fontSize}">${esc(n.label)}</text>`)
    }
  }

  parts.push('</svg>')
  return parts.join('\n')
}
