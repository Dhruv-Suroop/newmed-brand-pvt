import { CSSProperties } from "react";

/**
 * Organic gradient glow for hero/section backdrops — soft, flowing, blurred.
 * NEVER renders (or should be made into) a hard-edged circle; gradients in this
 * brand are always organic and smooth.
 */
export interface OrbProps {
  tone?: "coral" | "amber" | "mix";
  /** Bounding size in px. @default 420 */
  size?: number;
  /** 0–1 wash strength. @default 1 */
  intensity?: number;
  /** Override blur in px (default scales with size). */
  blur?: number;
  style?: CSSProperties;
}
export function Orb(props: OrbProps): JSX.Element;
