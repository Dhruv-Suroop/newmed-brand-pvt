import React from "react";

/** Big-number stat. Numeral does the work; label below in secondary ink. */
export function Stat({ value, label, sublabel, accent = false, align = "left", style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: align, fontFamily: "var(--font-sans)", alignItems: align === "center" ? "center" : "flex-start", ...style }}>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 46, lineHeight: 1,
        letterSpacing: "-0.02em",
        color: accent ? "var(--brand-primary)" : "var(--text-primary)",
      }}>{value}</span>
      <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{label}</span>
      {sublabel && <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.4, maxWidth: 240 }}>{sublabel}</span>}
    </div>
  );
}
