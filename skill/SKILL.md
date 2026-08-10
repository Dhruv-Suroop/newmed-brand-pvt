---
name: newmed-skills-design
description: Design and build anything for NewMed Skills — decks, posters, social, signage, email, web UI, print. Contains the locked brand system (7 colours, the arrow geometry, Mona Sans), working engine code that draws the arrow and the gradient correctly, and the composition rules that make output look designed rather than templated. Use whenever the task involves NewMed Skills visuals or copy.
user-invocable: true
---

# NewMed Skills — design system

You are designing for **NewMed Skills**: healthcare workforce sourcing, training,
licensing and deployment, mostly into the GCC. Two audiences at once — hospitals
who need staff who can start, and clinicians who need someone to guide them
through Prometric, DataFlow and licensing. Speak to both without changing who
you are.

**Tagline: "Training Talent. Deploying Care."** (Confirmed Aug 2026. Anything
saying "Building Workforce-Ready Healthcare Talent" is out of date.)

---

## Read this first: use the engine, don't reimplement it

`engine/arrow.js` and `engine/gradient.js` are the **production files from the
live manual**, not illustrations of them. The arrow's geometry is locked to a
ratio that is easy to describe and easy to get wrong. Load the engine and call
it:

```html
<script src="engine/arrow.js"></script>
<span data-arw="orange" style="display:inline-block;width:240px;height:64px"></span>
<!-- arrow.js paints every [data-arw] element automatically -->
```

`window.NMArrow` exposes `paint(el)`, `pathD(w,h,opts)` and `paintAll()`.
`window.NMGradient` exposes `paint(ctx,W,H,state,t)` and `makeBlobs(recipe,seed)`.

If you hand-draw an arrow from the prose in `reference/arrow.md`, check it
against `pathD()` before shipping. Every arrow in the manual comes from this one
function; that is why they all agree.

---

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

No tints, no shades, no pure white, no invented colours.

**Never use these retired names** — in copy or in code: Signal Orange, Coral,
Clinical Ink, Amber, Vitals Teal, Clay, Linen, Bone. If you see them in an older
file, that file is stale.

**Proportion is a rule, not a suggestion.** Default ≈ 70% Off white · 20% Orange
· 10% Maroon. The calm comes from restraint. A full-bleed saturated pattern
spends the entire colour budget on its own — tint it or drop its opacity.

Data visualisation extends the palette by four (green `#8CCE84`, blue `#6F78C9`,
purple `#BD7FCC`, pink `#D6699D`). **Those four are charts only** and must never
touch a headline, arrow, background or logo. See `reference/colour.md`.

---

## The arrow — one shape, locked geometry

Rounded start cap · stretchable body · pointed cap.

**Corner radius = 10% of height. Point length = 42.6% of height.** Only colour
changes. Radius and point angle never do.

Eight legitimate uses — headline highlight, CTA button, eyebrow badge, number or
icon chip, portrait container, list rows, nested journey, poster scale. Each has
its own constraints; read `reference/arrow.md` before using any of them.

Three that trip people up most often:

- **Headline highlight** — minimum 2 words, on the phrase carrying the promise,
  never the negative half of a sentence, made the last line so nothing orphans,
  **one per headline**.
- **Portrait container** — clips the **bottom half only**. Head and shoulders
  break freely out of the top. Never box a cutout fully inside.
- **Size floor** — below ~0.85× the arrow's height the point and both radii stop
  resolving and it reads as a lozenge. Hard minimum.

---

## Typography

**Mona Sans only.** Display is tight and **600 — never heavier**. Body is 400 at
1.5 line-height. Sentence case for headings and buttons; all caps only for small
labels.

Go **bigger and one weight down** rather than smaller and bolder. That single
move is most of what separates this brand from a generic deck.

---

## Composition — how to make it look designed

The manual was rebuilt around these and they are the difference between
"on-brand" and "good". Full detail in `reference/composition.md`.

1. **Composition-led, not motion-led.** Motion is the last 5%.
2. **One dominant move per page.** A full-bleed band, or a poster-scale arrow, or
   a giant photograph — one. Two competing moves read as noise.
3. **Poster scale.** Display type large enough to feel printed.
4. **A single left-aligned editorial column** beats a symmetric two-column grid
   for reading.
5. **Build layouts *from* the arrow and gradient system.** Do not lay out a plain
   grid and then decorate it with brand elements.
6. **Nothing bounces.** Calm opacity and settle, decelerating curve. Reduced
   motion must fail open.

---

## Voice

Warm, human, reassuring, calm — **not sterile or clipped**. Warmth comes from
naming the real stakes (fees, visas, arriving alone), not from soft words. Vary
sentence length; do not machine-gun short sentences. Personality is a 2×2:
**Certain · Plain · Warm · Guiding**.

Always "NewMed Skills", two words. Candidates are *you*; hospitals are *your
team*; we are *we*. Spell out every acronym on first use — a nurse abroad may not
know it.

**Banned words:** transformation, orchestration, lifecycle, leverage, solutions,
seamless, empower, ecosystem. No emoji.

---

## Files in this skill

| Path | What it is |
|---|---|
| `engine/arrow.js` | Canonical arrow geometry. Load it; don't redraw it. |
| `engine/gradient.js` | The organic wash. Palette-locked by construction. |
| `engine/tokens.css` | The 7 colours as CSS variables, lifted from production. |
| `reference/colour.md` | Palette, proportions, data-viz extension, contrast pairs. |
| `reference/arrow.md` | All 8 uses, the geometry, nesting, patterns, the size floor. |
| `reference/composition.md` | The layout and motion rules that make it look designed. |
| `reference/applications.md` | Deck, social, signage, email, card, meeting background. |
| `reference/traps.md` | Mistakes already made and paid for. Read before debugging. |
| `assets/` | Logo lockups (colour + cream), symbol, favicon, Mona Sans variable. |
| `corpus/` | The full manual as self-contained HTML. Ground truth. |

**When something here disagrees with `corpus/`, the corpus wins** — it is
generated from the live manual.

---

## Before you ship

- [ ] Only the 7 colours, using the final names
- [ ] No retired names anywhere — copy *or* code
- [ ] Arrows drawn by the engine; sequences nest notched at gap 0
- [ ] One arrow highlight per headline, 2+ words, last line, not the negative half
- [ ] Display type at 600, not heavier
- [ ] Copy reads warm and human; no banned words
- [ ] Colour proportions roughly 70/20/10
- [ ] Nothing bounces; reduced motion respected
