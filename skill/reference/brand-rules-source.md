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
| **Cream** | `#F4F1EA` | the page / primary light surface |
| **Off white** | `#EFE9E0` | sunken surfaces — cards, panels |

**Retire these words everywhere** (copy *and* code): Signal Orange, Coral → **NewMed Orange**; Clinical Ink → **Deep Brown**; Amber → **Yellow**; Vitals Teal → **Teal**; Clay → **Maroon**; Linen / Bone → **Off white**. (**Cream** is the light one, `#F4F1EA`.)

> ✅ Resolved (Aug 4): the light neutral is **Cream** `#F4F1EA`, the sunken one is **Off white** `#EFE9E0`. Applied in `v3.html`; **`index.html` still uses the older "Off white / Off white (deep)" pair.**

---

## 2. Terminology — say it the same everywhere

- It is an **arrow**. Never "chevron".
- The orange is **NewMed Orange** (or just "orange"). Never "coral".
- Neutrals are **Cream** (the page) and **Off white** (sunken surfaces). Never "linen" or "bone".
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

**Text inside an arrow:** Cream on orange / gradient / deep-brown fills; Deep Brown on yellow. Always keep contrast.

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

**Pattern / texture (Aug 4).** The arrow may be tiled as a surface and may be rotated when used this way — the earlier "one dominant arrow per composition" and "always points right" restrictions were dropped deliberately. Limits that remain: never behind body copy; keep it above the size floor below; and remember section 3's proportion rule still applies, so a full-bleed saturated pattern spends the whole colour budget — tint it or drop its opacity.

**Size floor.** Below roughly **0.85x the arrow's height** the point and both corner radii stop resolving and the shape reads as a lozenge, not an arrow. This is the hard minimum for pattern density and for any small chip.

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

## 8. Open cleanup tasks — STATUS (Aug 3)

**A ✅ done** (tokens + copy renamed, audit clean, arrows verified). **B ✅ done** (2×2, Credible removed). **C ✅ done.** **D — moot** (voice section removed). **E ⚠️ mostly done** — logo story/kinetic placeholder/two download rectangles/lockup-grid evening/default-lockup contradiction all done; **still pending on Dhruv's assets:** the real kinetic logo + the rounded-rectangle graphic. **F ✅ done.** **§10 Iconography ✅ built.** Original task text kept below for reference.

## 8 (original). Open cleanup tasks (for Gemini — do as focused passes, verify after each)

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

---

## 9. Voice & Tone — ❌ REMOVED (Aug 3, at Dhruv's request)

**Status:** the Voice & tone section has been **removed from the site entirely** — no `#voice` section, no nav entry, no `pages/voice.html`. The spec below is retained only as a record of the intended content, in case it is ever revived. Do not rebuild without Dhruv confirming.

Voice was (previously) to be rebuilt from the input doc. It is **not** a repeat of the Brand personality (the 2×2 Certain/Plain/Warm/Guiding stays under Brand). Intro should feel warm, empathetic, human.

**Three tones** (drop all other variants; frame metrics as traits each tone *has*, never "low X"):
- **Clinical** — the most factual, specific tone. The reader wants information that is complete and to the point, without emotion. *To the point · Upfront · Specific.* Touchpoints: compliance docs · licensing pages · detailed FAQs · terms.
- **Standard** — the default for most of the site. Clear *and* empathetic; simple, accessible language with emphasis to make points. *To the point · Approachable · Upfront.* Touchpoints: website · standard emails · social posts & campaigns.
- **Bedside** — one-to-one, where empathy is needed. Speaks to emotions, anxieties and fears (fees, visas, arriving alone) and offers reassurance and calm. *Evocative · Approachable · Confident.* Touchpoints: website headings · social · one-on-one candidate conversations.

Remove: the "nearer, not louder" line, and the principle section at the end.

**Non-negotiables** (heading copy): "Non-negotiable, to ensure maximum clarity. Check every piece of copy for these — every piece must sound like NewMed Skills."
- **Acronyms** — spell out every acronym on first use, then abbreviate. A nurse abroad may not know what it stands for.
- **Sentence case** — sentence case for headings and buttons. All caps only for small labels. Numerals when a number is meaningful.

**The check (5):** 1. Is every claim backed? · 2. Does every sentence capture one idea? · 3. Are there any vague words? · 4. Any banned words hiding in there? · 5. Does it sound confident?

## 10. Iconography — NEW section, place after the Arrow section
Brief, a few examples. Rules: **single colour · thick strokes · no sharp corners · simplified and clean, no clutter.**

---

## 10b. Arrow colour tokens (`data-arw`) — aligned to the palette names (Aug 4)

`arrow.js` used to map `cream` to `#efe9e0`, which the rename turned into **Off white** — inverted against the brand names and disagreeing with `typegen.js`. Now aligned:

`orange` `#ff5122` · `yellow` `#ff9d00` · `maroon` `#7c3134` · `ink` `#391e1a` · **`cream` `#f4f1ea`** · **`offwhite` `#efe9e0`** · `teal` `#93cccd`.

Old names (`coral`, `amber`, `white`, `bone`) are kept as aliases so nothing stops painting. Use the palette names.

## 10c. Data-visualisation colour sequence (Aug 4)

Charts need more distinguishable hues than a brand palette provides. The generator cycles in this fixed order:

Fixed order. The first four are brand colours; the last four are the data-viz extension:

| # | Name | Hex | Note |
|---|---|---|---|
| 1 | Orange | `#FF5122` | same as brand |
| 2 | Yellow | `#FF9D00` | brand value |
| 3 | Maroon | `#7C3134` | same as brand |
| 4 | Teal | `#93CCCD` | brand value |
| 5 | Green | `#8CCE84` | data-viz only |
| 6 | Blue | `#6F78C9` | data-viz only |
| 7 | Purple | `#BD7FCC` | data-viz only |
| 8 | Pink | `#D6699D` | data-viz only |

Tokens: `orange` `yellow` `maroon` `teal` `green` `blue` `purple` `pink`. The first four are the brand values; only the last four are the data-viz extension.

> The last four are **data visualisation only**. They are NOT brand colours and must never appear on brand surfaces — no headlines, arrows, backgrounds or logos. Section 1 still governs everything else.

Cream and Deep Brown are deliberately **excluded** from the sequence: one disappears into the page, the other reads as black rather than as a category.

Eight categories is the hard limit in multi-colour mode. Past that the generator drops the extra rows **and says so** — group the smallest categories, or switch to single-colour.

## 11. The journey graphic — two variants, do not mix them up (Aug 4)

`six-stages.svg` exists twice because the arrow shapes must contrast with whatever sits behind them:

| File | Arrow fill | Use on |
|---|---|---|
| `six-stages.svg` | `#efe9e0` Off white | the **page background** (Cream) — Arrow page |
| `six-stages-onband.svg` | `#f4f1ea` Cream | a **sunken Off white band** — v3 Brand page |

Put either on the wrong ground and the arrows become invisible, because the fill matches the background exactly. `index.html` uses the original only — **never "fix" the original to suit a band.**
