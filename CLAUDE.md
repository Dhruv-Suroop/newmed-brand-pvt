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

## 3. Instructions for Claude / Handover Notes
- Work is being conducted locally in `/Users/dhruv/Dhruv/Work/era/framer bg/newmed-brand-manual`.
- All changes are tested locally before committing.
- When re-running `build_pages.py`, verify that `pages/` output updates cleanly if `index.html` or `styles.css` were modified.
- **Note on Caching:** The site uses vanilla JS files referenced in `index.html`. If you modify `appsig.js`, `typegen.js`, etc., remember to bump the `?v=` parameter in the script tag to bust the local browser cache during development.
- **Design System Reminders:** The primary color is solid Orange. Alternate fills are Amber or Deep Brown. The "Locked geometry" for arrows is 10% corner radius, 42.6% point run.
- Keep the `styles.css` clean and lean. We use flexbox and grid heavily for layout.
