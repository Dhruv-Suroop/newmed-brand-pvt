import { CSSProperties } from "react";

/** Thin progress bar with orange sunrise fill. */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  style?: CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
