/**
 * Bundle + run the .ts tests with node:test.
 * esbuild inlines src + tests into one CJS file (node:test/node:assert stay
 * external and resolve to Node built-ins at runtime). No tsconfig/types needed.
 */
import { build } from 'esbuild'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, '.test-runner.cjs')
const result = await build({
  entryPoints: [join(root, 'tests/all.test.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node22',
  absWorkingDir: root,
  outfile: out,
  external: ['node:test', 'node:assert', 'node:fs', 'node:fs/promises', 'node:os', 'node:path'],
  logLevel: 'info',
})
const code = result.errors.length ? 1 : spawnSync(process.execPath, [out], { stdio: 'inherit' }).status ?? 1
process.exit(code)
