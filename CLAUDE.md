# Claude Handoff & Session Log — NewMed Skills Brand Guidelines

This document tracks changes made by Antigravity (AI assistant) while taking over from Claude Code. It allows seamless continuation when returning to Claude.

---

## 1. Project Summary & Architecture
- **Tech Stack:** Plain HTML5, Vanilla CSS (`styles.css`), Vanilla JS (`app.js`, `arrow.js`, `gradient.js`, `typegen.js`). No external dependencies or build step required to run locally.
- **Local Server:** Run `python3 -m http.server 8000` from the project root.
- **Design System ("Clinical Calm"):**
  - **Colors:** Coral (`#FF5122`), Cream (`#F4F1EA`), Linen (`#EFE9E0`), Deep Brown Ink (`#391E1A`), Amber (`#FF9D00`), Maroon (`#7C3134`), Teal (`#93CCCD`).
  - **Font:** Mona Sans (self-hosted variable woff2 in `assets/fonts/`).
  - **Core Motif:** Locked-geometry arrow system (`arrow.js`), organic soft gradient orbs (`gradient.js`), soft rounded corners.
- **Static Page Generator:** `python3 build_pages.py` inlines CSS/JS/fonts into self-contained HTML files inside `pages/` for design tools (e.g. Figma `html.to.design`).

---

## 2. Work Log & Changes Introduced

### Session: Initial Takeover & Setup
- **Action:** Codebase inspection & initialization of `CLAUDE.md`.
- **Status:** Complete. Working directory validated.

### Session: Bug Fixes (Arrow Outline, Chip Size, Journey SVG)
- **Arrow Outline Spiking:** Fixed in `arrow.js` (line 93). Added `path.setAttribute('stroke-linejoin', 'round')` when `outline` is true to prevent miter spikes on the arrow tips and corners.
- **Arrow Chip Number Spilling:** Fixed in `styles.css`. Removed the stray `.arw-chip > svg:not(.arw-bg){width:22px;height:22px;}` rule (around line 396) which was incorrectly shrinking the background arrow.
- **Journey SVG:** Replaced the content of `assets/graphics/six-stages.svg` with the updated 6-stages outlined SVG code provided by the user.

- **Pending / Next Tasks:** Awaiting user instructions for further updates.

---

### Session: Typography, Styling & Email Signature (Aug 1)
- **Reorganized Typography Flow:** Updated the navigation and flow in `index.html`. Removed the duplicate "Highlighting text" section, restored the missing "Setting rules" section and applied copy edits.
- **Styles Hierarchy:** Replaced the "Type scale" block with a custom flexbox "Styles" layout showing point sizes mapped to font weights (SemiBold, Medium, Regular).
- **UI & Layout:** Enlarged `.arw-chip` sizes (`96px` x `76px`) in `styles.css` and added `.panel-2` flexbox rules for consistent container heights.
- **Copy Updates:** Globally renamed "Dark/Deep Brown" to "Deep Brown" across `index.html` and `styles.css`.
- **SVG Fixes:** Removed the text paths from `assets/graphics/type-hero.svg` to clean up the graphic.
- **Email Signature:** Updated `appsig.js` to set the logo width to `200px` (after testing `250px` and reverting) and bumped script cache version in `index.html`.
- **Git Push:** All changes were committed and pushed to the `main` branch.

---

