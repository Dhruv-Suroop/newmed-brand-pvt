---
name: newmed-skills-design
description: Use this skill to generate well-branded interfaces and assets for NewMed Skills, either for production or throwaway prototypes/mocks/etc. Contains the locked brand system (7 colours, arrow geometry, Mona Sans), working engine code that draws the arrow and gradient correctly, UI kit components, and the full brand manual as an offline corpus.
user-invocable: true
---

Read `readme.md` in this skill, then explore the other files.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets
out and create static HTML files for the user to view. If working on production
code, copy assets and read the rules here to become an expert in this brand.

If invoked without other guidance, ask what the user wants to build, ask a few
questions, then act as an expert designer who outputs HTML artifacts *or*
production code depending on the need.

---

## Read this first: use the engine, don't redraw the arrow

`engine/arrow.js` is the **production file from the live manual**. The arrow's
geometry is a ratio that is easy to describe and easy to get wrong.

**Corner radius = 10% of height. Point length = 42.6% of height.** Only colour
changes.

```html
<script src="engine/arrow.js"></script>
<span data-arw="orange" style="display:inline-block;width:240px;height:64px"></span>
```

`arrow.js` paints every `[data-arw]` element. `window.NMArrow` exposes
`paint(el)`, `pathD(w,h,opts)` and `paintAll()`. `engine/gradient.js` exposes
`window.NMGradient` with `paint()` and `makeBlobs()`.

If you hand-draw an arrow, check it against `pathD()` before shipping.

---

## Quick reference

- **Brand:** NewMed Skills — healthcare workforce readiness and deployment
  (GCC + international). Sourcing, training, licensing, deployment.
- **Tagline:** **"Training Talent. Deploying Care."** Anything saying "Building
  Workforce-Ready Healthcare Talent" is out of date.
- **Name:** always "NewMed Skills", two words. Candidates = *you*, hospitals =
  *your team*, us = *we*.
- **Type:** Mona Sans (variable, OFL). Display tight and **600 — never heavier**;
  body 400 at 1.5. Loaded in `tokens/fonts.css`.
- **Colour:** orange `#FF5122` on cream `#F4F1EA`; Deep Brown `#391E1A` text;
  yellow / maroon / teal accents. Signature soft gradient "orbs".
- **Proportion:** ≈70% neutral · 20% orange · 10% maroon. The calm comes from
  restraint.
- **Motifs:** the arrow system; organic soft gradients (never hard circles);
  soft rounded corners; low warm shadows; nothing bounces.
- **Global CSS:** link `styles.css`. Tokens under `tokens/`. Components on
  `window.NewMedSkillsDesignSystem_*` (load `_ds_bundle.js`).
- **Banned words:** transformation, orchestration, lifecycle, leverage,
  solutions, seamless, empower, ecosystem. No emoji.

---

## The palette — exactly 7, locked

| Name | Hex | Role |
|---|---|---|
| **NewMed Orange** | `#FF5122` | the hero — a *signal*, used sparingly |
| **Yellow** | `#FF9D00` | warmth beside orange |
| **Maroon** | `#7C3134` | depth, for serious moments |
| **Deep Brown** | `#391E1A` | all text and dark surfaces |
| **Teal** | `#93CCCD` | the one cool note; most sparing of all |
| **Cream** | `#F4F1EA` | the page / primary light surface |
| **Off white** | `#EFE9E0` | sunken surfaces — cards, panels |

**Never use the retired names**, in copy or code: Signal Orange, Coral, Clinical
Ink, Amber, Vitals Teal, Clay, Linen, Bone.

`tokens/colors.css` also carries **derived** values (Deep Brown at opacity,
orange hover/press, gradient interpolation stops) and two **UI-only** status
colours. Those are interface state and must never appear on a brand surface.
Same rule as the data-visualisation extension — see `guidelines/COLOUR.md`.

---

## Arrow craft rules

- **Headline highlight** — minimum 2 words, on the phrase carrying the promise,
  **never the negative half of a sentence**, made the **last line** so nothing
  orphans, **one per headline**.
- **Icon chips** — glyph fills ~60% of the chip and sits at **42.2% of chip
  width**, not the geometric centre. The point adds mass on the right.
- **Portraits** — clipped by the arrow's **bottom half only**; head and shoulders
  break out of the top. Never boxed fully inside.
- **Size floor** — below **0.85×** the arrow's height the point and radii stop
  resolving and it reads as a lozenge.
- **Pattern** — the arrow may be tiled and **may be rotated** when used as a
  surface. The old "always points right" and "one dominant arrow" restrictions
  were dropped deliberately. Never behind body copy.

Full detail in `guidelines/ARROW-GEOMETRY.md`.

---

## Composition — what makes it look designed

1. **Composition-led, not motion-led.** Motion is the last 5%.
2. **One dominant move per page** — a full-bleed band, *or* a poster-scale arrow,
   *or* a giant photograph. Two competing moves read as noise.
3. **Poster scale.** Display around 150px. Bigger and one weight down beats
   smaller and bolder.
4. **One left-aligned editorial column** beats a symmetric grid for reading.
5. **Build layouts *from* the arrow and gradient system** — don't lay out a plain
   grid and decorate it.
6. **Nothing bounces.** Reduced motion must fail open.

Full detail in `guidelines/COMPOSITION.md`.

---

## Files worth knowing

| Path | What |
|---|---|
| `engine/arrow.js`, `gradient.js` | Production geometry. Call it, don't redraw it. |
| `engine/brand-tokens.css` | The 7 colours, lifted from the live stylesheet. |
| `guidelines/ARROW-GEOMETRY.md` | All 8 uses, nesting, pattern, the size floor. |
| `guidelines/COLOUR.md` | Palette, proportion, data-viz extension, contrast. |
| `guidelines/COMPOSITION.md` | Layout and motion rules. |
| `guidelines/APPLICATIONS.md` | Deck, social, signage, email, card, meeting bg. |
| `guidelines/TRAPS.md` | Mistakes already made and paid for. |
| `guidelines/BRAND-RULES-SOURCE.md` | The brand's own source-of-truth document. |
| `corpus/` | The full manual, self-contained HTML. **Ground truth.** |
| `components/`, `ui_kits/` | React components and two starter apps. |

**When anything here disagrees with `corpus/`, the corpus wins.**

---

## Before you ship

- [ ] Only the 7 brand colours on brand surfaces, using the final names
- [ ] No retired names anywhere — copy *or* code
- [ ] Arrows from the engine; sequences nest notched at gap 0
- [ ] One highlight per headline, 2+ words, last line, not the negative half
- [ ] Display at 600, never heavier
- [ ] Copy warm and human; no banned words
- [ ] Proportions roughly 70/20/10
- [ ] Nothing bounces; reduced motion respected
