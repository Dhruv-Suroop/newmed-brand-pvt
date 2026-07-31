import React from "react";

const tones = {
  neutral: { bg: "var(--nm-cream-2)", fg: "var(--text-primary)" },
  coral: { bg: "rgba(255,81,34,0.12)", fg: "var(--brand-primary-press)" },
  amber: { bg: "rgba(255,157,0,0.16)", fg: "#9a5b00" },
  teal: { bg: "rgba(147,204,205,0.28)", fg: "#3a6a6b" },
  success: { bg: "rgba(75,143,110,0.16)", fg: "var(--status-success)" },
  solid: { bg: "var(--brand-primary)", fg: "#fff" },
  ink: { bg: "var(--nm-ink)", fg: "var(--nm-cream)" },
};

/** Small status/label badge. Dot optional. */
export function Badge({ children, tone = "neutral", dot = false, style = {} }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 600,
      lineHeight: 1, padding: "5px 10px", borderRadius: "var(--radius-pill)",
      background: t.bg, color: t.fg, letterSpacing: "0.01em", whiteSpace: "nowrap",
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}
      {children}
    </span>
  );
}
