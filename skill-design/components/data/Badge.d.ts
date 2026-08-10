import { ReactNode, CSSProperties } from "react";

/** Small pill badge for status/labels. */
export interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "orange" | "yellow" | "teal" | "success" | "solid" | "ink";
  /** Leading status dot. @default false */
  dot?: boolean;
  style?: CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
