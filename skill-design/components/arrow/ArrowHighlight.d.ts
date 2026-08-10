import { ReactNode, CSSProperties } from "react";

/** Inline arrow highlight for the key words of a headline — white text on a gradient/orange arrow.
 * RULES: highlight a phrase of AT LEAST 2 words (never a single word); optionally finish with a
 * trailing arrow chip holding an icon (the "Workforce-Ready ›◉" pattern). One highlight per headline. */
export interface ArrowHighlightProps {
  children: ReactNode;
  /** @default "sunset" (yellow→orange) */
  fill?: string;
  /** Text color. @default "#fff" */
  color?: string;
  /** Optional trailing arrow chip with a glyph (e.g. the globe). */
  icon?: ReactNode;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}
export function ArrowHighlight(props: ArrowHighlightProps): JSX.Element;
