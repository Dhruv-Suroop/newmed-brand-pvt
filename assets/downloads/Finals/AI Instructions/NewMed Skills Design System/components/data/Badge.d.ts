import { ReactNode, CSSProperties } from "react";

/** Small pill badge for status/labels. */
export interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "coral" | "amber" | "teal" | "success" | "solid" | "ink";
  /** Leading status dot. @default false */
  dot?: boolean;
  style?: CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
