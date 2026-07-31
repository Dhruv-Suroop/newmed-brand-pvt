import React from "react";

/** Text input with label, optional hint/error, calm coral focus ring. */
export function Input({
  label, hint, error, id, type = "text", value, defaultValue, placeholder,
  disabled = false, iconLeft = null, style = {}, ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const borderColor = error
    ? "var(--status-error)"
    : focus ? "var(--brand-primary)" : "var(--border-default)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--color-bg-raised)",
        border: `1.5px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        padding: "0 14px", minHeight: 46,
        boxShadow: focus && !error ? "0 0 0 4px rgba(255,81,34,0.12)" : "none",
        transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        opacity: disabled ? 0.55 : 1,
      }}>
        {iconLeft && <span style={{ display: "flex", color: "var(--text-muted)" }}>{iconLeft}</span>}
        <input
          id={inputId} type={type} value={value} defaultValue={defaultValue}
          placeholder={placeholder} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontFamily: "inherit", fontSize: 15, color: "var(--text-primary)",
            padding: "12px 0", minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 13, color: error ? "var(--status-error)" : "var(--text-secondary)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
