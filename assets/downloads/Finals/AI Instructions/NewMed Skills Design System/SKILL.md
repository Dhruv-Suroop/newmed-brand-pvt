---
name: newmed-skills-design
description: Use this skill to generate well-branded interfaces and assets for NewMed Skills, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** NewMed Skills — healthcare workforce readiness & deployment (GCC + international). Voice = "clinical calm."
- **Name:** always "NewMed Skills" (two words). Pronouns: candidates = *you*, hospitals = *your team*, us = *we*.
- **Type:** Mona Sans (variable, OFL) — bold tight display, regular calm body. Loaded in `tokens/fonts.css`.
- **Color:** coral `#FF5122` primary on cream `#F8F3EA`; ink `#391E1A` text; amber/maroon/teal accents. Signature soft gradient "orbs."
- **Motifs:** the arrow system (highlight ≥ 2 words; icon chips — glyph fills ~60% optically; portraits clip bottom-half only); organic soft gradients (never hard circles); soft rounded corners; low warm shadows; nothing bounces.
- **Craft rules:** no orphan words in headlines (make the highlight the last line); big headlines weight 600, never heavier; design boldly — build layouts FROM the arrow/gradient/cutout system, don't decorate plain layouts.
- **Global CSS:** link `styles.css`. Tokens under `tokens/`. Components on `window.NewMedSkillsDesignSystem_*` (load `_ds_bundle.js`).
- **Assets:** `assets/logos/` (lockups, symbol, favicon, app icon), `assets/backgrounds/` (gradient orbs).
- **Banned words:** transformation, orchestration, lifecycle, leverage, solutions, seamless, empower, ecosystem. No emoji.
