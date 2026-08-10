import React from "react";

/** Removable / selectable tag chip. Outline by default, orange when active. */
export function Tag({ children, active = false, onRemove, style = {}, ...rest }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: 500, lineHeight: 1,
      padding: "7px 12px", borderRadius: "var(--radius-pill)",
      background: active ? "var(--brand-primary)" : "var(--color-bg-raised)",
      color: active ? "#fff" : "var(--text-primary)",
      border: `1px solid ${active ? "var(--brand-primary)" : "var(--border-default)"}`,
      ...style,
    }} {...rest}>
      {children}
      {onRemove && (
        <button type="button" aria-label="Remove" onClick={onRemove}
          style={{ border: "none", background: "none", cursor: "pointer", color: "inherit", opacity: 0.7, fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
      )}
    </span>
  );
}
