/**
 * dsh-graphview client builder.
 *
 * dsh-web does NOT consume plain ESM browser bundles. It expects a CJS
 * module wrapped in:
 *   window.__ModuleLoader__.load({ id: <packageName>, factory: (require) => {...} })
 * The host's ModuleLoader provides `react`/`react-dom` (and other host
 * modules) to the factory's `require`. We therefore:
 *   - bundle src/client with esbuild as CJS, platform:'node' (so node built-ins
 *     like `events` that sigma/graphology reach for are shimmed/bundled, not
 *     left as unresolvable built-ins),
 *   - keep `react`/`react-dom` EXTERNAL (resolved by the host at runtime),
 *   - inline `sigma`/`graphology` (not host-provided),
 *   - wrap the result in the __ModuleLoader__ envelope noema-client uses.
 */
import { build } from 'esbuild'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
const pluginId = manifest.name

const compiledPath = join(root, '.client-build', 'index.cjs')
const outputPath = join(root, 'lib', 'client.js')

await build({
  entryPoints: [join(root, 'src', 'client', 'index.tsx')],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'es2022',
  sourcemap: true,
  absWorkingDir: root,
  outfile: compiledPath,
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  // The dsh client module loader has no `events` seed word; alias node's
  // events builtin to the in-repo shim so it is bundled, not left external.
  alias: { events: join(root, 'src', 'client', 'events-shim.js') },
  // sigma/graphology are inlined; node built-ins get esbuild's node shims.
  mainFields: ['module', 'jsnext:main'],
  logLevel: 'info',
}).catch(e => {
  console.error('CLIENT BUILD FAILED:\n' + (e?.errors?.map(x => x.text + ' @ ' + JSON.stringify(x.location)).join('\n') ?? String(e)))
  process.exit(1)
})

const source = await readFile(compiledPath, 'utf8')
const wrapped = [
  `window.__ModuleLoader__.load({ id: ${JSON.stringify(pluginId)}, factory: (require) => {`,
  'var module = { exports: {} }; var exports = module.exports;',
  source.replace(/\n?\/\/# sourceMappingURL=.*$/u, ''),
  'return module.exports; } });',
  '',
].join('\n')

await writeFile(outputPath, wrapped)
await rm(join(root, '.client-build'), { recursive: true, force: true })
console.log('[graphview] client bundle built -> lib/client.js')
