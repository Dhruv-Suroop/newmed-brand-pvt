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
