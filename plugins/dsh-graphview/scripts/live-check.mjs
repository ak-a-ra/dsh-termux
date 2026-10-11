/** Bundle + run the on-device live verification (scripts/live-runner.ts). */
import { build } from 'esbuild'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, '.live-runner.cjs')
await build({
  entryPoints: [join(root, 'scripts', 'live-runner.ts')],
  bundle: true, format: 'cjs', platform: 'node', target: 'node22',
  absWorkingDir: root, outfile: out,
  external: ['node:fs', 'node:fs/promises', 'node:os', 'node:path'],
  logLevel: 'info',
}).catch(e => { console.error('LIVE BUILD FAILED:\n' + (e?.errors?.map(x => x.text).join('\n') ?? String(e))); process.exit(1) })
const code = spawnSync(process.execPath, [out], { stdio: 'inherit' }).status ?? 1
await import('node:fs').then(fs => fs.rmSync(out, { force: true }))
process.exit(code)
