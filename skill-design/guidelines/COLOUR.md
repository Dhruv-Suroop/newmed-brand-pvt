# Colour

## The palette — exactly 7, locked

| Name | Hex | Role |
|---|---|---|
| **NewMed Orange** | `#FF5122` | the hero — a *signal*, used sparingly |
| **Yellow** | `#FF9D00` | warmth beside orange |
| **Maroon** | `#7C3134` | depth, for serious moments |
| **Deep Brown** | `#391E1A` | all text and dark surfaces (a warm near-black) |
| **Teal** | `#93CCCD` | the one cool note; the most sparing of all |
| **Cream** | `#F4F1EA` | the page / primary light surface |
| **Off white** | `#EFE9E0` | sunken surfaces — cards, panels |

No tints. No shades. No pure white. Never invent one.

The two neutrals are the pair people get backwards:
**Cream `#F4F1EA` is the page. Off white `#EFE9E0` is what sits *on* the page.**

---

## Retired names — never use, in copy or code

| Retired | Use instead |
|---|---|
| Signal Orange, Coral | **NewMed Orange** |
| Clinical Ink | **Deep Brown** |
| Amber | **Yellow** |
| Vitals Teal | **Teal** |
| Clay | **Maroon** |
| Linen, Bone | **Off white** |

Older files may still carry these. Those files are stale, not authoritative.

> Watch for a specific trap in inherited token sets: some define `--nm-coral:
> #ff5122` **and** `--nm-orange: #ff7822` — two different colours. Under the
> current naming, "orange" means `#FF5122`. A token set where `orange` resolves
> to `#ff7822` will silently produce a colour that is not in the palette.

---

## Proportion — a rule, not a suggestion

- **Default:** ≈ 70% Off white · 20% NewMed Orange · 10% Maroon
- **Variant:** ≈ 70% Maroon · 10% Orange · 10% Yellow · 10% Off white

Dark and saturated colours are used **minimally**. Keep it mostly light, soft,
subtle, calm. The calm comes from restraint and from the soft gradients — not
from muting the orange, which should stay at full strength wherever it appears.

A full-bleed saturated pattern spends the whole colour budget on its own. Tint
it or drop its opacity.

Shown in the manual as **seamless nested-arrow proportion bars** — segments nest
with zero gap.

---

## Gradients

The signature is an **organic soft wash**, never hard-edged circles and never a
linear ramp with visible banding.

Default is **Yellow → Orange**. `engine/gradient.js` composites it from palette
colours only, so anything it produces is on-palette by construction. Its recipes:

| Recipe | Ground | Blobs |
|---|---|---|
| `organic` | cream | yellow, orange, off white |
| `sunrise` | orange | yellow |
| `sunriseAlt` | yellow | orange |
| `deep` | Deep Brown | yellow, hugging one edge |
| `deepAlt` | Deep Brown | orange, hugging one edge |

Render it at low internal resolution and let it scale up — that upscale is what
makes the blend soft. Drawing it at full resolution gives you circles.

---

## Text contrast

| Ground | Text |
|---|---|
| Cream, Off white | Deep Brown |
| Orange, gradient, Deep Brown, Maroon | Cream |
| Yellow | **Deep Brown** — cream fails on yellow |
| Teal | Deep Brown |

Yellow is the one that catches people out. It is bright enough to look like it
takes white, and it does not.

---

## Data visualisation — an extension, not the palette

Charts need more distinguishable hues than seven brand colours provide. Cycle in
**this fixed order**:

| # | Name | Hex | |
|---|---|---|---|
| 1 | Orange | `#FF5122` | brand |
| 2 | Yellow | `#FF9D00` | brand |
| 3 | Maroon | `#7C3134` | brand |
| 4 | Teal | `#93CCCD` | brand |
| 5 | Green | `#8CCE84` | **data-viz only** |
| 6 | Blue | `#6F78C9` | **data-viz only** |
| 7 | Purple | `#BD7FCC` | **data-viz only** |
| 8 | Pink | `#D6699D` | **data-viz only** |

**The last four are charts only.** They must never appear on a headline, arrow,
background or logo. Section 1 governs everything that is not a chart.

**Cream and Deep Brown are deliberately excluded** from the sequence: one
disappears into the page, the other reads as black rather than as a category.

**Eight categories is the hard limit** in multi-colour mode. Past that, drop the
extra rows *and say so* — group the smallest categories, or switch to
single-colour. Silently truncating data is worse than refusing it.

---

## Print

Pantone is preferred for print; CMYK only when Pantone is unavailable, matched to
Pantone where possible. Official values are pending — do not invent them.

Note the card artwork uses `#F1552B` / `#F7F3EA` rather than `#FF5122` /
`#F4F1EA`. That is a deliberate print-converted orange carried over from the
source files, not a mistake to correct.
