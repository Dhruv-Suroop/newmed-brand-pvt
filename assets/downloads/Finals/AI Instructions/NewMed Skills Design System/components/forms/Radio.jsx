import React from "react";

/** Radio group — one choice per row, coral dot when selected. */
export function Radio({ name, options = [], value, defaultValue, disabled = false, style = {}, onChange }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (options[0] && (typeof options[0] === "string" ? options[0] : options[0].value)));
  const sel = isControlled ? value : internal;
  const pick = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-sans)", ...style }}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        const on = sel === val;
        return (
          <label key={val} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--text-primary)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.55 : 1 }}>
            <input type="radio" name={name} checked={on} disabled={disabled} onChange={() => pick(val)} style={{ position: "absolute", opacity: 0, width: 1, height: 1 }} />
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
              border: `1.5px solid ${on ? "var(--brand-primary)" : "var(--border-strong)"}`,
              transition: "border-color var(--dur-fast) var(--ease-out)",
            }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--brand-primary)", transform: on ? "scale(1)" : "scale(0)", transition: "transform var(--dur-fast) var(--ease-out)" }} />
            </span>
            {lbl}
          </label>
        );
      })}
    </div>
  );
}
