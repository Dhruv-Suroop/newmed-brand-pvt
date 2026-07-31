import React from "react";
import { Arrow } from "./Arrow.jsx";

/**
 * Arrow-shaped CTA — the brand's primary button shape ("Partner with us",
 * "Book a workforce discussion"). Calm hover darken, tiny press scale.
 */
export function ArrowButton({ children, fill = "coral", color = "#fff", outline = false, size = "md", disabled = false, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const fs = { sm: 13.5, md: 15, lg: 17 }[size] || 15;
  const pv = { sm: 8, md: 12, lg: 16 }[size] || 12;
  return (
    <button
      type="button" disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        border: "none", background: "none", padding: 0, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1, display: "inline-flex",
        filter: hover && !disabled ? "brightness(0.94)" : "none",
        transform: press && !disabled ? "scale(0.98)" : "scale(1)",
        transition: "filter var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        ...style,
      }}
      {...rest}
    >
      <Arrow fill={fill} outline={outline} contentStyle={{ paddingTop: pv, paddingBottom: pv }}>
        <span style={{
          fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: fs, lineHeight: 1,
          color: outline ? "var(--brand-primary)" : color, whiteSpace: "nowrap",
        }}>{children}</span>
      </Arrow>
    </button>
  );
}
