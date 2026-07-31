import React from "react";
import { Arrow, ArrowIcon } from "./Arrow.jsx";

/**
 * Inline arrow text highlight — the "Workforce-Ready" treatment.
 * Wrap the key word(s) of a headline; inherits the heading's font size/weight.
 */
export function ArrowHighlight({ children, fill = "sunset", color = "#fff", icon = null, style = {}, contentStyle = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 0, verticalAlign: "baseline", transform: "translateY(0.08em)", ...style }}>
      <Arrow fill={fill} contentStyle={{ paddingTop: "0.08em", paddingRight: "0.62em", paddingBottom: "0.14em", paddingLeft: "0.34em", ...contentStyle }}>
        <span style={{ color, whiteSpace: "nowrap" }}>{children}</span>
      </Arrow>
      {icon && <ArrowIcon size="1.16em" fill={fill === "sunset" ? "coral" : fill} style={{ marginLeft: "-2px" }} contentStyle={{ fontSize: "0.72em" }}>{icon}</ArrowIcon>}
    </span>
  );
}
