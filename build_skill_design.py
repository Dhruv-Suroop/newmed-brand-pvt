#!/usr/bin/env python3
"""Package the Claude Design version of the skill.

Keeps the pack's own structure (SKILL.md, components/, ui_kits/, tokens/,
guidelines/) so it drops into Claude Design unchanged, but with corrected
tokens plus our engine, guidelines and corpus overlaid.

Engine files are re-copied from production on every build so the packaged
copy cannot drift from the live manual.
"""
import shutil, zipfile, pathlib
ROOT = pathlib.Path(__file__).parent
PACK = ROOT / 'skill-design'
OUT  = ROOT / 'assets/dl/newmed-skills-design-system.zip'

for src, dst in [('arrow.js','engine/arrow.js'), ('gradient.js','engine/gradient.js')]:
    shutil.copy2(ROOT/src, PACK/dst)
for p in (ROOT/'pages').glob('*.html'):
    shutil.copy2(p, PACK/'corpus'/p.name)

n = 0
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    for p in sorted(PACK.rglob('*')):
        if p.is_dir() or p.name.startswith('.'):
            continue
        z.write(p, f'NewMed Skills Design System/{p.relative_to(PACK)}'); n += 1
print(f"  {n} files -> {OUT.relative_to(ROOT)}  ({OUT.stat().st_size/1048576:.1f} MB)")
