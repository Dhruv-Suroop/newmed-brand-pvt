import React from "react";

/** Switch toggle — orange track when on. Gentle slide, no bounce. */
export function Switch({ label, checked, defaultChecked, disabled = false, style = {}, onChange, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => { if (disabled) return; const v = !on; if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-primary)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1, ...style }}>
      <button type="button" role="switch" aria-checked={on} onClick={toggle} disabled={disabled}
        style={{
          width: 44, height: 26, borderRadius: 999, border: "none", padding: 3, flexShrink: 0,
          background: on ? "var(--brand-primary)" : "var(--border-strong)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background var(--dur-base) var(--ease-out)",
          display: "inline-flex", alignItems: "center",
        }} {...rest}>
        <span style={{
          width: 20, height: 20, borderRadius: "50%", background: "#fff",
          boxShadow: "0 1px 3px rgba(57,30,26,0.3)",
          transform: on ? "translateX(18px)" : "translateX(0)",
          transition: "transform var(--dur-base) var(--ease-out)",
        }} />
      </button>
      {label}
    </label>
  );
}
