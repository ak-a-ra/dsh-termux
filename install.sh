#!/data/data/com.termux/files/usr/bin/bash
# dsh-tested: dsh-0.2.0-rc.2 (verified against @deepseek-ai/dsh@0.2.0-rc.2)
# Install @deepseek-ai/dsh on Termux (Android) and patch it into a working state.
#
# dsh has several native deps and Linux-isms that break on Termux:
#   1. node-pty: node-gyp copies process.config.variables.OS ("android") into
#      config.gypi, making gyp reference the undefined android_ndk_path.
#   2. koffi: calls statx(), hidden by bionic below API 30 (clang targets 24).
#   3. sharp: no prebuilt for android-arm64; must build against system libvips.
#   4. HMR/profile resolution needs Node --expose-internals. The published
#      node-addon-require-builtin ships darwin/linux/win prebuilds only and no
#      sources, so it fails closed on Android; the entry's JS index is replaced
#      with a --expose-internals shim and the shebang gains the flag.
#   5. session-persistence-jsonl publishes logs with a hard link(), which
#      Android forbids (EACCES); rename() is equally atomic and works.
#   6. attachment-local fsyncs every ancestor directory up to "/" (the
#      untrusted_app SELinux domain cannot open("/data/data")) and also
#      publishes attachments with link(), which Android forbids; the walk
#      now tolerates unopenable ancestors and publication falls back to
#      rename(). Without this, read_image cannot store an image.
#   7. fs-local publishes a NEW file with link() (no-replace semantics);
#      Android refuses link() too, so every create-file write fails with
#      FS_IO_ERROR. Publication falls back to rename(); the surrounding
#      guard still refuses to overwrite an existing file.
#   8. @vscode/ripgrep has no android platform package (linux prebuilds are
#      glibc-linked, unusable on bionic); glob/grep fail with "ripgrep launch
#      failed". The resolver falls back to the system rg (pkg ripgrep).
#   9. dsh-subprocess-local builds a process inspector for linux/darwin only;
#      Termux reports platform "android" and pty sessions throw "terminal
#      inspection is unsupported". Android routes to the linux inspector
#      (the /proc interface is shared).
#  10. Android has no OS sandbox backend (bubblewrap/Landlock), so the default
#      workspace-write sandbox cannot start; the web profile pins
#      danger-full-access with a matching custom approval preset.

set -euo pipefail

NDK_TARGET="aarch64-unknown-linux-android30"
# NODE_BIN / NODE_GYP_BIN / DSH_LIB are resolved AFTER the `pkg install` below:
# on a fresh Termux device `node`/`npm` don't exist yet, so computing them up
#here leaves NODE_BIN empty and `set -e` makes the script silently exit (nothing
#installed, no error message) before the installer even runs.

log() { printf '\033[1;36m[%s/%s]\033[0m %s\n' "$1" "$2" "$3"; }

# Auto-scan for a DeepSeek API key across common sources and print the first
# match. Priority: environment, dsh's credential store, shell rc files, then
# standalone key files. Prints nothing and returns 1 when no key is found.
find_deepseek_key() {
    local key f creds
    if [ -n "${DEEPSEEK_API_KEY:-}" ]; then
        printf '%s' "$DEEPSEEK_API_KEY"; return 0
    fi
    creds="${DSH_HOME:-$HOME/.dsh}/.credentials.yaml"
    if [ -f "$creds" ]; then
        key="$(grep -E 'DEEPSEEK_API_KEY[[:space:]]*:' "$creds" | head -1 \
            | sed -E 's/.*DEEPSEEK_API_KEY[[:space:]]*:[[:space:]]*//' | tr -d " \t\r")"
        key="${key#\"}"; key="${key%\"}"; key="${key#\'}"; key="${key%\'}"
        [ -n "$key" ] && { printf '%s' "$key"; return 0; }
    fi
    for f in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.bash_profile" "$HOME/.zshrc"; do
        [ -f "$f" ] || continue
        key="$(grep -E '^[[:space:]]*export[[:space:]]+DEEPSEEK_API_KEY=' "$f" | head -1 \
            | sed -E 's/^[[:space:]]*export[[:space:]]+DEEPSEEK_API_KEY=//' | tr -d " \t\r")"
        key="${key#\"}"; key="${key%\"}"; key="${key#\'}"; key="${key%\'}"
        [ -n "$key" ] && { printf '%s' "$key"; return 0; }
    done
    for f in "$HOME/.deepseek_api_key" "$HOME/.deepseek"; do
        [ -f "$f" ] || continue
        key="$(head -1 "$f" | tr -d " \t\r\n")"
        key="${key#\"}"; key="${key%\"}"; key="${key#\'}"; key="${key%\'}"
        [ -n "$key" ] && { printf '%s' "$key"; return 0; }
    done
    return 1
}

