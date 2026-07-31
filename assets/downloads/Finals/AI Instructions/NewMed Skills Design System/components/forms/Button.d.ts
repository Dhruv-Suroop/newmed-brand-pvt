import { ReactNode, CSSProperties } from "react";

/**
 * NewMed Skills primary action button. Coral fill = the single main action per view;
 * secondary (ink), outline, and ghost for lesser actions. Pill-shaped, calm hover.
 *
 * @startingPoint section="Forms" subtitle="Button — primary, secondary, outline, ghost" viewport="700x150"
 */
export interface ButtonProps {
  children: ReactNode;
  /** Visual weight. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export function Button(props: ButtonProps): JSX.Element;
