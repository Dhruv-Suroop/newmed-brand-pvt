import { ReactNode, CSSProperties } from "react";

/** ALL-CAPS letter-spaced eyebrow label above a heading. The only all-caps in the system. */
export interface EyebrowProps {
  children: ReactNode;
  /** @default orange */
  color?: string;
  style?: CSSProperties;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;
