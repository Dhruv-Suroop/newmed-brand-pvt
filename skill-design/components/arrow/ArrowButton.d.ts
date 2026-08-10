import { ReactNode, CSSProperties } from "react";

/** Arrow-shaped CTA button — the brand's primary action shape. */
export interface ArrowButtonProps {
  children: ReactNode;
  /** @default "orange" (also "sunset", "ink", any CSS color) */
  fill?: string;
  /** Text color. @default "#fff" */
  color?: string;
  /** Outline variant. @default false */
  outline?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}
export function ArrowButton(props: ArrowButtonProps): JSX.Element;
