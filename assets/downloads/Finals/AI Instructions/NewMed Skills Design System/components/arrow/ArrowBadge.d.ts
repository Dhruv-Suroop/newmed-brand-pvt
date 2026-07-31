import { ReactNode, CSSProperties } from "react";

/** Outline-arrow eyebrow badge, optionally led by a solid arrow icon chip. */
export interface ArrowBadgeProps {
  children: ReactNode;
  /** Glyph for the leading solid chip (omit for text-only). */
  icon?: ReactNode;
  /** Height in px. @default 36 */
  size?: number;
  /** Stroke + text color. @default coral */
  color?: string;
  style?: CSSProperties;
}
export function ArrowBadge(props: ArrowBadgeProps): JSX.Element;
