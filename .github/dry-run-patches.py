#!/usr/bin/env python3
"""Dry-run the patch blocks embedded in install.sh against a resolved upstream tree.

install.sh patches files inside the globally-installed @deepseek-ai/dsh package
(session persistence, attachment store, fs-local, the dsh shebang) plus node-gyp.
The published npm tarball does NOT bundle its dependencies, so this script needs
the *resolved* install tree, e.g. produced by:

    npm install -g --ignore-scripts --prefix /tmp/dsh-pkg @deepseek-ai/dsh@<ver>
    python3 .github/dry-run-patches.py /tmp/dsh-pkg/lib/node_modules/@deepseek-ai/dsh

For every `python3 - "<target>" <<'PY' ... PY` heredoc in install.sh it copies the
target to a temp path, runs the block against the copy (so the block's own asserts
fire without mutating the tree), and checks that the file actually changed -- or
was already patched (the block's shell idempotency guard). Any missing target or
unmatched anchor fails the run, which the workflow turns into an issue instead of
a release.
"""
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
INSTALL = ROOT / "install.sh"


def raw_paths(text):
    """Map each SHELL_VAR that points into the package/global tree to its template."""
    out = {}
    for m in re.finditer(r'^\s*([A-Z_]+)="([^"]*)"', text, re.M):
        value = m.group(2)
        if "$DSH_LIB" in value or "$(npm root -g)" in value:
            out.setdefault(m.group(1), value)
    return out


def heredocs(text):
    """Yield (target_var, extra_arg_var, block_source, shell_guard) per patch heredoc."""
    lines = text.splitlines()
    guard = None
    i = 0
    while i < len(lines):
        line = lines[i]
        g = re.search(r'grep -q "([^"]+)"', line)
        if g:
            guard = g.group(1)
        m = re.match(r'\s*python3 - "\$?(\w+)"(?: "\$?(\w+)")? <<\'PY\'\s*$', line)
        if m:
            body = []
            i += 1
            while i < len(lines) and lines[i].strip() != "PY":
                body.append(lines[i])
                i += 1
            yield m.group(1), m.group(2), "\n".join(body), guard
            guard = None
        i += 1


def resolve_target(template, dsh_lib, global_root):
    """Resolve a path template, falling back to a tree search for npm hoisting drift."""
    exact = pathlib.Path(
        template.replace("$DSH_LIB", str(dsh_lib)).replace("$(npm root -g)", str(global_root))
    )
    if exact.exists() or "$DSH_LIB" not in template:
        return exact
    rel = template.split("$DSH_LIB/", 1)[1]
    parts = rel.split("/")
    pattern = "/".join(parts[-3:]) if len(parts) >= 3 else rel
    for root in [dsh_lib, *list(dsh_lib.parents)[:3]]:
        if root.is_dir():
            hit = next(iter(root.rglob(pattern)), None)
            if hit is not None:
                return hit
    return exact


def run_block(source, target, extra_path):
    with tempfile.TemporaryDirectory() as td:
        copy = pathlib.Path(td) / target.name
        shutil.copy2(target, copy)
        before = copy.read_text(encoding="utf-8")
        argv = [sys.executable, "-c", source, str(copy)]
        if extra_path:
            argv.append(extra_path)
        proc = subprocess.run(argv, capture_output=True, text=True)
        after = copy.read_text(encoding="utf-8") if copy.exists() else before
        return proc, after != before


def main():
    if len(sys.argv) != 2:
        print("usage: dry-run-patches.py <dsh-lib-dir>", file=sys.stderr)
        return 2
    dsh_lib = pathlib.Path(sys.argv[1]).resolve()
    if not dsh_lib.is_dir():
        print(f"FAIL: {dsh_lib} is not a directory", file=sys.stderr)
        return 1

    text = INSTALL.read_text(encoding="utf-8")
    paths = raw_paths(text)
    global_root = subprocess.run(
        ["npm", "root", "-g"], capture_output=True, text=True
    ).stdout.strip() or "/usr/local/lib/node_modules"
    node = shutil.which("node") or "/usr/bin/env node"

    blocks = list(heredocs(text))
    if not blocks:
        print("FAIL: no patch heredocs found in install.sh", file=sys.stderr)
        return 1

    print(f"install.sh: {len(blocks)} patch block(s); tree: {dsh_lib}")
    failures = []

    for var, extra, body, guard in blocks:
        template = paths.get(var)
        if template is None:
            failures.append(f"{var}: no path assignment found in install.sh")
            print(f"  FAIL {var}: no path assignment found in install.sh")
            continue
        target = resolve_target(template, dsh_lib, global_root)
        if not target.exists():
            if "$(npm root -g)" in template:
                print(f"  SKIP {var}: {target} absent in this environment")
                continue
            failures.append(f"{var}: target not found ({target})")
            print(f"  FAIL {var}: target not found ({target})")
            continue

        before = target.read_text(encoding="utf-8")
        if guard and guard in before:
            print(f"  ok   {var}: already patched (guard {guard!r} present)")
            continue

        proc, changed = run_block(body, target, node if extra else None)
        if proc.returncode != 0:
            detail = (proc.stderr.strip().splitlines() or ["non-zero exit"])[-1]
            failures.append(f"{var}: {detail}")
            print(f"  FAIL {var}: {detail}")
        elif changed:
            print(f"  ok   {var}: patch applies")
        else:
            failures.append(f"{var}: no anchor matched and no idempotency marker present")
            print(f"  FAIL {var}: no anchor matched")

    # Build-only target: install.sh step 4 aborts (set -e) if sharp is gone.
    sharp = paths.get("SHARP_DIR")
    if sharp:
        p = resolve_target(sharp, dsh_lib, global_root)
        if p.is_dir():
            print("  ok   SHARP_DIR: present")
        else:
            failures.append(f"SHARP_DIR: {p} missing (install.sh step 4 would abort)")
            print(f"  FAIL SHARP_DIR: missing ({p})")

    if failures:
        print(f"\ndry-run FAILED ({len(failures)} problem(s)):")
        for f in failures:
            print("  -", f)
        return 1
    print("\ndry-run OK: every patch anchor matches the upstream tree.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