log 1 13 "Installing prerequisites..."
pkg install -y nodejs build-essential clang cmake ninja python libvips ripgrep >/dev/null

# Resolve Node/npm paths only now that nodejs is installed — before, on a
# fresh device, `command -v node` would be empty, making node-gyp rebuild and
# the shebang patch silently use an empty "" (or `set -e` would silently exit).
# Fail loudly if Node/npm still aren't available instead of crashing silently.
if ! NODE_BIN="$(command -v node)"; then
    echo "error: 'node' not found after 'pkg install -y nodejs'; NODE_BIN is empty" >&2
    exit 1
fi
if [ -z "$NODE_BIN" ]; then
    echo "error: 'node' resolves to an empty path after 'pkg install -y nodejs'" >&2
    exit 1
fi
NODE_GYP_BIN="$(npm root -g)/npm/node_modules/node-gyp/bin/node-gyp.js"
DSH_LIB="$(npm root -g)/@deepseek-ai/dsh"
if [ ! -f "$NODE_GYP_BIN" ]; then
    echo "error: node-gyp not found at $NODE_GYP_BIN (did 'pkg install -y nodejs' succeed?)" >&2
    exit 1
fi

log 2 13 "Patching node-gyp (drop bogus OS=android)..."
CREATE_GYPI="$(npm root -g)/npm/node_modules/node-gyp/lib/create-config-gypi.js"
if [ ! -f "$CREATE_GYPI" ]; then
    echo "error: node-gyp not found at $CREATE_GYPI" >&2
    exit 1
fi
if grep -q "delete variables.OS" "$CREATE_GYPI"; then
    echo "    node-gyp already patched, skipping."
else
    python3 - "$CREATE_GYPI" <<'PY'
import sys
path = sys.argv[1]
src = open(path, encoding="utf-8").read()
anchor = "const variables = config.variables\n"
assert anchor in src, "patch anchor not found; node-gyp may have changed"
block = (
    anchor + "\n"
    + "  // Termux's Node.js reports process.config.variables.OS as \"android\" even\n"
    + "  // though native addons build against the Termux (linux-like) sysroot, not\n"
    + "  // the Android NDK. gyp's \"OS == android\" branches then reference the\n"
    + "  // undefined android_ndk_path variable and fail. Drop OS so gyp infers it\n"
    + "  // as \"linux\" from the host platform.\n"
    + "  delete variables.OS\n"
)
open(path, "w", encoding="utf-8").write(src.replace(anchor, block, 1))
print("    patched", path)
PY
fi

log 3 13 "Installing @deepseek-ai/dsh (native modules will be compiled)..."
export CFLAGS="--target=$NDK_TARGET"
export CXXFLAGS="--target=$NDK_TARGET"
npm install -g @deepseek-ai/dsh

log 4 13 "Shimming node-addon-require-builtin (no android build)..."
ADDON_SHIM="$DSH_LIB/node_modules/node-addon-require-builtin/lib/index.js"
if [ ! -f "$ADDON_SHIM" ]; then
    echo "    warning: node-addon-require-builtin not found, skipping."
elif grep -q "termux-addon-shim" "$ADDON_SHIM"; then
    echo "    addon shim already in place, skipping."
else
    python3 - "$ADDON_SHIM" <<'PY'
import sys

path = sys.argv[1]
src = open(path, encoding="utf-8").read()
if "termux-addon-shim" in src:
    print("    already shimmed")
    sys.exit(0)
