# NewMed Skills — Brand Guidelines (website)

A self-contained brand standards manual. No build step, no dependencies, no server code — just static files. Everything it needs (fonts, logos, mockups) lives inside the `assets/` folder.

```
newmed-brand-manual/
├── index.html        ← the site
├── styles.css
├── app.js
├── favicon.png
├── README.md
└── assets/
    ├── fonts/        Mona Sans (self-hosted woff2, 5 weights)
    ├── logos/        svg / png / pdf  +  colours.svg
    └── mockups/      application photos (web-optimised)
```

---

## How to put it online for free (no domain purchase, no cost)

Pick **one**. All three are $0 forever.

### Option A — Netlify Drop  (easiest, ~2 min)
1. Go to **https://app.netlify.com/drop**
2. Drag the whole **`newmed-brand-manual`** folder onto the page.
3. You get a live link like `https://calm-chevron-1234.netlify.app` immediately.
4. Make a free account (optional) to keep it permanently and rename the URL.

### Option B — GitHub Pages  (you own it, permanent)
1. Create a free account at **https://github.com**.
2. Make a new **public** repository, e.g. `newmed-brand`.
3. Upload every file in this folder (keep the structure — the `assets/` folder must come too).
4. Repo → **Settings → Pages → Source: `main` branch → `/root` → Save**.
5. In ~1 minute it's live at `https://<your-username>.github.io/newmed-brand/`.

### Option C — Cloudflare Pages  (similar to Netlify)
1. **https://pages.cloudflare.com** → sign up free → *Upload assets*.
2. Drag the folder in → get a `*.pages.dev` link.

> To add a custom domain later (e.g. `brand.newmedskills.com`) all three support it free —
> the only thing that ever costs money is buying the domain name itself.

---

## Preview it locally

Because the site uses web fonts, opening `index.html` by double-clicking can occasionally
block the font in Chrome. The reliable way is a tiny local server:

```bash
cd newmed-brand-manual
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Editing content

- All copy lives in **`index.html`** — search for the section you want (`id="brand"`, `id="colour"`, …).
- Colours are defined once at the top of **`styles.css`** under `:root { --orange: … }`.
- Add a new section: copy any `<section class="section" id="…">` block and add a matching
  link in the sidebar `<nav>`. It wires itself into the navigation automatically.
- After editing `styles.css` or `app.js`, bump the `?v=1` in `index.html` to `?v=2` so
  browsers load the new version.

---

*Version 1.0 · 2026 · Confidential — for internal and partner use.*
Mona Sans is © GitHub, licensed under the SIL Open Font License.
