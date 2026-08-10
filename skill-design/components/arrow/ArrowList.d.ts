import { ReactNode, CSSProperties } from "react";

/** Numbered (or icon-led) arrow list — arrow chips + full-width cream arrow rows. */
export interface ArrowListProps {
  /** Strings, or { text, icon? } objects. */
  items: (string | { text: string; icon?: ReactNode })[];
  /** Row height in px. @default 64 */
  size?: number;
  /** Row fill. @default "cream" */
  tone?: string;
  /** Row text color. @default orange */
  textColor?: string;
  /** Auto-number the chips. @default true */
  numbered?: boolean;
  gap?: number;
  style?: CSSProperties;
}
export function ArrowList(props: ArrowListProps): JSX.Element;