shim = (
    "'use strict';\n"
    "/* termux-addon-shim: the native requireBuiltin() has no Android build\n"
    " * (upstream ships darwin/linux/win prebuilds only and the published\n"
    " * tarball has no sources, so it fails closed here). dsh runs under\n"
    " * --expose-internals (see the shebang step below), so Node's own require()\n"
    " * returns the same internal modules the addon would.\n"
    " */\n"
    "function requireBuiltin(id) {\n"
    "  if (typeof id !== 'string' || id.length === 0) {\n"
    "    throw new TypeError('requireBuiltin: expected a module id string');\n"
    "  }\n"
    "  const error = new Error('Cannot find builtin module ' + id);\n"
    "  error.code = 'ERR_UNKNOWN_BUILTIN_MODULE';\n"
    "  try {\n"
    "    return require(id);\n"
    "  } catch (cause) {\n"
    "    throw error;\n"
    "  }\n"
    "}\n"
    "module.exports = {\n"
    "  requireBuiltin,\n"
    "  isAllowedInternalId: function isAllowedInternalId() { return true; },\n"
    "};\n"
)
open(path, "w", encoding="utf-8").write(shim)
print("    shimmed", path)
PY
fi

log 5 13 "Building sharp against system libvips..."
SHARP_DIR="$DSH_LIB/node_modules/sharp"
if compgen -G "$SHARP_DIR/src/build/Release/sharp-android-arm64-*.node" >/dev/null; then
    echo "    sharp already built, skipping."
else
    (cd "$SHARP_DIR" && SHARP_FORCE_GLOBAL_LIBVIPS=1 \
        CFLAGS="--target=$NDK_TARGET" CXXFLAGS="--target=$NDK_TARGET" \
        "$NODE_BIN" "$NODE_GYP_BIN" rebuild --directory=src >/dev/null)
fi

log 6 13 "Patching session persistence (hard link -> rename)..."
SESSION_JS="$DSH_LIB/node_modules/@deepseek-ai/dsh-session-persistence-jsonl/lib/index.js"
if [ -f "$SESSION_JS" ]; then
    if grep -q "await rename(tmp, finalPath)" "$SESSION_JS"; then
        echo "    session persistence already patched, skipping."
    else
        python3 - "$SESSION_JS" <<'PY'
import re
import sys

path = sys.argv[1]
src = open(path, encoding="utf-8").read()

# Add `rename` to the fs/promises import without pinning the exact named-import
# set (upstream has already added `lstat` and may add more). Keep `link`: the
# module's own default filesystem wrapper still reads it, so dropping it would
# crash the module on load.
match = re.search(r'^import \{([^}]*)\} from "node:fs/promises";', src, re.M)
assert match, "fs/promises import not found; dsh may have changed"
names = [n.strip() for n in match.group(1).split(",") if n.strip()]
assert "link" in names, "expected 'link' import not found; dsh may have changed"
if "rename" not in names:
    names = sorted(set(names) | {"rename"})
    src = (src[: match.start()]
           + "import { " + ", ".join(names) + ' } from "node:fs/promises";'
           + src[match.end():])

old = "\t\t\tawait link(tmp, finalPath);"
assert src.count(old) == 1, "session publish anchor not found (%d); dsh may have changed" % src.count(old)
src = src.replace(old, "\t\t\tawait rename(tmp, finalPath);", 1)

open(path, "w", encoding="utf-8").write(src)
print("    patched", path)
PY
    fi
else
    echo "    warning: session persistence module not found, skipping."
fi

log 7 13 "Patching attachment store (durability walk + hard link fallback)..."
ATTACH_JS="$DSH_LIB/node_modules/@deepseek-ai/dsh-attachment-local/lib/index.js"
if [ ! -f "$ATTACH_JS" ]; then
    echo "    warning: attachment module not found, skipping (read_image will not work)."
elif grep -q "termux-hardlink-fallback" "$ATTACH_JS"; then
    echo "    attachment store already patched, skipping."
else
    python3 - "$ATTACH_JS" <<'PY'
import sys

path = sys.argv[1]
src = open(path, encoding="utf-8").read()

if "termux-hardlink-fallback" in src:
    print("    already patched")
    sys.exit(0)


