#!/usr/bin/env python3
"""Copy the pages listed in scripts/app-docs.json from the apps' repositories.

Each listed file is written to its page under docs/, with its links rewritten
for the site: a link to another listed file of the same repository becomes a
relative link to that page, a link to anything else in the repository becomes
a link to the file on GitHub. The header lines that name code
(Implementation, Navigation) are left off pages outside developers/, and each
page ends with a line naming its source.

  scripts/sync-app-docs.py                  clone each repository and write the pages
  scripts/sync-app-docs.py --sources DIR    use checkouts at DIR/<name> (DIR/OpenWatch)
  scripts/sync-app-docs.py --check          write nothing; fail if a page is out of step

A new page is added to app-docs.json and to its section's _meta.ts. Edit a
ported page in its repository, never here: the next sync overwrites it.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import posixpath
import re
import subprocess
import sys
import tempfile

SITE = pathlib.Path(__file__).resolve().parent.parent
MANIFEST = SITE / "scripts" / "app-docs.json"
PAGES = SITE / "docs"

LINK = re.compile(r"(!?)\[([^\]]*)\]\(([^)\s]+)\)")
FENCE = re.compile(r"^\s*(```|~~~)")
CODE_HEADER = re.compile(r"^>\s*\*\*(Implementation|Navigation):\*\*")


def port(repo_root: pathlib.Path, slug: str, src: str, dst: str, mapping: dict[str, str]) -> str:
    text = (repo_root / src).read_text(encoding="utf-8")
    user_page = "/developers/" not in dst

    def target(link: str, image: bool) -> str:
        if re.match(r"^[a-z][a-z0-9+.-]*:", link, re.I) or link.startswith("#"):
            return link
        path, _, anchor = link.partition("#")
        resolved = posixpath.normpath(posixpath.join(posixpath.dirname(src), path))
        fragment = f"#{anchor}" if anchor else ""
        if resolved in mapping and not image:
            return posixpath.relpath(mapping[resolved], posixpath.dirname(dst)) + fragment
        kind = "raw" if image else ("tree" if (repo_root / resolved).is_dir() else "blob")
        return f"https://github.com/{slug}/{kind}/main/{resolved}{fragment}"

    out: list[str] = []
    fenced = False
    for line in text.splitlines():
        if FENCE.match(line):
            fenced = not fenced
        elif not fenced:
            if user_page and CODE_HEADER.match(line):
                continue
            line = LINK.sub(lambda m: f"{m.group(1)}[{m.group(2)}]({target(m.group(3), bool(m.group(1)))})", line)
        out.append(line)
    body = "\n".join(out).rstrip() + "\n"
    name = slug.split("/")[1]
    body += f"\n<small>This page is kept in step with [`{src}`](https://github.com/{slug}/blob/main/{src}) in the {name} repository.</small>\n"
    return body


def checkout(slug: str, sources: pathlib.Path | None, scratch: pathlib.Path) -> pathlib.Path:
    name = slug.split("/")[1]
    if sources is not None:
        path = sources / name
        if not path.is_dir():
            sys.exit(f"sync-app-docs: no checkout of {slug} at {path}")
        return path
    path = scratch / name
    subprocess.run(["git", "clone", "--quiet", "--depth", "1", f"https://github.com/{slug}.git", str(path)], check=True)
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--sources", type=pathlib.Path, help="directory holding a checkout of each repository, by name")
    parser.add_argument("--check", action="store_true", help="write nothing; exit 1 if a page differs from its source")
    args = parser.parse_args()
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))["repositories"]
    stale: list[str] = []
    with tempfile.TemporaryDirectory() as scratch:
        for slug, mapping in manifest.items():
            root = checkout(slug, args.sources, pathlib.Path(scratch))
            for src, dst in mapping.items():
                if not (root / src).is_file():
                    sys.exit(f"sync-app-docs: {slug} has no {src}; update scripts/app-docs.json")
                page = port(root, slug, src, dst, mapping)
                path = PAGES / dst
                current = path.read_text(encoding="utf-8") if path.is_file() else None
                if current == page:
                    continue
                stale.append(dst)
                if not args.check:
                    path.parent.mkdir(parents=True, exist_ok=True)
                    path.write_text(page, encoding="utf-8")
    for dst in stale:
        print(f"{'out of step' if args.check else 'updated'}: docs/{dst}")
    if not stale:
        print("every ported page is in step with its source")
    return 1 if args.check and stale else 0


if __name__ == "__main__":
    sys.exit(main())
