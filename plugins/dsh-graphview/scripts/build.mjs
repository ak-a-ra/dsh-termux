import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
/** Peers supplied by the host profile; keep external in the bundle. */
const EXTERNAL = [
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-tools',
  '@deepseek-ai/dsh-host-webserver',
  '@deepseek-ai/dsh-system-prompt',
  '@deepseek-ai/schemastery',
  '@zseven-w/dsh-noema',
]

mkdirSync(resolve(root, 'lib'), { recursive: true })

await build({
  entryPoints: [resolve(root, 'src/index.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  external: EXTERNAL,
  sourcemap: true,
  absWorkingDir: root,
  outdir: resolve(root, 'lib'),
  logLevel: 'info',
  metafile: true,
}).catch(e => {
  console.error('HOST BUILD FAILED:\n' + (e?.errors?.map(x => x.text + ' @ ' + JSON.stringify(x.location)).join('\n') ?? String(e)))
  process.exit(1)
})

console.log('[graphview] host bundle built -> lib/index.js')