### Session: Checklist cleanup — personality 2×2, rename sweep, iconography, logo rework (Aug 3)
- **Task B — Personality → 2×2:** removed the "Credible" attr-card (folded its substance point into "Certain"), set `.attr-grid` to 2 columns, heading/lead "Five"→"Four", nav sub-item "Five attributes"→"Four attributes".
- **Task A — rename sweep, DONE & verified.** Code tokens: `data-arw`/`data-fill` `coral`→`orange`, `amber`→`yellow`; arrow.js + typegen.js maps re-keyed to orange/yellow (kept coral/amber as aliases for safety) and added `teal:#93cccd`; fixed the orange type-gen swatch that had no CSS (`.tg-sw-coral/amber`→`.tg-sw-orange/yellow`); bumped `arrow.js?v=2`, `typegen.js?v=4`. Copy: all visible Bone/Cream/Linen/Ink/Clay→Off white/Off white (deep)/Deep Brown/Maroon across logo, colour, a11y, gradient, highlight sections. Neutrals swatches renamed Cream→"Off white", Off white→"Off white (deep)". Audit: 0 coral/amber tokens, 0 old colour words in copy, 0 "chevron". Verified all 24 arrow fills resolve to brand hexes (no generic CSS colours).
- **§10 — Iconography:** new top-level section `#icons` between Arrow and Colour (nav in sidebar/topbar/home). Four rules (single colour · thick strokes · no sharp corners · simplified/clean) + two example rows using **Material Symbols Rounded** (added that font link; scoped via `.ms-rounded`). Added to `build_pages.py` SECTIONS → `pages/icons.html`.
- **Task E — Logo rework (doable parts):** logo story/ambition/momentum copy already in the lead + kinetic-logo orange placeholder already present (from Antigravity). This pass: removed per-tile download pills from the 4 on-colour showcase tiles in `#l-primary` and added **two download rectangles** (Orange-and-brown + Off white, one Download SVG button each) per Dhruv's note; resolved the default-lockup contradiction (Horizontal caption "The default lockup"→"Wide, horizontal layouts" — stack stays primary); evened the lockup grid by capping `.vtile img` max-height so the vertical lockup no longer stretches its tile (all 6 tiles now 286px). **Still pending (needs Dhruv's assets):** the real kinetic logo, and the rounded-rectangle graphic.
- **Portrait use-case tile fixed:** it was 661px tall vs 200px siblings (`#ar-uses`). Added `.tpanel-portrait` (scoped `flex:none!important` + fixed height overriding the `.panel-2 > div > .tpanel{flex:1}` rule) so the grey rectangle matches its neighbours and the cutout scales to fit. Bumped `styles.css?v=34` (all this session's CSS changes were behind the stale v=32).
- **Broken `#downloads` links fixed:** 4 links pointed at `#downloads`, a section that no longer exists (merged into Applications) — clicking dumped the user to the home page. Repointed: home "Logo download"→`#logo`, "Type download"→`#type`, logo Resources "Downloads"→`#l-lockups`, arrow "Partner with us" CTA→`#applications`. Removed `downloads` from `build_pages.py` SECTIONS (it was emitting an empty `downloads.html`) and deleted that page.
- Re-ran `build_pages.py`. All local, not yet committed/pushed.

### Session: Voice & Tone removed (Aug 3)
- **Voice & tone section removed entirely** at Dhruv's request. The section was briefly built into `index.html` (`#voice`) then pulled: removed the section, all nav entries (sidebar, top bar, home index), the `.tone-grid/.tone-card/.vcheck` CSS, `pages/voice.html`, and `"voice"` from `build_pages.py` SECTIONS. Meta description no longer lists voice. Site now runs Brand → Logo → Arrow → Colour → Type → Applications.
- **Kept — a real bugfix:** the earlier colour rename left `index.html` pointing at `radial-orange.svg`/`radial-yellow.svg` while the files on disk were still `radial-coral.svg`/`radial-amber.svg` (broke the Colour page images live AND `build_pages.py`). Renamed via `git mv` to finish that sweep.

---

## 3. Instructions for Claude / Handover Notes
- Work is being conducted locally in `/Users/dhruv/Dhruv/Work/era/framer bg/newmed-brand-manual`.
- All changes are tested locally before committing.
- When re-running `build_pages.py`, verify that `pages/` output updates cleanly if `index.html` or `styles.css` were modified.
- **Note on Caching:** The site uses vanilla JS files referenced in `index.html`. If you modify `appsig.js`, `typegen.js`, etc., remember to bump the `?v=` parameter in the script tag to bust the local browser cache during development.
- **Design System Reminders:** The primary color is solid Orange. Alternate fills are Amber or Deep Brown. The "Locked geometry" for arrows is 10% corner radius, 42.6% point run.
- Keep the `styles.css` clean and lean. We use flexbox and grid heavily for layout.
