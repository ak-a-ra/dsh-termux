# dsh-graphview

An **Obsidian Extended Graph-style memory visualizer** for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

It renders **every memory** from [`dsh-noema`](https://github.com/ZSeven-W/dsh-noema) as one interactive, stylable, filterable graph inside the DSH Web UI — node colour by `kind` (fact/decision/constraint/preference…), link-type toggling, tag & kind filters, focus + neighbourhood (ego-subgraph), toggleable implicit entity edges, saved named views, and SVG/JSON export. Powered by [sigma](https://github.com/jacomyma/sigma) v2 + [graphology](https://github.com/graphology/graphology).

## The core idea

`dsh-noema` already stores **explicit typed links** between memories (`links: [{rel, target}]`) plus `tags` and `entities`. That is the graph. But dsh-noema ships no visualizer. `dsh-graphview` is the visualizer:

```
NOEMA_ROOT (markdown traces)
      │  memory-adapter.ts  (reads traces directly — see "Termux" note)
      ▼
  GraphSnapshot { nodes, links }          ← explicit links only
      │  graph-engine.ts                   ← pure, testable projection
      ▼
  GraphEngine { nodes(), edges(), setView(), focusSubgraph() }
      │                                             ↑ host loopback route
      │  client/index.tsx (sigma + ModuleLoader)     │
      ▼                                             │
  Interactive graph panel in the DSH Web sidebar ───┘
```

The adapter reads noema's on-disk traces directly (`---json` frontmatter) — **no `noema-mcp` binary needed to *view*** the graph, which is what makes this viable on Termux (see below).

## Termux / Android note (important)

- `dsh-noema` bundles a `noema-mcp` binary that is **glibc-only** and declares
  `os: linux, libc: glibc`. npm hard-refuses it on Termux
  (`os: android, libc: bionic` → `EBADPLATFORM`).
- → The memory graph **renderer works on Termux as soon as trace files exist**,
  because it reads `$NOEMA_ROOT/*.md` directly.
- → **Writing** memories still needs a working `noema-mcp`. Resolve this by
  building a **static-musl** `noema-mcp` (`cargo build --target
  aarch64-unknown-linux-musl`, from the `noema` git submodule) and pointing
  dsh-noema's *Server command* setting at it — or running the glibc binary
  inside a `proot-distro` glibc box. The `linux-arm64` package ships the right
  binary once rebuilt with the musl target.
- Device here is `aarch64` / Node 26 / DSH `0.2.0-rc.2` — all supported.

## Dev

```bash
# from this plugin dir (standalone; peers are externalized for the bundle)
npm install --legacy-peer-deps        # graphology, sigma, esbuild, typescript
node scripts/build.mjs                # → lib/index.js   (host entry)
node scripts/build-client.mjs         # → lib/client.js  (CJS + __ModuleLoader__ wrapper)
node scripts/run-tests.mjs            # 13 unit tests (adapter + graph-engine)
```

To run against a **real** profile (peers resolved from the hoisted host), link
the plugin into the profile workspace instead and build there:

```bash
dsh plugin --profile web add @zseven-w/dsh-noema
dsh plugin --profile web add /data/data/com.termux/files/home/projects/dsh-termux/plugins/dsh-graphview
dsh --profile web
```

Hot-reload on file edits comes from the host's client-hmr SSE channel (the
`dsh.bundle.hmr.client` key in `package.json`).

## What's implemented (verified)

| Phase | System | Status |
|---|---|---|
| 1 | project scaffold, esbuild host+client pipelines | build ✓ |
| 2 | noema store format locked (`frontmatter.rs`: `---json`…`---`, `links:[{rel,target}]`) | research ✓ |
| 3 | `memory-adapter.ts` reads traces → `{nodes, links}` | 4 tests ✓ |
| 4 | `graph-engine.ts` kind/tag/link-type/focus/implicit filtering + immutable `setView` | 9 tests ✓ |
| 5 | `index.ts` host `apply()` + loopback `/noema-graphview/snapshot` route + `graphview_refresh` tool | builds ✓ |
| 6 | sigma.js client viz + ModuleLoader slot | stub ✓ / real render TODO |
| 7 | saved views + settings card | TODO |
| 8 | profile integration + live render + export | TODO |

See `src/types.ts` for the full `GraphNode` / `GraphLink` / `GraphView` contracts.
