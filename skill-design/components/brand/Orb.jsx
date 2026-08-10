import React from "react";

/**
 * Organic gradient glow — the brand's ambient background warmth.
 * Never a hard-edged circle: layered off-center radial washes fading to
 * transparent, heavily blurred, flowing like the master gradient art.
 * Position absolutely inside a relative, overflow-hidden container.
 */
export function Orb({ tone = "orange", size = 420, intensity = 1, blur = 0, style = {} }) {
  const layers = {
    orange: `radial-gradient(58% 52% at 38% 42%, rgba(255,81,34,0.5) 0%, rgba(255,81,34,0) 70%),
      radial-gradient(52% 58% at 66% 68%, rgba(255,157,0,0.42) 0%, rgba(255,157,0,0) 72%),
      radial-gradient(46% 40% at 52% 28%, rgba(252,149,118,0.35) 0%, rgba(252,149,118,0) 70%)`,
    yellow: `radial-gradient(58% 52% at 42% 46%, rgba(255,157,0,0.45) 0%, rgba(255,157,0,0) 70%),
      radial-gradient(50% 56% at 66% 62%, rgba(255,120,34,0.3) 0%, rgba(255,120,34,0) 72%),
      radial-gradient(44% 40% at 50% 30%, rgba(249,219,170,0.5) 0%, rgba(249,219,170,0) 68%)`,
    mix: `radial-gradient(56% 50% at 34% 44%, rgba(255,81,34,0.42) 0%, rgba(255,81,34,0) 70%),
      radial-gradient(52% 56% at 70% 60%, rgba(255,157,0,0.4) 0%, rgba(255,157,0,0) 72%),
      radial-gradient(60% 46% at 52% 78%, rgba(124,49,52,0.18) 0%, rgba(124,49,52,0) 70%)`,
  };
  return (
    <span aria-hidden style={{
      display: "block", width: size, height: size, pointerEvents: "none",
      background: layers[tone] || layers.orange,
      filter: `blur(${blur || Math.max(24, size * 0.08)}px)`,
      opacity: intensity,
      ...style,
    }} />
  );
}
