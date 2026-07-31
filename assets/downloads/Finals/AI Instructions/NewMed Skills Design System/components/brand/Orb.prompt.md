**Orb** — organic gradient glow used as ambient background warmth, bleeding off edges. **Rule: gradients are always organic and smooth — never hard-edged circles, never sharp lines.**

```jsx
<div style={{position:"relative", overflow:"hidden"}}>
  <Orb tone="mix" size={720} style={{position:"absolute", right:-200, bottom:-260}} />
  {/* content above */}
</div>
```

Tones: `coral`, `amber`, `mix`. Tune `intensity` down (0.5–0.8) behind text.
