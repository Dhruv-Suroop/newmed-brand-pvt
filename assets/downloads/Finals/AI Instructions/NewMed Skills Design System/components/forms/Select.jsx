import React from "react";

/** Native select styled to match Input — labelled, coral focus. */
export function Select({ label, hint, id, value, defaultValue, options = [], disabled = false, style = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {label && <label htmlFor={selectId} style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        <select
          id={selectId} value={value} defaultValue={defaultValue} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: "none", width: "100%", fontFamily: "inherit", fontSize: 15,
            color: "var(--text-primary)", background: "var(--color-bg-raised)",
            border: `1.5px solid ${focus ? "var(--brand-primary)" : "var(--border-default)"}`,
            borderRadius: "var(--radius-md)", padding: "12px 40px 12px 14px", minHeight: 46,
            boxShadow: focus ? "0 0 0 4px rgba(255,81,34,0.12)" : "none",
            transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
            opacity: disabled ? 0.55 : 1, cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === "string" ? o : o.value;
            const lbl = typeof o === "string" ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-secondary)", fontSize: 12 }}>▾</span>
      </div>
      {hint && <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{hint}</span>}
    </div>
  );
}
