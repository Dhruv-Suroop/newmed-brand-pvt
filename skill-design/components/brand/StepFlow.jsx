import React from "react";
import { Arrow } from "../arrow/Arrow.jsx";

const DEFAULT_STEPS = ["Source", "Assess", "Develop", "Certify", "Deploy", "Retain"];

/**
 * The signature journey: arrow-shaped cards in sequence
 * (default: 01 Source → 06 Retain), as used on the deck's "Who we are" slide.
 * Cards after the first are chevron-notched so each point nests into the next.
 */
export function StepFlow({ steps = DEFAULT_STEPS, active = -1, tone = "white", style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {steps.map((label, i) => {
        const isActive = i === active;
        return (
          <Arrow
            key={label}
            fill={isActive ? "orange" : tone}
            notch={i > 0}
            style={{ flex: 1, minWidth: 0, filter: "drop-shadow(0 2px 6px rgba(57,30,26,0.06))" }}
            contentStyle={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4, paddingTop: 14, paddingBottom: 14, paddingLeft: i > 0 ? 26 : 18, paddingRight: 22, width: "100%" }}
          >
            <span style={{
              fontSize: 12, fontWeight: 600, letterSpacing: "0.03em",
              color: isActive ? "rgba(255,255,255,0.85)" : "var(--brand-primary)",
            }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{
              fontSize: "clamp(13px, 1.35vw, 17px)", fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%", minWidth: 0,
              color: isActive ? "#fff" : "var(--text-primary)",
            }}>{label}</span>
          </Arrow>
        );
      })}
    </div>
  );
}
