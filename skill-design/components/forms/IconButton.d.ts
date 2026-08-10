import { ReactNode, CSSProperties } from "react";

/** Square icon-only button (nav, toolbars, close). Pairs with a Lucide glyph. */
export interface IconButtonProps {
  children: ReactNode;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  "aria-label": string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export function IconButton(props: IconButtonProps): JSX.Element;
