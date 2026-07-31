import React from "react";

const sizes = { sm: 32, md: 44, lg: 64 };

/** Avatar — image or initials on a warm tint. Circle by default. */
export function Avatar({ src, name = "", size = "md", square = false, style = {} }) {
  const dim = sizes[size] || sizes.md;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: dim, height: dim, flexShrink: 0, overflow: "hidden",
      borderRadius: square ? "var(--radius-md)" : "50%",
      background: src ? "var(--nm-cream-2)" : "rgba(255,81,34,0.14)",
      color: "var(--brand-primary-press)", fontFamily: "var(--font-sans)",
      fontWeight: 600, fontSize: dim * 0.36, ...style,
    }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}
