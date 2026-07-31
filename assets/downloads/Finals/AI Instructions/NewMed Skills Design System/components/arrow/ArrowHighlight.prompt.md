**ArrowHighlight** — the signature headline treatment: key words sit inside a gradient arrow ("Building **Workforce-Ready** Healthcare Talent.").

```jsx
<h1>Building <ArrowHighlight icon={<GlobeGlyph/>}>Workforce-Ready</ArrowHighlight> Healthcare Talent.</h1>
```

**Rules:** highlight **at least 2 words** — never a single word. One highlight per headline. Pick the phrase that carries the movement or the promise; making the highlight the headline's last line also kills orphans ("We're building / **the answer.**"). `fill="sunset"` (default) or `coral`. The optional trailing `icon` chip sits flush (zero gap) and its glyph fills ~60% of the chip optically — use a Lucide-style stroke glyph at 2px weight.
