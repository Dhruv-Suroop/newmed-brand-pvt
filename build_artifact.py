#!/usr/bin/env python3
"""Build a fully self-contained artifact.html for sharing (Claude Artifact / any single-file host).

- Inlines styles.css (+ fonts as data URIs) and app.js
- Embeds displayed images and SVG/PNG download files as data URIs
- Mockup photos are recompressed (max 1000px, q70) to keep the file lean
- PDF download links are disabled with a tooltip (the 4.5MB PDF pack ships with
  the final hosted version, not the collab draft)

Usage: python3 build_artifact.py   ->  dist/artifact.html
"""
import base64
import os
import pathlib
import re
import subprocess

SLIM = os.environ.get("SLIM") == "1"  # SLIM=1 -> smaller page for share-size limits
ROOT = pathlib.Path(__file__).resolve().parent
DIST = ROOT / "dist"
MOCK = DIST / "_mock"
MOCK.mkdir(parents=True, exist_ok=True)

MIME = {
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".woff2": "font/woff2",
}


def datauri(p: pathlib.Path) -> str:
    return f"data:{MIME[p.suffix.lower()]};base64,{base64.b64encode(p.read_bytes()).decode()}"


# 1. Recompress mockups for the draft build
for f in sorted((ROOT / "assets/mockups").iterdir()):
    out = MOCK / f.name
    if f.suffix == ".jpg":
        maxpx, q = ("800", "62") if SLIM else ("1000", "70")
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", q,
             "-Z", maxpx, str(f), "--out", str(out)],
            capture_output=True, check=True)
    elif f.suffix == ".png":
        subprocess.run(["sips", "-Z", "512", str(f), "--out", str(out)],
                       capture_output=True, check=True)

html = (ROOT / "index.html").read_text()

# 2. Inline CSS with fonts embedded
css = (ROOT / "styles.css").read_text()
css = re.sub(r"url\('(assets/fonts/[^']+)'\)",
             lambda m: f"url('{datauri(ROOT / m.group(1))}')", css)
css += "\na[data-off]{opacity:.4;pointer-events:none;}\n"
html = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">',
              lambda m: "<style>\n" + css + "\n</style>", html)

# 3. Inline JS
js = (ROOT / "app.js").read_text()
html = re.sub(r'<script src="app\.js[^"]*"></script>',
              lambda m: "<script>\n" + js + "\n</script>", html)

# 4. Favicon
html = html.replace('<link rel="icon" href="favicon.png">',
                    f'<link rel="icon" href="{datauri(ROOT / "assets/logos/png/favicon.png")}">')


# 5. Embed every remaining asset reference
def repl(m: re.Match) -> str:
    attr, path = m.group(1), m.group(2)
    if path.endswith(".pdf"):
        return f'{attr}="#" data-off="1" title="PDF pack ships with the final hosted version"'
    p = ROOT / path
    if "/mockups/" in path:
        p = MOCK / pathlib.Path(path).name
    elif SLIM and p.stat().st_size > 300_000:
        # slim build: drop heavyweight downloads (e.g. 1024px app icon)
        return f'{attr}="#" data-off="1" title="Full-size asset ships with the final hosted version"'
    return f'{attr}="{datauri(p)}"'


html = re.sub(r'(src|href)="(assets/[^"]+)"', repl, html)

DIST.joinpath("artifact.html").write_text(html)
leftover = re.findall(r'(?:src|href)="assets/[^"]+"', html)
size_mb = DIST.joinpath("artifact.html").stat().st_size / 1e6
print(f"dist/artifact.html written — {size_mb:.2f} MB, leftover asset refs: {len(leftover)}")
