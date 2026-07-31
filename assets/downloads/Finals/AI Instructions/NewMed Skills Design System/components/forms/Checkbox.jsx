import React from "react";

/** Checkbox with coral fill when checked. Controlled or uncontrolled. */
export function Checkbox({ label, checked, defaultChecked, disabled = false, id, style = {}, onChange, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const boxId = id || (label ? "cb-" + label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const toggle = (e) => { if (!isControlled) setInternal(e.target.checked); onChange && onChange(e); };
  return (
    <label htmlFor={boxId} style={{
      display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-sans)",
      fontSize: 15, color: "var(--text-primary)", cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1, ...style,
    }}>
      <input id={boxId} type="checkbox" checked={on} disabled={disabled} onChange={toggle}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} {...rest} />
      <span style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
        background: on ? "var(--brand-primary)" : "var(--color-bg-raised)",
        border: `1.5px solid ${on ? "var(--brand-primary)" : "var(--border-strong)"}`,
        color: "#fff", fontSize: 12, fontWeight: 700,
        transition: "background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
      }}>{on ? "✓" : ""}</span>
      {label}
    </label>
  );
}
