# The arrow

One shape: **rounded start cap · stretchable body · pointed cap.** It is the
brand's whole visual identity. Everything else is type and colour.

It is an **arrow**. Never call it a chevron.

---

## Locked geometry

- **Corner radius = 10% of height**
- **Point length = 42.6% of height**

Only colour may change. Radius and point angle never do, at any size.

Master height 165.88, so at scale `s = height / 165.88`:
`radius = 16.59 · s`, `point = 70.59 · s`.

Do not hand-draw this. `engine/arrow.js` exposes `NMArrow.pathD(w, h, opts)` and
paints any element carrying `data-arw`. Every arrow in the manual comes from that
one function, which is the only reason they all agree with each other.

```html
<span data-arw="orange" style="display:inline-block;width:280px;height:72px"></span>
```

Colour tokens: `orange` `yellow` `maroon` `teal` `cream` `offwhite` `ink`.
(`coral`, `amber`, `white`, `bone` still resolve as legacy aliases so old markup
keeps painting — never write new markup with them.)

**Elements smaller than 4×4px are skipped.** If an arrow isn't painting, check it
has a measured size first — a `display:none` ancestor is the usual cause.

---

## Nesting

A *following* arrow uses a **notched** left edge — concave, mirroring the point —
so segments interlock **seamlessly at zero gap**. Use for journeys, sequences and
the colour proportion bars.

Gap 0 is the point. A visible gap between nested arrows is a bug, not a style
choice.

---

## Fill

Default is the **Yellow → Orange gradient**. Flat orange, yellow or Deep Brown
are the alternates. Gradients are organic and soft — **never hard-edged**.

Text inside an arrow: **Cream** on orange, gradient or Deep Brown fills;
**Deep Brown** on yellow. Always keep the contrast.

---

## The eight uses

Each is a distinct, legitimate application. They are not interchangeable.

### 1. Headline highlight
The key phrase set inside the arrow.

- Minimum **2 words**
- Highlight the phrase carrying the **movement or promise** — never filler
- **Never the negative half of a sentence.** In *"Trust is demonstrated, not
  claimed"* the arrow goes on **"is demonstrated"**, never on "not claimed"
- Make it the **last line** so no word orphans
- **One arrow per headline.** Not two, not one per paragraph

Do not use it where the arrow's fill matches its ground — orange-on-orange
disappears.

### 2. CTA button
Arrow-shaped, for emphasis. One primary per view.

### 3. Eyebrow badge
Outline arrow; may hold an icon. Small, above a heading.

> The manual's eyebrow is rendered from an **optically corrected** SVG, not from
> the generator: only the two straight horizontal runs stretch, every curve and
> radius stays verbatim. Those tweaks are deliberately *not* fed back into
> `arrow.js`. If you need that exact badge, copy the artwork rather than
> generating it.

### 4. Number or icon chip
The glyph fills **~60% of the chip** — big and confident, not a small mark
floating in a large shape.

Optical centring: the glyph does **not** sit at the geometric centre. It sits at
**42.2% of the chip width**, measured from the artwork. Centring it
mathematically makes it look pushed right, because the point adds visual mass on
that side.

### 5. Portrait container
Clips the **bottom half only**. Head and shoulders break freely out of the top.

**Never box a cutout fully inside the arrow.** The break-out is the whole idea —
containing it kills the movement.

### 6. List rows
Full-width arrow rows.

### 7. Nested journey / sequence
Notched, gap 0. See Nesting above.

### 8. Poster scale
A giant arrow holding photography or a whole section; translucent stacked process
arrows. This is where the brand looks most itself — use it more than feels
comfortable.

---

## Pattern and texture

The arrow **may be tiled as a surface, and may be rotated when used this way.**

The earlier restrictions — "one dominant arrow per composition" and "always
points right" — were **deliberately dropped** for pattern use. Do not
reintroduce them.

What still applies:

- **Never behind body copy.** It competes and the text loses.
- **Never below the size floor** (below).
- **Proportion still governs.** A full-bleed saturated pattern spends the entire
  colour budget by itself — tint it, or drop its opacity.

---

## The size floor

Below roughly **0.85× the arrow's height**, the point and both corner radii stop
resolving and the shape reads as a **lozenge, not an arrow**.

This is the hard minimum for pattern density and for any small chip. The pattern
builder in the manual enforces it as `MIN_FACTOR = 0.85` and disables the "add"
control once a row is full — mirror that behaviour rather than letting a user
shrink past it.

---

## Never

- Describe the shape in words right next to it ("the arrow shape below…")
- Box a cutout fully inside it
- Use hard-edged gradients
- Make anything bounce
- Put the highlight on the negative half of a sentence
- Use more than one highlight per headline

---

## Baseline

Global `[data-arw] { vertical-align: middle }` drops an inline highlight about
10px below the surrounding text. Use `vertical-align: baseline` for arrows that
sit inside a line of type. Verified glyph-to-glyph at 0 offset.

---

## The journey graphic — two variants

`six-stages.svg` exists twice because the arrows must contrast with what sits
behind them:

| File | Arrow fill | Correct ground |
|---|---|---|
| `six-stages.svg` | `#EFE9E0` Off white | the **page background** (Cream) |
| `six-stages-onband.svg` | `#F4F1EA` Cream | a **sunken Off white band** |

Put either on the wrong ground and the arrows vanish, because the fill matches
the background exactly. **Never "fix" the original to suit a band** — make a
variant.
