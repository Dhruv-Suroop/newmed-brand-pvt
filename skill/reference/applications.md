# Applications

How the system lands on each surface. Specs are from the built templates, so
they are what the brand actually ships, not aspirations.

---

## Email signature

Table-based HTML, web-safe Arial fallback — mail clients will not load Mona Sans,
so the signature falls back cleanly while keeping brand colours and structure.

- Logo **200px wide**, sourced at **400px** for retina
- 2px Orange rule between the logo cell and the details cell
- Name: 16px bold Deep Brown · Credentials: Maroon, regular
- Title: 13px Maroon · Contact: 12px, email links Orange
- **Tagline "Training Talent. Deploying Care." in Orange `#FF5122`, full
  strength.** It is a fixed constant, not an editable field — staff cannot
  reword or drop it.

Two things that matter: the logo must live on a **publicly reachable** URL, since
recipients' mail clients fetch it with no session; and **do not use opacity** for
de-emphasis, because Outlook flattens alpha and the result goes chalky. Use
colour.

---

## Business card

3.5 × 2 in, 252 × 144 units.

- **Brand face:** Orange ground, cream stack lockup left, thin vertical rule,
  tagline right, `newmedskills.com` centred at the bottom.
- **Details face:** Cream ground; name in a white arrow, designation in Orange
  beneath, contact block and address.

The details face carries **live `<text>` nodes** bound to form fields. Do not
replace it with outlined artwork — see `traps.md`.

---

## Meeting background

1920 × 1080. Brand gradient wash with a logo placed over it.

- **Never centre the logo.** Dead centre is behind the caller's head. Default to
  centre-right or a bottom corner.
- Logo colour follows the ground: cream on Deep Brown / Orange washes, Deep Brown
  on Cream washes.
- Export JPG — both Teams and Zoom accept it and the file is smaller.

---

## Presentation

- Title slide: poster-scale display type, one arrow highlight on the promise
- Section dividers: the six stages — Source · Assess · Train · License · Deploy ·
  Support
- One dominant move per slide. A slide with a full-bleed band does not also get a
  giant arrow.
- Body 400 at 1.5; never fill a slide with paragraphs

---

## Social

Square or 4:5. Poster scale is the whole point — the type should be readable in a
feed at thumbnail size.

- One statement per post
- The arrow highlight carries the promise half of the sentence
- Gradient wash or flat Orange ground; avoid busy photography behind type

---

## Signage

- Exterior: Orange ground, cream lockup, or cream ground with the Orange app icon
- Interior wayfinding: Deep Brown on Cream, Orange for the mark only
- Keep clear space; the lockup needs room to read at distance

---

## Print collateral

Letterhead, folders, certificates: mostly Cream, Deep Brown text, Orange used as
a signal — a rule, a mark, one highlight. Not a background.

Proportion matters more in print than on screen, because a saturated field costs
ink and reads heavier on stock than it does backlit.

---

## Iconography

**Single colour · thick strokes · no sharp corners · simplified and clean, no
clutter.**

Icons sit inside arrow chips at ~60% of chip size, optically centred at 42.2% of
chip width.

Library icons often ship with no `fill` and no `currentColor`, so they export
black even when they preview correctly via CSS. Set the fill explicitly when
exporting.

---

## Charts

See `colour.md` for the eight-colour sequence and the eight-category limit.

Always label figures that are illustrative rather than real. A brand manual
showing invented numbers without a disclaimer teaches people to ship invented
numbers.
