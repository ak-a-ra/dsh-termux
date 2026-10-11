/** One-shot on-device verification: write real-format noema traces into the
 *  DEFAULT NOEMA_ROOT (~/.agent-memory/traces), run the adapter + project()
 *  projection against them, print the resulting graph, then clean up.
 *  Proves the read path works on this device WITHOUT the glibc noema-mcp binary.
 */
import { rm, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { NoemaFilesystemAdapter } from '../src/memory-adapter.js'
import { project, parseQuery } from '../src/project.js'

function mk(id: string, kind: string, body: string, tags: string[], links: { rel: string; target: string }[], entities: string[] = ['memory']) {
  return '---json\n' + JSON.stringify({
    id, scope: 'user', layer: 'cortex', kind, confidence: 1, importance: 0.5,
    sensitivity: 'internal', tags, entities, links,
    source: { kind: 'manual', agent: 'live-check' }, status: 'active',
    use_count: 0, created_at: '2026-10-11T00:00:00Z', updated_at: '2026-10-11T00:00:00Z',
  }) + '\n---\n' + body + '\n'
}

async function main() {
  const traceDir = join(process.env.HOME ?? '/tmp', '.agent-memory', 'traces')
  try {
    await rm(traceDir, { recursive: true, force: true })
    await mkdir(traceDir, { recursive: true })

    const A = mk('mem_graph_anchor', 'fact', 'the anchor fact', ['demo', 'graph'], [], ['memory', 'term'])
    const B = mk('mem_graph_dep', 'preference', 'depends on anchor', ['demo'], [{ rel: 'depends_on', target: 'mem_graph_anchor' }], ['memory'])
    const C = mk('mem_graph_ref', 'constraint', 'references anchor', ['graph'], [{ rel: 'references', target: 'mem_graph_anchor' }], ['memory', 'term'])
    const D = mk('mem_graph_zombie', 'fact', 'tombstoned', ['zombie'], [], ['memory'])
    await writeFile(join(traceDir, 'a.md'), A)
    await writeFile(join(traceDir, 'b.md'), B)
    await writeFile(join(traceDir, 'c.md'), C)
    await writeFile(join(traceDir, 'd.md'), D.replace('"status":"active"', '"status":"tombstoned"'))

    const adapter = new NoemaFilesystemAdapter() // default root → ~/.agent-memory
    console.log('[live] adapter.root =', adapter.root)
    const snap = await adapter.readSnapshot()
    console.log('[live] raw snapshot: ' + snap.nodes.length + ' nodes, ' + snap.links.length + ' explicit links')

    const def = project(snap, parseQuery(new URLSearchParams('')))
    console.log('[live] default project: ' + def.nodes.length + ' nodes, ' + def.links.length + ' links')

    const impl = project(snap, parseQuery(new URLSearchParams('implicitEdges=true')))
    console.log('[live] implicitEdges=true: ' + impl.links.length + ' links (explicit ' + snap.links.length + ' + implicit ' + (impl.links.length - snap.links.length) + ')')
    console.log('[live] visible kinds:', def.nodes.map(n => n.kind))

    if (def.nodes.length !== 3) throw new Error('expected 3 visible nodes, got ' + def.nodes.length)
    console.log('[live] OK — full read→project pipeline works on-device without noema-mcp binary')
  } finally {
    await rm(join(process.env.HOME ?? '/tmp', '.agent-memory'), { recursive: true, force: true })
    console.log('[live] cleaned up ~/.agent-memory (synthetic traces removed)')
  }
}

main().catch(e => { console.error(e); process.exit(1) })
