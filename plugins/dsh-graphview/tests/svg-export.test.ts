import { test } from 'node:test'
import assert from 'node:assert/strict'
import { circularLayout, toSVG } from '../src/client/svg-export.js'

test('svg-export: circularLayout centers a single node', () => {
  const pts = circularLayout(['only'], 1000, 500, 50)
  assert.deepEqual(pts.get('only'), { x: 500, y: 250 })
})

test('svg-export: circularLayout spreads multiple nodes and honors margin', () => {
  const pts = circularLayout(['a', 'b', 'c', 'd'], 1000, 500, 50)
  const a = pts.get('a')!
  const c = pts.get('c')!
  // a and c are antipodal
  assert.ok(Math.abs((a.x + c.x) - 1000) < 1e-6)
  assert.ok(Math.abs((a.y + c.y) - 500) < 1e-6)
  // topmost node respects margin
  const ys = [...pts.values()].map(p => p.y)
  assert.ok(Math.min(...ys) >= 50 - 1e-6)
  assert.ok(Math.max(...ys) <= 450 + 1e-6)
})

test('svg-export: renders nodes, edges, labels, closes root', () => {
  const svg = toSVG(
    [
      { id: 'n1', x: 10, y: 20, label: 'Node <1>', color: '#ff0000', size: 5 },
      { id: 'n2', x: 100, y: 200, label: 'Node 2', color: '#00ff00', size: 8 },
    ],
    [{ source: 'n1', target: 'n2', color: '#123456', dashed: true }],
    { width: 300, height: 300 },
  )
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'))
  assert.ok(svg.trimEnd().endsWith('</svg>'))
  assert.ok(svg.includes('<line x1="10.0" y1="20.0" x2="100.0" y2="200.0" stroke="#123456" stroke-width="1" stroke-dasharray="4 3"/>'))
  assert.ok(svg.includes('<circle cx="100.0" cy="200.0" r="8.0" fill="#00ff00"/>'))
  assert.ok(svg.includes('font-size="11"'))
})

test('svg-export: escapes XML specials in labels', () => {
  const svg = toSVG([{ id: 'n', x: 0, y: 0, label: 'a<b>&"c', color: '#fff', size: 3 }], [])
  const AMP = String.fromCharCode(38)
  assert.ok(svg.includes(`a${AMP}lt;b${AMP}gt;${AMP}amp;${AMP}quot;c`))
  assert.ok(!/a<b>&"c/.test(svg))
})

test('svg-export: unknown edge endpoint throws', () => {
  assert.throws(() => toSVG([{ id: 'n1', x: 0, y: 0, label: 'x', color: '#fff', size: 3 }], [{ source: 'n1', target: 'ghost' }]), /unknown node/)
})
