import React from "react";

/** Surface container. White on cream, soft rounded corners, warm low shadow. */
export function Card({ children, padding = 24, interactive = false, elevated = false, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--color-bg-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: elevated ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        ...(interactive && hover ? { transform: "translateY(-3px)", boxShadow: "var(--shadow-lg)" } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