def once(old, new):
    global src
    assert src.count(old) == 1, "patch anchor not found (%d matches); dsh may have changed" % src.count(old)
    src = src.replace(old, new, 1)


# (a) The durability walk fsyncs every ancestor up to the filesystem root, but
#     an untrusted Android app cannot open("/"), "/data" or "/data/data".
once(
    "\tconst handle = await open(path, constants.O_RDONLY);",
    "\tlet handle;\n"
    "\ttry {\n"
    "\t\thandle = await open(path, constants.O_RDONLY);\n"
    "\t} catch (error) {\n"
    "\t\t/* termux-durability-guard */\n"
    "\t\tif (error.code === \"EACCES\" || error.code === \"EPERM\" || error.code === \"ENOENT\") return;\n"
    "\t\tthrow error;\n"
    "\t}",
)

# (b) Publication uses link(), which Android refuses (EACCES); rename() inside
#     the same private root is equally atomic. (c) rename() consumes the
#     staging name, so the follow-up unlink() must tolerate ENOENT.
helpers = (
    "/**\n"
    " * Publish one staged object into place.\n"
    " * POSIX links are the cheapest atomic publish, but Android refuses link()\n"
    " * for untrusted apps (EACCES: no hard links). rename() inside the same\n"
    " * private root is equally atomic, so fall back to it. rename() replaces an\n"
    " * existing target instead of raising EEXIST, which is safe here because\n"
    " * targets are content-addressed: an object already at `target` holds the\n"
    " * same digest as the bytes being published.\n"
    " */\n"
    "/* termux-hardlink-fallback */\n"
    "async function publishStagedName(source, target) {\n"
    "\ttry {\n"
    "\t\tawait link(source, target);\n"
    "\t} catch (error) {\n"
    "\t\tif (!(error instanceof Error && \"code\" in error && error.code === \"EACCES\")) throw error;\n"
    "\t\tawait rename(source, target);\n"
    "\t}\n"
    "}\n"
    "/** Remove a staging name, tolerating one already consumed by the rename fallback. */\n"
    "async function removeStagedName(path) {\n"
    "\ttry {\n"
    "\t\tawait unlink(path);\n"
    "\t} catch (error) {\n"
    "\t\tif (!(error instanceof Error && \"code\" in error && error.code === \"ENOENT\")) throw error;\n"
    "\t}\n"
    "}\n"
    "async function publishStagedObject(root, target, staged) {"
)
once("async function publishStagedObject(root, target, staged) {", helpers)
once("\t\t\tawait link(staged.path, target);", "\t\t\tawait publishStagedName(staged.path, target);")
once("\t\t\tawait link(source, target);", "\t\t\tawait publishStagedName(source, target);")
assert src.count("\t\tawait unlink(staged.path);") == 1, "staging unlink anchor not found"
src = src.replace("\t\tawait unlink(staged.path);", "\t\tawait removeStagedName(staged.path);")

open(path, "w", encoding="utf-8").write(src)
print("    patched", path)
PY
fi

log 8 13 "Fixing shebang (node --expose-internals)..."
DSH_BIN="$DSH_LIB/lib/bin.js"
if [ -f "$DSH_BIN" ]; then
    python3 - "$DSH_BIN" "$NODE_BIN" <<'PY'
import sys
path, node = sys.argv[1], sys.argv[2]
src = open(path, encoding="utf-8").read()
first, _, rest = src.partition("\n")
if not first.startswith("#!"):
    sys.exit("no shebang on first line")
src = "#!" + node + " --expose-internals\n" + rest
open(path, "w", encoding="utf-8").write(src)
print("    shebang set:", node, "--expose-internals")
PY
fi

log 9 13 "Patching file publication (hard link -> rename fallback)..."
FS_LOCAL_JS="$DSH_LIB/node_modules/@deepseek-ai/dsh-fs-local/lib/index.js"
if [ ! -f "$FS_LOCAL_JS" ]; then
    echo "    warning: fs-local module not found, skipping (write/edit tools will not work)."
elif grep -q "termux-noreplace-fallback" "$FS_LOCAL_JS"; then
    echo "    file publication already patched, skipping."
