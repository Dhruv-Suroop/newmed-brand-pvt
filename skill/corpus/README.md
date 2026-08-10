# Corpus

The full NewMed Skills manual — eight sections: brand, logo, arrow, icons,
colour, type, applications, home.

**This is ground truth.** Where anything in `reference/` disagrees with these
files, these win: they are generated from the live manual by `build_pages.py`.

## What's inlined, and what isn't

The CSS, the JavaScript and Mona Sans are all **inlined as data URIs**, so the
pages render with their real type, colour and layout from the local filesystem.
The live generators are included too — arrow, pattern, icon, data-viz and
gradient — so you can watch the rules execute rather than read about them.

One exception: each page links **Material Symbols** from Google Fonts for its UI
icons. Offline, the pages still open and read correctly; those small icon glyphs
just fall back to their ligature text. Nothing about the brand system depends on
them.

## Reading these

Open any file in a browser. No server needed.

`arrow.html` is the densest and the best starting point — it carries the arrow
anatomy, all eight uses, the pattern builder and the size floor, live.
