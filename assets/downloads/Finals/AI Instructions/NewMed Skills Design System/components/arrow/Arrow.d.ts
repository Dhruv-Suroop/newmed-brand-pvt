import { ReactNode, CSSProperties } from "react";

/**
 * The brand arrow as a stretchable content container — THE signature shape.
 * Geometry (radius = 10% of height, point = 42.6% of height) is fixed from the
 * master art and never changes; only color does.
 * @startingPoint section="Brand" subtitle="The arrow container — solid, gradient, outline, notch" viewport="700x220"
 */
export interface ArrowProps {
  children: ReactNode;
  /** "coral" | "amber" | "cream" | "white" | "ink" | "maroon" | "sunset" (amber→coral gradient) | any CSS color. @default "coral" */
  fill?: string;
  /** Outline variant — no fill, brand stroke. @default false */
  outline?: boolean;
  /** Stroke color for outline. @default coral */
  stroke?: string;
  /** @default 2 */
  strokeWidth?: number;
  /** Chevron-notched left edge (for sequences — the previous arrow's point nests in). @default false */
  notch?: boolean;
  /** Shape opacity (translucent process-diagram arrows). @default 1 */
  opacity?: number;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}
export function Arrow(props: ArrowProps): JSX.Element;

/** The squarer arrow chip (from the arrow-chip master) — holds an icon, number, or glyph. */
export interface ArrowIconProps {
  children?: ReactNode;
  /** Height — px number or any CSS length (e.g. "1.16em"). @default 44 */
  size?: number | string;
  fill?: string;
  outline?: boolean;
  stroke?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}
export function ArrowIcon(props: ArrowIconProps): JSX.Element;

/**
 * Cutout portrait clipped into the arrow — the BOTTOM HALF of the image clips to the
 * arrow shape; the top half (face, head, shoulders) is never clipped and juts freely above.
 */
export interface ArrowPortraitProps {
  /** Cutout PNG (transparent bg), e.g. assets/photos/nurse-newmed-hijab.png */
  src: string;
  /** Arrow width in px. @default 520 */
  width?: number;
  /** ARROW height in px (the jut adds headroom above). @default 400 */
  height?: number;
  /** Headroom above the arrow as a fraction of arrow height. @default 0.32 */
  jut?: number;
  fill?: string;
  /** Image frame scale relative to the box — >1 crops in for a bigger subject (top-anchored: cropping removes the legs, never the head). @default 1.15 */
  imgScale?: number;
  /** Horizontal shift of the image frame in px. @default 0 */
  imgShift?: number;
  alt?: string;
  style?: CSSProperties;
}
export function ArrowPortrait(props: ArrowPortraitProps): JSX.Element;
