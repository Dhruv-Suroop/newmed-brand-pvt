import { ReactNode, CSSProperties } from "react";

/** Filter/selection chip. Outline by default; coral fill when active; optional remove ×. */
export interface TagProps {
  children: ReactNode;
  active?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export function Tag(props: TagProps): JSX.Element;
