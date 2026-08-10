# Traps

Mistakes already made and paid for while building the manual. Each cost real
time. Read this before debugging anything — the answer is often here.

---

## Arrows

**An arrow won't paint.** `arrow.js` skips elements under 4×4px. The usual cause
is a `display:none` ancestor — a hidden section has zero-size children, so
nothing paints and nothing errors. Repaint after the section becomes visible.

**An inline highlight sits ~10px too low.** A global
`[data-arw]{vertical-align:middle}` does this. Use `baseline` for arrows inline
with type.

**A nested sequence has visible gaps.** The following arrow needs a *notched*
(concave) left edge. Gap 0 is the design; a gap means the notch is missing.

**An arrow reads as a lozenge.** It's below the 0.85× size floor. The point and
radii stop resolving. Scale up or use fewer per row.

**The chip glyph looks pushed right.** You centred it geometrically. It belongs
at **42.2% of chip width** — the point adds visual mass on the right, so optical
centre is left of geometric centre.

---

## Colour

**"Orange" produced the wrong colour.** An inherited token set defines
`--nm-coral: #ff5122` alongside `--nm-orange: #ff7822`. Under current naming,
orange is `#FF5122`. Check what your token actually resolves to.

**Arrows vanished on a band.** `six-stages.svg` (Off white arrows) is for the
Cream page background; `six-stages-onband.svg` (Cream arrows) is for a sunken
Off white band. Wrong pairing makes fill match ground exactly. Never edit the
original to fix a band — make a variant.

**Cream text on yellow is unreadable.** Yellow takes Deep Brown, not cream. It
looks bright enough to take white; it isn't.

**An orb went milky on a dark band.** The stock orb's off-white radials do that
on Deep Brown. Use the warm-glow-only variant.

---

## SVG

**Text in an SVG can't be found by grep.** Outlined text is `<path>` data. The
manual's business card carried the retired tagline as outlined paths and a text
search reported the site clean — it wasn't. **Render suspect SVGs and look at
them.** Files with many paths and no `<text>` node are the candidates.

**An SVG won't rasterise into a canvas at a chosen size.** If it has a `viewBox`
but no `width`/`height`, Firefox refuses. Inject `width`/`height` from the
viewBox before building the blob URL.

**Replacing an SVG broke an editable template.** Some artwork carries live
`<text>` nodes bound to form fields by their placeholder content. Swapping in
fully-outlined artwork kills the binding silently — no error, the form just stops
affecting the output. Check for `<text>` before replacing.

**Recolouring an SVG needs the right file.** Artwork whose class declares no
`fill` can be recoloured by a `fill` attribute on the `<svg>` root. Artwork with
a hard-coded fill in its class cannot. Pick the unfilled variant.

---

## Layout

**A horizontal scroller ran to the viewport edge.** `scroll-snap-align: start`
snaps the first item to the **padding box**, so the browser scrolls away exactly
the padding meant to create the margin. Full-bleed via negative margin + matching
padding does not survive scroll snapping.

**A generator's canvas measured zero.** Sections hidden with `display:none`
report zero size. Measure and paint after the section is shown, not on load.

**A reveal animation left elements invisible.** A fast scroll can jump an element
past the viewport without it ever intersecting, so IntersectionObserver never
fires. Add a throttled scroll sweep as a backstop, and fail open.

---

## Process

**Changes didn't appear.** CSS and JS are cache-busted with `?v=N`. Bump it. This
was the cause more often than any actual bug.

**A deploy looked broken.** Deploys are not atomic — HTML can propagate before
its assets. A missing image right after a push is usually propagation, not a bad
file. Re-check before concluding anything.

**A find-and-replace hit only some elements.** Markup had two attribute orders
(`<a data-soon class=...>` and `<a class=... data-soon>`). A regex assuming one
found 21 of 29. **Count matches against expected count and abort on mismatch.**

**Files were deleted that shouldn't have been.** `git rm --cached` untracks and
keeps the file. `git rm` deletes it. When cleaning a repo, `--cached` only — and
verify the local file count before and after.

**Transcribing a large SVG by hand.** Don't. Copy the file. A single mistyped
character in path data produces a subtly wrong glyph that no validator catches.
