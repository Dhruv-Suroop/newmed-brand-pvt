**Arrow / ArrowIcon** — the brand's signature container shape, built from the master PowerPoint parts (`assets/arrow/`). Radius and point proportions are locked; only color changes.

```jsx
<Arrow fill="sunset"><span style={{color:"#fff",fontWeight:700}}>Workforce-Ready</span></Arrow>
<Arrow outline><span style={{color:"var(--brand-primary)"}}>Healthcare Workforce Readiness</span></Arrow>
<Arrow fill="cream" notch>…</Arrow>   {/* notched left edge for sequences */}
<ArrowIcon size={48}>1</ArrowIcon>    {/* number/icon chip */}
```

Fills: `orange`, `yellow`, `cream`, `white`, `ink`, `maroon`, `sunset` (yellow→orange), or any CSS color. `opacity` for the translucent process-diagram treatment. Higher-level uses: `ArrowHighlight` (text highlight), `ArrowButton` (CTA), `ArrowBadge` (eyebrow), `ArrowList` (numbered rows), `StepFlow` (journey).