else
    python3 - "$FS_LOCAL_JS" <<'PY'
import sys

path = sys.argv[1]
src = open(path, encoding="utf-8").read()

if "termux-noreplace-fallback" in src:
    print("    already patched")
    sys.exit(0)

old = (
    "\t\tif (createIfAbsent !== void 0) try {\n"
    "\t\t\tawait linkFile(tempPath, absolutePath);\n"
    "\t\t} catch (error) {\n"
    "\t\t\tawait throwGuardedCreateFailure(error, absolutePath, createIfAbsent.displayPath, inspectPublicationTarget);\n"
    "\t\t}"
)
assert src.count(old) == 1, "patch anchor not found (%d matches); dsh may have changed" % src.count(old)
new = (
    "\t\tif (createIfAbsent !== void 0) try {\n"
    "\t\t\ttry {\n"
    "\t\t\t\tawait linkFile(tempPath, absolutePath);\n"
    "\t\t\t} catch (error) {\n"
    "\t\t\t\t/* termux-noreplace-fallback */\n"
    "\t\t\t\tif (!(error instanceof Error && \"code\" in error && error.code === \"EACCES\")) throw error;\n"
    "\t\t\t\tawait rename(tempPath, absolutePath);\n"
    "\t\t\t}\n"
    "\t\t} catch (error) {\n"
    "\t\t\tawait throwGuardedCreateFailure(error, absolutePath, createIfAbsent.displayPath, inspectPublicationTarget);\n"
    "\t\t}"
)
open(path, "w", encoding="utf-8").write(src.replace(old, new, 1))
print("    patched", path)
PY
fi

log 10 13 "Patching ripgrep fallback (android -> system rg)..."
RG_JS="$DSH_LIB/node_modules/@vscode/ripgrep/lib/index.js"
if [ ! -f "$RG_JS" ]; then
    echo "    warning: @vscode/ripgrep not found, skipping (glob/grep tools will not work)."
elif grep -q "termux-rg-fallback" "$RG_JS"; then
    echo "    ripgrep fallback already patched, skipping."
else
    python3 - "$RG_JS" <<'PY'
import sys

path = sys.argv[1]
src = open(path, encoding="utf-8").read()

if "termux-rg-fallback" in src:
    print("    already patched")
    sys.exit(0)

old = (
    "} catch {\n"
    "    throw new Error(\n"
    "        `Could not find ${platformPkg}. ` +\n"
    "        `Ensure optionalDependencies are installed for this platform (${process.platform}-${arch}).`\n"
    "    );\n"
    "}"
)
assert src.count(old) == 1, "ripgrep resolver anchor not found (%d matches); upstream may have changed" % src.count(old)
new = (
    "} catch {\n"
    "    /* termux-rg-fallback: no @vscode/ripgrep-android-* platform package\n"
    "     * exists (the linux prebuilds are glibc-linked, unusable on bionic);\n"
    "     * fall back to the system ripgrep. RIPGREP_PATH overrides it. */\n"
    "    if (process.platform === \"android\") {\n"
    "        resolved = process.env.RIPGREP_PATH ?? `${process.env.PREFIX ?? \"/data/data/com.termux/files/usr\"}/bin/rg`;\n"
    "    } else {\n"
    "        throw new Error(\n"
    "            `Could not find ${platformPkg}. ` +\n"
    "            `Ensure optionalDependencies are installed for this platform (${process.platform}-${arch}).`\n"
    "        );\n"
    "    }\n"
    "}"
)
open(path, "w", encoding="utf-8").write(src.replace(old, new, 1))
print("    patched", path)
PY
fi

log 11 13 "Patching terminal inspector (android -> linux)..."
SUBS_LIB="$DSH_LIB/node_modules/@deepseek-ai/dsh-subprocess-local/lib"
if [ ! -d "$SUBS_LIB" ]; then
    echo "    warning: dsh-subprocess-local not found, skipping (pty sessions will not work)."
elif grep -q "termux-inspector-patch" "$SUBS_LIB"/runner-launch-*.js 2>/dev/null; then
    echo "    terminal inspector already patched, skipping."
else
    SUBS_JS="$SUBS_LIB/runner-launch-*.js"
    python3 - "$SUBS_JS" <<'PY'
