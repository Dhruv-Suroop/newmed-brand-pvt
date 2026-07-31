import React from "react";

/** ALL-CAPS eyebrow label. The brand's small section kicker. */
export function Eyebrow({ children, color = "var(--brand-primary)", style = {} }) {
  return (
    <span style={{
      display: "inline-block", fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-eyebrow)", fontWeight: 700,
      letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
      color, ...style,
    }}>
      {children}
    </span>
  );
}
