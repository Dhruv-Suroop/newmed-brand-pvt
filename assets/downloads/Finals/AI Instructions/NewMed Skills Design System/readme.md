# NewMed Skills — Design System

NewMed Skills is a **healthcare workforce readiness and deployment platform**. It helps healthcare organisations across the GCC and international markets **source, develop, deploy, and retain** qualified healthcare professionals. NewMed Skills manages the entire workforce journey — a six-stage path: **Source → Assess → Develop → Certify → Deploy → Retain** — reducing the burden on hospitals by handling workforce preparation, compliance, licensing, deployment, and retention.

The audience is two-sided: **candidates** (nurses and allied-health professionals moving across borders, many reading English as a second language) and **hospitals / HR directors** (their teams and hiring managers). Real systems named throughout: DHA (Dubai Health Authority), SCFHS, Prometric, DataFlow.

The brand strategy is **clinical calm** — the voice of a senior clinician who states facts plainly, never oversells, and is calm because they are competent. The visual world matches: warm cream backgrounds, soft coral/amber gradient "orbs", a deep-brown ink, and a single confident coral primary.

## Sources provided
- **`brand guide/`** (mounted local folder) — logos (SVG/PNG/PDF in `Logos/`), `Colours.svg` (master palette), `NewMedSkills-Voice-Writing-Guide.docx` (full voice guide), `NewMedSkills_Template.pptx` (15-slide executive-briefing deck template), and product mockups (bottle, tote, uniform, iPhone).
- **`uploads/`** — the logo lockup SVGs (Badge, Short, Vertical, Stack, Horizontal in Black + Colour) and the Symbol.
- Typeface: **Mona Sans** (GitHub's open-source variable font, OFL) — confirmed from the PPTX theme (`Mona Sans`, `Mona Sans Medium`, `Mona Sans SemiBold`).

> ⚠️ **Font note:** No font binaries were provided. Mona Sans is the correct, freely-licensed typeface and is self-hosted here via the Fontsource CDN (`tokens/fonts.css`). If you have licensed/hinted `.woff2` files, drop them in and point `tokens/fonts.css` at them.

---

## CONTENT FUNDAMENTALS

The full rules live in the Voice & Writing Guide (docx). Essentials:

**The core instruction:** *Write as a senior clinician would speak — someone who has done this a thousand times, states facts plainly, never oversells, and is calm precisely because they are competent.* Healthcare staffing is a low-trust category; trust is demonstrated, not claimed. The strategic space NewMed Skills occupies is **clinical calm** — never raising its voice to be believed.

**Five voice attributes (always on, every sentence):**
1. **Certain** — settled, factual, unhurried. Back every claim with a number or mechanism; if a sentence can't carry one, cut it. Name real systems (DHA, SCFHS, Prometric, DataFlow), never "the relevant authorities."
2. **Plain** — short sentences, concrete verbs, one idea at a time. Write as if translating for a capable new colleague who doesn't know the acronyms. If a phrase could appear on any B2B site, it fails.
3. **Warm** — steady, human, on the reader's side. Warmth comes from naming the human stakes plainly (fees, visas, arriving alone), not from soft words or exclamation marks. Second person, human stakes, zero pity.
4. **Guiding** — directional, sequential. Use from→to constructions, numbered steps, action verbs (assess, train, license, deploy, support). Show the path, don't list features. (The verbal echo of the chevron mark.)
5. **Credible** — trusted, calm, unexaggerated, most of all when stakes are high. If something is uncertain, say so.

**Register (one voice, five levels of nearness — never louder, just nearer):**
- **L1 Clinical note** — compliance docs, licensing pages, detailed FAQ, terms.
- **L2 Briefing** — product explainers, how-it-works, service walkthroughs.
- **L3 Standard (default)** — homepage, core marketing, standard emails.
- **L4 Direct** — candidate landing pages, social, campaigns, testimonials.
- **L5 Bedside** — the single most important headline / hero line. Rare.

Example ladder (same calm person throughout):
- L3: "Hiring nurses shouldn't take six months and a stack of unscreened CVs. We send you candidates who are already screened, licensed, and ready to start."
- L5: "Your career shouldn't stop at a border. We're here to get you across it."

**Mechanical rules (non-negotiable):**
- Name is always **NewMed Skills** — two words, capital N/M/S. Never "NewMedSkills", never all-caps in body, "NMS" only after full name appears once.
- **Pronouns:** candidates are *you*; hospitals are *your team / your hospital*; NewMed Skills is always *we* (never "the company").
- **Sentences:** headlines under 8 words; body sentences under 20; one idea per sentence. Every benefit answers "how?" in the same breath ("Faster hiring — because screening is already done").
- **Mechanics:** sentence case for headings and buttons; ALL-CAPS only for small eyebrow labels; numerals when a number does work (a 1:3 ratio, four steps).
- **No emoji.** No exclamation-mark warmth.
- **Banned words:** transformation · orchestration · lifecycle · leverage · solutions · seamless · empower · ecosystem.
- **10-second check:** every claim carries a number or mechanism? · could it appear on any B2B site? · is warmth in the specifics? · shown the path or listed features? · any banned words?

---

## VISUAL FOUNDATIONS

**Design ethos — be bold, never lazy.** Reference the confidence of Pentagram, Studio Dumbar, and Collins: graphic elements at poster scale, one dominant move per composition, type and image interlocking (headline flows INTO the highlight arrow, portrait breaks OUT of its container). Don't decorate a plain layout with small accents — build the layout FROM the arrow/gradient/cutout system. If a composition would work without the brand elements, it isn't done.

**No orphans.** Never leave a single word on its own line in headlines or display text ("We're building / the answer." — the highlight phrase IS the last line, that's the pattern). Use `text-wrap: balance`, manual breaks, or make the orphan the highlighted arrow phrase.

**Overall vibe:** warm, soft, confident, unhurried. Sunrise/orb warmth on cream paper — optimistic but calm, never loud. A single saturated coral does all the shouting so nothing else has to.

**Color** — Coral `#FF5122` is the primary (the symbol, CTAs, key accents). Amber `#FF9D00` and orange `#FF7822` extend it warm. Deep brown ink `#391E1A` is the "black" — all primary text, never pure `#000`. Maroon `#7C3134` adds depth; teal `#93CCCD` is the one cool counterpoint (use sparingly). Backgrounds are cream `#F8F3EA` (page) and `#EFE9E0` (sunken); white for raised cards. **Max one or two background tones per surface.**

**The orb / gradient glow motif** — ambient background warmth. **Gradients are always organic, soft, and flowing — never hard-edged circles, never sharp lines.** Layered off-center radial washes fading to transparent, heavily blurred, bleeding off edges (see the master art in `assets/backgrounds/`). Component: `Orb` (tones coral/amber/mix). Gradient tokens: `--gradient-arrow` (amber→coral, for arrow fills), `--gradient-sunrise`.

**Type** — Mona Sans throughout. Display is **semibold (600) and tight** (`-0.02em`) — **big headlines stay light: 600, never 700+** (bold is only for small/medium headings and emphasis). Body is **regular (400)** at a calm 1.5 line-height. The wordmark pairs bold "NewMed" with regular "Skills". Eyebrow labels are ALL-CAPS, 12px, letter-spaced `0.14em`. No second typeface.

**The arrow — the identity's container system.** The single most important brand element. One shape (rounded start cap · stretchable body · pointed cap; master parts in `assets/arrow/`) with **locked geometry — corner radius = 10% of height, point = 42.6% of height. Color may change; the radius and point angle never do.** It is used as:
- **Text highlight** — the key words of a headline sit inside a gradient (amber→coral, `--gradient-arrow`) or coral arrow: "Building **Workforce-Ready** Healthcare Talent." White text. **Minimum 2 words — never highlight a single word.** One highlight per headline, often finished with a trailing arrow chip holding a glyph (chip sits flush — zero/negative gap). **Content strategy: highlight the phrase that carries the movement or the promise** ("across borders", "Workforce-ready talent", "awaits you") — never filler, never the negative half of a sentence.
- **CTA** — buttons on marketing surfaces are arrow-shaped ("Partner with us", "Book a workforce discussion").
- **Eyebrow badge** — outline arrow with coral text, optionally led by a solid arrow chip with an icon.
- **Icon / number chip** — the squarer arrow chip (`assets/icons/arrow-chip.svg`) holding a glyph or step number.
- **Icon chips** — when an arrow chip holds an icon, the glyph fills **~60% of the chip optically** — big and confident, never small and floating in the middle. (In `ArrowHighlight` this is built in; for a standalone `ArrowIcon`, size the glyph ≥ 0.7× the chip.)
- **Portrait container** — `ArrowPortrait`: the cutout clips to the arrow shape on the **bottom half only** — the top half (face, head, shoulders) is never clipped and juts freely above the arrow. Crop so the subject is front and centre (top-half crops are good — bigger picture beats full body).
- **List rows** — numbered chips + full-width cream arrow rows (next-steps pattern).
- **Journey cards** — white arrow cards in sequence (01 Source → 06 Retain), each chevron-notched so the previous point nests in.
- **Hero-scale container** — a giant arrow holds photography (subjects cut out, breaking the edge) or entire hero sections; also **translucent stacked gradient arrows as process diagrams** (each arrow a content layer, white circular icon chips at the seams — the "Technology at the Core" composition). Cutouts overlap and break out of the arrow's edges — never fully boxed inside.
- **Outline versions** are legitimate everywhere the solid is.

**Chevron / forward-motion motif** — the symbol is built from the same chevron shards; the logo mark renders as a forward-leaning "N". Verbally and visually the brand is about *movement from → to*. Numbered step sequences (01–06) everywhere.

**Spacing & layout** — generous, airy. 4px base scale. Content max ~1200px. Lots of breathing room around hero statements; the calm comes partly from whitespace.

**Corner radii** — soft and rounded everywhere. Cards `--radius-lg` (24px) or `--radius-md` (16px); buttons pill or `--radius-md`; the app mark is an iOS squircle (`--radius-icon`, 22.37%). Nothing sharp-cornered.

**Cards** — white on cream, soft rounded corners, low diffuse **warm** shadow (`--shadow-sm`/`--shadow-md`, tinted with ink not black), hairline border `--border-subtle` optional. No colored left-border-accent cards. No heavy elevation.

**Shadows** — low, warm, diffuse, tinted `rgba(57,30,26,·)`. Coral CTAs may carry a soft coral glow (`--shadow-coral`). Never hard black drop shadows.

**Borders** — hairline, low-opacity ink (`--border-subtle` → `--border-strong`). Dividers are thin and quiet.

**Motion** — gentle and unhurried. Fades and short eases (`--ease-out`, 120–360ms). **Nothing bounces**; nothing springs. Hover = slight darken / subtle lift; press = slight darken + tiny scale-down (0.98). Reflects clinical calm.

**Imagery** — **cutout photography of confident healthcare professionals** (transparent-background PNGs): nurses, radiographers, physicians matched to the content's field and the audience's ethnicity (South Asian, Southeast Asian, African, Arab, Western — the real candidate pool). Cutouts sit inside or break out of giant arrows and section edges. Warm color grade. Also organic gradient washes. No cold blue-grey stock, no heavy grain. Use `<image-slot>` placeholders (`marketing/image-slot.js`) for cutouts — never fake them.

**Transparency & blur** — used lightly: soft glass over gradients occasionally; not a defining feature. Prefer solid warm surfaces.

---

## ICONOGRAPHY

The brand ships **no functional UI icon set**. Its own iconography is the **brand marks**: the coral **symbol** (chevron shards, `assets/logos/symbol-colour.svg`) and the decorative forward-leaning **"N" chevron** ornament used as a large graphic accent in the deck. Emoji are **never** used. Unicode arrows/chevrons (→, ›) are acceptable inline for the from→to / directional motif.

For functional product/UI icons, this system uses **[Lucide](https://lucide.dev)** (thin, rounded-stroke, calm) as the closest match to the brand's soft, modern feel — **flagged as a substitution** since the brand provided none. Load from CDN (`https://unpkg.com/lucide@latest`) or `lucide-react`. Keep stroke width ~1.75, corners rounded, color `currentColor` in ink or coral. If the brand later defines an official icon set, swap Lucide out here.

**Assets in `assets/`:**
- `logos/` — full lockups (horizontal, stack, vertical, short, badge) in colour + black; the coral symbol; favicon; iOS app icon. **Colour lockups are the default; the black versions are used rarely — only when the brief requires it** (e.g. single-colour print).
- `arrow/` — the master arrow parts (`arrow-start.svg`, `arrow-end.svg` — the PowerPoint 9-slice pair) and the flat icon-arrow master (`arrow-icon.svg`).
- `icons/` — real brand marks extracted from the deck: `logo-caps-arrow.svg` (stacked ALL-CAPS wordmark + arrow), `arrow-chip.svg` (icon/number chip master), `n-arrow-badge.svg` (white N in arrow), `n-chevron-mark.svg` / `-alt` (the big decorative N ornament).
- `photos/` — official cutout photography (transparent PNGs): `nurse-newmed-hijab` (maroon NewMed scrubs — the hero candidate), `nurse-tablet-teal`, `nurse-paperwork-orange`, `doctor-iv-pole-1/-2`. Use these before asking for new ones; match field + ethnicity to content.
- `backgrounds/` — exported gradient orbs (`orb-soft.png`, `orb-corner.jpg`) for hero/section backdrops.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (imports only). Consumers link this.
- `tokens/` — `fonts.css` (Mona Sans @font-face), `colors.css`, `typography.css`, `spacing.css`.
- `thumbnail.html` — project tile.
- `SKILL.md` — Agent-Skills-compatible entry.
- `assets/` — `logos/`, `backgrounds/`.

**Foundations cards** (`guidelines/`) — swatch/type/spacing specimen cards for the Design System tab (groups: Colors, Type, Spacing, Brand).

**Components** (`components/`) — reusable React primitives, discovered from `window.NewMedSkillsDesignSystem_*`. Each has `.jsx`, `.d.ts`, `.prompt.md`; one `@dsCard` per group directory.
- **`arrow/`** — `Arrow`, `ArrowIcon`, `ArrowHighlight`, `ArrowButton`, `ArrowBadge`, `ArrowList` — the signature shape system (see VISUAL FOUNDATIONS).
- **`forms/`** — `Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`.
- **`data/`** — `Card`, `Stat`, `Badge`, `Tag`, `ProgressBar`, `Avatar`.
- **`brand/`** — `Logo`, `Symbol`, `Eyebrow`, `StepFlow`, `Orb`.

**Intentional additions** (brand-specific primitives, no direct source counterpart — the brand shipped assets, not a component library):
- `StepFlow` — the from→to journey (Source → … → Retain); the brand's signature motif, verbal and visual.
- `Orb` — the signature gradient-glow backdrop.
- `Eyebrow` — the ALL-CAPS kicker the deck and voice guide rely on.
- `Logo` / `Symbol` — the real mark, rendered inline for convenience (full files in `assets/logos/`).

**UI kits** (`ui_kits/`) — `marketing-site/` (candidate + hospital marketing pages) and `hospital-portal/` (the workforce dashboard product). Each: `index.html` + screen `.jsx` files.

**Marketing materials** (`marketing/`) — social posts (photo-on-arrow, gradient-arrow container) and web banner templates; `image-slot.js` for drop-in cutout photography.

**Slides** (`slides/`) — sample deck slides matching the executive-briefing PPTX template.

_This is a design system authored for the Omelette compiler: components are discovered by `<Name>.jsx` + sibling `<Name>.d.ts`; cards by the `@dsCard` comment on line 1 of an `.html`. Do not hand-edit `_ds_bundle.js` / `_ds_manifest.json`._
