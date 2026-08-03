#!/usr/bin/env python3
"""Build one self-contained, static HTML page per section for design handoff.

Each page:
  - is fully self-contained (CSS, fonts, images inlined as data URIs) so it
    renders identically when opened directly or imported by a tool
  - has exactly ONE section, pre-activated (correct body + sidebar state baked in)
  - carries no JavaScript (static snapshot — clean for importers like html.to.design)

Output: pages/<section>.html   (intro -> home.html)
Import path: Figma -> html.to.design plugin -> paste the page URL.
"""
import base64, pathlib, re, subprocess

ROOT = pathlib.Path(__file__).resolve().parent
OUT = ROOT / "pages"
OUT.mkdir(exist_ok=True)
MOCK = OUT / "_mock"
MOCK.mkdir(exist_ok=True)

MIME = {".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg", ".woff2": "font/woff2"}


def datauri(p):
    return f"data:{MIME[p.suffix.lower()]};base64,{base64.b64encode(p.read_bytes()).decode()}"


# recompress mockups (design import doesn't need full res)
for f in sorted((ROOT / "assets/mockups").iterdir()):
    out = MOCK / f.name
    if f.suffix == ".jpg":
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "72",
                        "-Z", "1100", str(f), "--out", str(out)], capture_output=True, check=True)
    elif f.suffix == ".png":
        subprocess.run(["sips", "-Z", "560", str(f), "--out", str(out)], capture_output=True, check=True)

# ---- build the inlined base (once) ----
html = (ROOT / "index.html").read_text()

css = (ROOT / "styles.css").read_text()
css = re.sub(r"url\('(assets/fonts/[^']+)'\)",
             lambda m: f"url('{datauri(ROOT / m.group(1))}')", css)
html = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">',
              "<style>\n" + css + "\n</style>", html)
html = re.sub(r'<script src="app\.js[^"]*"></script>', "", html)          # static: drop nav JS
# keep the self-contained modules (no nav code): the arrow engine, the gradient
# generator, and the type generator — inline so the handoff pages render live.
for mod in ("arrow.js", "gradient.js", "typegen.js", "appsig.js", "appcard.js",
            "v3_eyebrow.js", "v3_motion.js", "datagen.js"):
    src = (ROOT / mod).read_text()
    # function replacement: the JS contains backslashes (regex literals) that
    # would otherwise be parsed as re template escapes.
    html = re.sub(r'<script src="%s[^"]*"></script>' % re.escape(mod),
                  lambda m, s=src: "<script>\n" + s + "\n</script>", html)
html = html.replace('<link rel="icon" href="favicon.png">',
                    f'<link rel="icon" href="{datauri(ROOT / "assets/logos/png/favicon.png")}">')


def repl(m):
    attr, path = m.group(1), m.group(2)
    if path.endswith((".pdf", ".docx", ".pptx", ".zip")):
        return f'{attr}="#"'
    p = MOCK / pathlib.Path(path).name if "/mockups/" in path else ROOT / path
    return f'{attr}="{datauri(p)}"'


# inline the icons list script (self-contained) before the generic asset rewrite
try:
    _icons = (ROOT / "assets/icons.js").read_text()
    html = re.sub(r'<script src="assets/icons\.js[^"]*"></script>', lambda m: "<script>\n" + _icons + "\n</script>", html)
except FileNotFoundError:
    pass

html = re.sub(r'(src|href)="(assets/[^"]+)"', repl, html)

SECTIONS = ["intro", "brand", "logo", "arrow", "icons", "colour", "type", "applications"]
FILE = {s: ("home.html" if s == "intro" else f"{s}.html") for s in SECTIONS}

# Rewrite section-level nav (#brand -> brand.html) so the static pages navigate
# between each other with plain browser links (no JS). Sub-anchors like
# #l-lockups keep their '#' form and work as native in-page jumps.
for sid, f in FILE.items():
    html = html.replace(f'href="#{sid}"', f'href="{f}"')
built = []
for sec in SECTIONS:
    doc = html
    # body state
    doc = doc.replace("<body>", f'<body class="{"at-home" if sec == "intro" else "at-section"}">', 1)
    # sidebar active section + its subs
    doc = doc.replace(f'<div class="nav-sec" data-sec="{sec}">',
                      f'<div class="nav-sec is-active" data-sec="{sec}">', 1)
    doc = doc.replace(f'<a class="ns-link" href="{FILE[sec]}"',
                      f'<a class="ns-link is-active" href="{FILE[sec]}"', 1)
    # keep only this section
    for other in SECTIONS:
        if other == sec:
            continue
        doc = re.sub(r'<section\b[^>]*id="%s".*?</section>\s*' % other, "", doc, flags=re.DOTALL)
    # ensure kept section is active
    doc = re.sub(r'(<section class="section)( is-active)?([^"]*" id="%s")' % sec,
                 r'\1 is-active\3', doc)
    name = "home" if sec == "intro" else sec
    (OUT / f"{name}.html").write_text(doc)
    size = (OUT / f"{name}.html").stat().st_size / 1024
    # sanity: exactly one <section>
    nsec = len(re.findall(r'<section\b', doc))
    built.append(f"  {name}.html  {size:6.0f} KB  sections={nsec}")

# tidy: remove temp mock dir from output (already inlined)
for f in MOCK.iterdir():
    f.unlink()
MOCK.rmdir()

print("Built pages:")
print("\n".join(built))
