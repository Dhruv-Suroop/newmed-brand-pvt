import React from "react";
import { Arrow, ArrowIcon } from "./Arrow.jsx";

/**
 * Numbered arrow list — solid arrow chips with numbers, cream arrow rows with text.
 * (The "Schedule / Launch / Request" next-steps pattern.)
 */
export function ArrowList({ items = [], size = 64, tone = "cream", textColor = "var(--brand-primary)", numbered = true, gap = 18, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {items.map((item, i) => {
        const text = typeof item === "string" ? item : item.text;
        const glyph = typeof item === "object" && item.icon ? item.icon : (numbered ? i + 1 : null);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {glyph !== null && (
              <ArrowIcon size={size} contentStyle={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size * 0.5 }}>{glyph}</ArrowIcon>
            )}
            <Arrow fill={tone} style={{ flex: 1 }} contentStyle={{ paddingTop: 0, paddingBottom: 0, minHeight: size, width: "100%" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.33, color: textColor, paddingLeft: size * 0.2 }}>{text}</span>
            </Arrow>
          </div>
        );
      })}
    </div>
  );
}
