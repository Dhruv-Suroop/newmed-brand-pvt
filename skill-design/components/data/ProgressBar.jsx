import React from "react";

/** Thin progress bar. Orange fill on cream track. Optional step labels. */
export function ProgressBar({ value = 0, max = 100, label, showValue = false, style = {} }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-sans)", ...style }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "var(--text-secondary)" }}>
          {label && <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div style={{ height: 8, borderRadius: 999, background: "var(--nm-cream-2)", overflow: "hidden" }}>
        <div style={{
          width: pct + "%", height: "100%", borderRadius: 999,
          background: "var(--gradient-sunrise)",
          transition: "width var(--dur-slow) var(--ease-out)",
        }} />
      </div>
    </div>
  );
}