import pathlib
import sys

pattern = sys.argv[1]
files = sorted(pathlib.Path(pattern).parent.glob(pathlib.Path(pattern).name))
assert files, "no runner chunk matched: " + pattern

old = 'if (platform === "linux") return new LinuxProcessInspector(arch, internals);'
new = (
    '/* termux-inspector-patch: Termux reports process.platform === "android" but\n'
    ' * exposes the linux /proc interface (own process table visible); the linux\n'
    ' * inspector works there. */\n'
    '\tif (platform === "linux" || platform === "android") return new LinuxProcessInspector(arch, internals);'
)
hits = 0
for f in files:
    src = f.read_text(encoding="utf-8")
    if old not in src:
        continue
    assert src.count(old) == 1, "inspector anchor appears %d times in %s" % (src.count(old), f.name)
    f.write_text(src.replace(old, new, 1), encoding="utf-8")
    print("    patched", f.name)
    hits += 1
assert hits >= 1, "inspector anchor not found in any runner chunk"
PY
fi

log 12 13 "Writing Termux profile patches (sandbox + permission)..."
PROFILE_PATCH="$HOME/.dsh/profiles/web/cordis.patch.yml"
if grep -q "termux-unconfined" "$PROFILE_PATCH" 2>/dev/null; then
    echo "    profile patches already present, skipping."
else
    mkdir -p "$(dirname "$PROFILE_PATCH")"
    cat >> "$PROFILE_PATCH" <<'YML'
# termux: no OS sandbox backend (bubblewrap/Landlock) on Android. The default
# workspace-write sandbox cannot start, so pin danger-full-access. That pair
# (danger-full-access + approval ask) matches no built-in preset, so declare a
# custom one and set it as the default.
- id: sandbox-policy
  config:
    mode: danger-full-access
    workspaceRoot: !!js process.cwd()
- id: permission
  config:
    presets:
      read-only:
        sandbox: read-only
        approval: ask
      workspace-write:
        sandbox: workspace-write
        approval: ask
      danger-full-access:
        sandbox: danger-full-access
        approval: never
      termux-unconfined:
        sandbox: danger-full-access
        approval: ask
        name: Termux unconfined
        description: 'Termux host: no OS sandbox backend; unconfined file effects with approval prompts kept'
    defaultPreset: termux-unconfined
YML
    echo "    wrote profile patches to $PROFILE_PATCH"
fi

log 13 13 "Setting DeepSeek API key..."
PERSIST_KEY=""
if [ -n "${DEEPSEEK_API_KEY:-}" ]; then
    echo "    DEEPSEEK_API_KEY already set in environment, using it."
    PERSIST_KEY="$DEEPSEEK_API_KEY"
else
    printf '    Paste your DeepSeek API key (input hidden): '
    IFS= read -r -s PERSIST_KEY || true
    echo
    if [ -n "$PERSIST_KEY" ]; then
        echo "    Key captured (not echoed)."
        export DEEPSEEK_API_KEY="$PERSIST_KEY"
    else
        # No input: fall back to scanning for an existing key.
        if PERSIST_KEY="$(find_deepseek_key)"; then
            echo "    Found existing DeepSeek API key, using it."
            export DEEPSEEK_API_KEY="$PERSIST_KEY"
        else
            echo "    No key provided; set it later with: export DEEPSEEK_API_KEY=sk-..."
        fi
    fi
fi
if [ -n "${PERSIST_KEY:-}" ]; then
    RC="$HOME/.bashrc"
    touch "$RC"
    grep -v '^export DEEPSEEK_API_KEY=' "$RC" > "$RC.tmp" 2>/dev/null || true
    printf "export DEEPSEEK_API_KEY='%s'\n" "$PERSIST_KEY" >> "$RC.tmp"
    mv "$RC.tmp" "$RC"
    echo "    Saved DEEPSEEK_API_KEY to $RC"
fi

printf '\n\033[1;32mDone.\033[0m Verify with:\n  dsh --version\n  dsh web\n'
printf 'For headless/web you will need a DeepSeek API key (export DEEPSEEK_API_KEY or set it in the web UI).\n'
