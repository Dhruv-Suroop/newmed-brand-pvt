#!/usr/bin/env python3
"""Package the AI design skill.

The corpus is NOT stored in the repo: it is a byte-for-byte copy of pages/,
so tracking both would duplicate ~10MB. It is assembled here at package time,
which also guarantees the corpus can never drift from the manual.

Run after any change to the manual, the engine files, or skill/reference/:
    python3 build_skill.py
"""
import os, shutil, zipfile, pathlib

ROOT = pathlib.Path(__file__).parent
SKILL = ROOT / 'skill'
OUT = ROOT / 'assets/dl/newmed-ai-design-skill.zip'

# engine files are copied from production so they cannot fall out of sync
for src, dst in [('arrow.js','engine/arrow.js'), ('gradient.js','engine/gradient.js')]:
    shutil.copy2(ROOT/src, SKILL/dst)

count = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(SKILL.rglob('*')):
        if p.is_dir() or p.name.startswith('.') or 'corpus' in p.parts:
            continue
        z.write(p, f'newmed-skills-design/{p.relative_to(SKILL)}'); count += 1
    for p in sorted((ROOT/'pages').glob('*.html')):
        z.write(p, f'newmed-skills-design/corpus/{p.name}'); count += 1
    z.writestr('newmed-skills-design/corpus/README.md',
        (SKILL/'corpus/README.md').read_text())
    count += 1

print(f"  {count} files -> {OUT.relative_to(ROOT)}  ({OUT.stat().st_size/1048576:.1f} MB)")
