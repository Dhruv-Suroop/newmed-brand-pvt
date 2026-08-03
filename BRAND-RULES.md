# NewMed Skills — Brand Rules & Build Checklist

**Single source of truth.** If anything on the site disagrees with this, this wins.
For everyone building the manual: Claude, Antigravity/Gemini, and Claude Design.

---

## 1. The palette — final names (LOCKED)

Exactly **7 colours**. No tints, no shades, no extra colours, no white. Never invent one.

| Name | Hex | Role |
|---|---|---|
| **NewMed Orange** | `#FF5122` | the hero — a *signal*, used sparingly |
| **Yellow** | `#FF9D00` | warmth beside orange |
| **Maroon** | `#7C3134` | depth, for serious moments |
| **Deep Brown** | `#391E1A` | all text + dark surfaces (a warm near-black) |
| **Teal** | `#93CCCD` | the one cool note; the most sparing of all |
| **Off White** | `#F4F1EA` | the page / primary light surface |
| **Off White (deep)** | `#EFE9E0` | sunken surfaces — cards, panels |

**Retire these words everywhere** (copy *and* code): Signal Orange, Coral → **NewMed Orange**; Clinical Ink → **Deep Brown**; Amber → **Yellow**; Vitals Teal → **Teal**; Clay → **Maroon**; Linen / Bone → **Off White (deep)**; Cream → **Off White**.

> Open question for Dhruv: two neutrals both read as "Off White." Keep it that way, or give the deep one its own plain name (e.g. **Sand**)?

---

## 2. Terminology — say it the same everywhere

- It is an **arrow**. Never "chevron".
- The orange is **NewMed Orange** (or just "orange"). Never "coral".
- Use "off white", not "cream / linen / bone" in copy.
- The name is always **NewMed Skills** — two words.

---

## 3. Colour proportions — how much of each

- **Default:** ~70% Off White · 20% NewMed Orange · 10% Maroon.
- **Variant:** ~70% Maroon · 10% Orange · 10% Yellow · 10% Off White.
- Dark & saturated colours are used **minimally**. Keep it mostly light, soft, subtle, calm — the calm comes from restraint and the soft gradients.
- Shown as **seamless nested-arrow proportion bars** in the colour "How to use the colours together" section (segments nest with **zero gap**).

---

## 4. The arrow system — instructions for Claude Design (follow exactly)

**One shape:** rounded start cap · stretchable body · pointed cap.

**Locked geometry (never changes):** corner radius = **10% of height**; point length = **42.6% of height**. Only colour may change — radius and point angle never do. (Master height 165.88; radius = 16.59·s; point = 70.59·s, where s = height/165.88.)

**Nesting:** a *following* arrow uses a **notched** left edge (concave, mirrors the point) so segments interlock **seamlessly at zero gap**. Use for journeys, sequences, and the proportion bars.

**Fill:** default is the **Yellow → Orange gradient**. Flat orange, yellow, or deep brown are the alternates. Gradients are organic and soft — never hard-edged.

**Text inside an arrow:** Off White on orange / gradient / deep-brown fills; Deep Brown on yellow. Always keep contrast.

**Uses** (each is a legitimate, distinct application):
1. **Headline highlight** — the key phrase set inside the arrow. Minimum **2 words**; highlight the phrase carrying the movement/promise (never filler, never the negative half of a sentence); make it the **last line** so no word orphans; **one arrow per headline**.
2. **CTA button** — arrow-shaped, to create emphasis.
3. **Eyebrow badge** — outline arrow; may hold an icon.
4. **Number / icon chip** — the glyph fills ~60% of the chip, big and confident.
5. **Portrait container** — clips the **bottom half only**; head and shoulders break freely out the top.
6. **List rows** — full-width arrow rows.
7. **Nested journey / sequence** — notched, gap 0.
8. **Poster scale** — giant arrow holding photography or whole sections; translucent stacked process arrows.

**Never:** describe the shape in words right next to it; box a cutout fully inside; use hard-edged gradients; make anything bounce.

---

## 5. Voice & tone

- **Warm, human, reassuring, calm — not sterile or clipped.** Warmth comes from naming the real stakes (fees, visas, arriving alone), not from soft words. **Vary sentence length**; don't machine-gun short sentences.
- Personality is a **2×2 grid**: Certain · Plain · Warm · Guiding. ("Credible" is removed — it repeated "Certain".)
- ⏳ *Blocked on Dhruv:* give 2–3 sample lines in the exact register you want, and the tone pass gets applied across Brand, Arrow and Colour copy.

---

## 6. Typography

- **Mona Sans only.** Display is tight and semibold (**600, never heavier**); body is regular (400) at 1.5 line-height.
- The scale section is **"Type hierarchy"**, shows the weights (per the PPT), and folds "display" into "heading".

---

## 7. Consistency checklist — tick before shipping any page

- [ ] Only the 7 colours, with the **final names** in copy.
- [ ] No "chevron", no "coral", no old names (Signal Orange / Clinical Ink / Amber / Vitals Teal / Clay / Linen).
- [ ] Arrows use the locked geometry; sequences **nest** (notched, gap 0).
- [ ] Copy reads warm and human, not clipped.
- [ ] Sidebar nav labels **match** the section headings.
- [ ] `python3 build_pages.py` re-run and `pages/` committed.
- [ ] Palette audit clean, JS syntax valid.

---

## 8. Open cleanup tasks (for Gemini — do as focused passes, verify after each)

**A. Rename sweep — separate visible copy from code tokens (this is the error-prone one):**
  - *Copy only* (visible text in index.html): Signal Orange → NewMed Orange · Amber → Yellow · Clay → Maroon · "coral" → "orange". Do **not** touch attribute values or class names here.
  - *Code tokens* (coordinated, then verify nothing renders black/blank): in `arrow.js` the fill-map key `coral:'#ff5122'` → `orange:'#ff5122'`; every `data-arw="coral"` in index.html → `data-arw="orange"`; the two `|| 'coral'` fallbacks → `|| 'orange'`. If also renaming `amber` → `yellow` as a token: map key + all `data-arw="amber"` + `.tg-sw-amber` + typegen `HEX/TEXTON` keys + `data-fill` + the gradient comment/var. **Do orange first, verify the whole site paints, then do yellow.**
  - After: `grep -ri "coral\|signal orange\|clinical ink\|vitals teal"` → 0 (excluding the 5 intentional misuse-demo hexes).

**B. Personality → 2×2:** remove the "Credible" attr-card; set `.attr-grid` to 2 columns.

**C. De-dupe headings:** ✅ sidebar "The system in parts" → "Using the arrow" (done); also confirm the colour H1 "warm, with one cool note" is gone (the new lead "A grounded, warm palette" is in).

**D. Tone rewrite:** after Dhruv's sample lines — warm up Brand + Arrow + Colour copy; break up the clipped short-sentence runs.

**E. Logo section:** move the logo **story** into the Logo section; add a big orange rectangle holding the logo (placeholder for the kinetic logo); condense the fluff; downloads → **two rounded rectangles** (orange/brown version + white version) with a download button under each, not a button per lockup; fix the lockup grid (even rectangle sizes, scale down the badge & vertical, resolve the "default lockup" contradiction, put each option's caption right beside it).

**F. Gradient copy:** "Signal Orange to Amber gradient" → "Orange to Yellow gradient".

---

*Kept current by whoever ships. Last structural update: proportion viz made seamless; nav de-duped.*
