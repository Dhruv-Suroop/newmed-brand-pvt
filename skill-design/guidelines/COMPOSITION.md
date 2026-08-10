# Composition

Everything in the palette and arrow files makes work *on-brand*. This file is
what makes it *good*. The manual was rebuilt around these rules and the
difference was not subtle.

---

## 1. Composition-led, not motion-led

Decide the composition first. Motion is the last 5% and cannot rescue a weak
layout. If the page is boring when frozen, animating it makes it a boring page
that moves.

## 2. One dominant move per page

A full-bleed Deep Brown band, **or** a poster-scale arrow, **or** a giant
photograph. **One.** Two competing moves read as noise and both lose.

The manual uses exactly one dominant move per section, and the sections that
work best are the ones that commit hardest to a single idea.

## 3. Poster scale

Display type large enough that it feels printed, not typed. The manual runs
display type around **150px** on desktop. Most people set it half that and it
reads as a document rather than a designed page.

**Bigger and one weight down** beats smaller and bolder. Weight 600 at 150px has
presence; weight 800 at 60px just looks heavy.

## 4. One left-aligned editorial column

A single left-aligned column beats a symmetric two-column grid for anything meant
to be read. The manual explicitly collapsed a two-column sub-heading grid into
one column and it improved immediately.

Cap measure around **64–70 characters**. Longer and the eye loses the line.

## 5. Build *from* the system, don't decorate with it

Do not lay out a plain grid and then add brand elements on top. Start from the
arrow, the gradient wash, the cutout — let the layout come out of them.

This is the single biggest difference between output that looks templated and
output that looks designed. A neutral card grid with an orange accent is not
this brand; a composition built from arrow geometry is.

## 6. Use restraint as the effect

The palette is warm and loud. The calm comes from **how little** of it you use.
70% neutral is not a compromise — it is what makes the 20% orange land.

---

## The concrete moves

The specific patterns the manual is built from, with the real values from its
stylesheet. These are what "poster scale" and "full banners" mean here.

### Full-bleed hero

Every section opens with one: an **Orange** band running edge to edge.

```css
background: var(--orange);
padding-top:    clamp(60px, 10vw, 140px);
padding-bottom: clamp(60px, 10vw, 140px);
margin-bottom:  clamp(56px, 8vw, 120px);
```

Inside it: an eyebrow badge, then the section title, then one short lead. The
title is `clamp(36px, 5.4vw, 68px)`. Left-aligned, hard against the content edge.

### Full-bleed dark band

The one dominant move inside a section. Deep Brown, cream type.

```css
background: var(--deep-brown);
color: var(--cream);
/* full-bleed by cancelling the page gutter, then re-adding it as padding */
margin:  clamp(60px,8vw,104px) calc(-1 * clamp(20px,3.4vw,52px)) 0;
padding: clamp(46px,6vw,88px) clamp(20px,3.4vw,52px);
```

The negative margin equals the page gutter exactly — that is what makes it break
the column without the content inside shifting.

- **One per page.** A second band halves the effect of both
- The standard gradient orb goes milky on this ground — use a warm-glow-only
  variant
- Never full-bleed a pattern behind body copy

### Poster-scale type

Reserved for moments that carry weight — the type specimen, a standalone
statement — not for every heading.

```css
font-size: clamp(64px, 13vw, 150px);
font-weight: 600;          /* never heavier */
letter-spacing: -.03em;
line-height: .9;
```

Two or three words per line at most. Let it wrap early and hard.

The hierarchy that actually ships:

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Poster / specimen | `clamp(64px, 13vw, 150px)` | 600 | −.03em |
| Section title | `clamp(36px, 5.4vw, 68px)` | 600 | — |
| Sub-heading | `clamp(26px, 3.4vw, 40px)` | 600 | −.025em |
| Lead | 17–22px | 400 | — |
| Body | 15–17px, 1.5 | 400 | — |

Tracking tightens as size grows. That is the whole trick — large type set at
default tracking looks loose and amateur.

### Editorial rows

For lists of substance — attributes, principles, stages — do **not** use a card
grid. Use full-width rows: a number or short label left, a heading and one
paragraph right, a hairline rule between, nothing else.

A four-up card grid makes four things look small and interchangeable. Four
editorial rows make them look considered.

### Sunken panels

Content that sits *on* the page rather than *in* it: **Off white** `#EFE9E0` on
the Cream page, `border-radius: 14px`, no border, no drop shadow. The tonal step
alone does the work.

---

## Type

- **Mona Sans only.** Variable weight.
- Display: tight tracking, **600, never heavier**
- Body: 400 at 1.5 line-height
- Sentence case for headings and buttons; all caps only for small labels
- Numerals when a number is meaningful

**No orphan words in headlines.** If the arrow highlight is the last line, this
solves itself — which is part of why the highlight goes last.

---

## Motion

Calm opacity and settle on a **decelerating curve**. Slow, unhurried,
non-repeating.

**Nothing bounces.** No spring easing, no overshoot, no bounce-in. It reads as
playful and this brand is not.

**Reduced motion must fail open** — if the system asks for reduced motion, or the
observer API is missing, everything must still be visible. A reveal animation
that fails closed leaves the page blank, which is far worse than no animation.

Pause anything running when it scrolls out of view.

---

## The gradient orb hover

The manual uses a soft gradient orb that responds to hover on its most important
sections — the promise card, the journey band, the positioning band. It is worth
copying, with one caveat:

**On Deep Brown grounds, the stock orb's off-white radials go milky.** Use a
warm-glow-only variant there. Do not reuse the light-ground orb on a dark band.

---

## Photography

Cutouts, clipped by an arrow's **bottom half only**, head and shoulders breaking
out of the top. See `arrow.md` §5.

Never box a subject fully inside a shape. The break-out is the movement.

---

## A quick self-check

Before shipping a layout, ask:

1. What is the **one** dominant move? If you can name two, cut one.
2. Is the display type big enough to feel printed?
3. Did the layout come **from** the arrow/gradient system, or get decorated with it?
4. Is roughly 70% of the surface neutral?
5. Is there exactly one arrow highlight, on the promise, as the last line?
6. Does anything bounce? (It should not.)
