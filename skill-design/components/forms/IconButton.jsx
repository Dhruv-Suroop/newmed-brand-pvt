import React from "react";

const sizes = { sm: 36, md: 44, lg: 54 };

/** Square icon-only button. Same calm interaction model as Button. */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  style = {},
  ...rest
}) {
  const dim = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const variants = {
    solid: { background: "var(--brand-primary)", color: "var(--text-on-brand)" },
    ghost: { background: "transparent", color: "var(--text-primary)" },
    outline: { background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-default)" },
  };
  const hoverBg = {
    solid: "var(--brand-primary-hover)",
    ghost: "rgba(57,30,26,0.06)",
    outline: "rgba(57,30,26,0.04)",
  }[variant];
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: dim, height: dim, padding: 0,
        borderRadius: "var(--radius-md)", border: "1px solid transparent",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        transition: "background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)",
        ...variants[variant],
        ...(hover && !disabled ? { background: hoverBg } : {}),
        transform: press && !disabled ? "scale(0.94)" : "scale(1)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
