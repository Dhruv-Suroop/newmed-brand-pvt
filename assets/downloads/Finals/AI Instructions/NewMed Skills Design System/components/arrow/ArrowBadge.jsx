import React from "react";
import { Arrow, ArrowIcon } from "./Arrow.jsx";

/**
 * Eyebrow badge — the outline arrow tag, optionally led by a solid arrow icon chip.
 * ("Healthcare Workforce Readiness")
 */
export function ArrowBadge({ children, icon = null, size = 36, color = "var(--brand-primary)", style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, ...style }}>
      {icon && <ArrowIcon size={size} fill="coral" contentStyle={{ fontSize: size * 0.42 }}>{icon}</ArrowIcon>}
      <Arrow outline stroke={color} strokeWidth={1.5} contentStyle={{ paddingTop: 0, paddingBottom: 0, minHeight: size }}>
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: size * 0.44, color, whiteSpace: "nowrap" }}>{children}</span>
      </Arrow>
    </span>
  );
}
