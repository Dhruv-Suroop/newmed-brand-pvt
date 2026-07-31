import { ReactNode, CSSProperties } from "react";

/**
 * Surface container — white, soft 24px radius, warm low shadow. The default box.
 * @startingPoint section="Data display" subtitle="Card surface" viewport="700x200"
 */
export interface CardProps {
  children: ReactNode;
  /** Inner padding in px. @default 24 */
  padding?: number;
  /** Lift on hover. @default false */
  interactive?: boolean;
  /** Stronger resting shadow. @default false */
  elevated?: boolean;
  style?: CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
