**Button** — the primary action control; use coral `primary` for the one main action per view, quieter variants for the rest.

```jsx
<Button variant="primary" size="md">Book a call</Button>
<Button variant="outline" iconRight={<span>→</span>}>See how it works</Button>
```

Variants: `primary` (coral, glow), `secondary` (ink fill), `outline`, `ghost`. Sizes: `sm` / `md` / `lg`. Pill-shaped. Hover darkens; press scales to 0.98 — never bounces. Button copy is sentence case, under a few words.
