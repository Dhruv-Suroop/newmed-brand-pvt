import { CSSProperties } from "react";

/** Big-number statistic — the numeral is the point (every claim carries a number). */
export interface StatProps {
  value: string;
  label: string;
  sublabel?: string;
  /** Render the value in orange. @default false */
  accent?: boolean;
  align?: "left" | "center";
  style?: CSSProperties;
}

export function Stat(props: StatProps): JSX.Element;
