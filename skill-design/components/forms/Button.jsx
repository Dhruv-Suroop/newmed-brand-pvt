import React from "react";

const sizes = {
  sm: { fontSize: 14, padding: "8px 16px", height: 36 },
  md: { fontSize: 15, padding: "11px 22px", height: 44 },
  lg: { fontSize: 17, padding: "15px 30px", height: 54 },
};

/**
 * NewMed Skills primary action. Orange fill for the one true action per view.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1,
    padding: s.padding,
    minHeight: s.height,
    width: fullWidth ? "100%" : "auto",
    border: "1px solid transparent",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    letterSpacing: "0.005em",
    transition:
      "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
  };
  const variants = {
    primary: {
      background: "var(--brand-primary)",
      color: "var(--text-on-brand)",
      boxShadow: "var(--shadow-orange)",
    },
    secondary: {
      background: "var(--color-bg-inverse)",
      color: "var(--text-inverse)",
    },
    outline: {
      background: "transparent",
      color: "var(--text-primary)",
      borderColor: "var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-primary)",
    },
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverStyle =
    hover && !disabled
      ? {
          primary: { background: "var(--brand-primary-hover)" },
          secondary: { background: "#26140f" },
          outline: { background: "rgba(57,30,26,0.04)", borderColor: "var(--text-primary)" },
          ghost: { background: "rgba(57,30,26,0.05)" },
        }[variant]
      : {};
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        ...base,
        ...variants[variant],
        ...hoverStyle,
        transform: press && !disabled ? "scale(0.98)" : "scale(1)",
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
