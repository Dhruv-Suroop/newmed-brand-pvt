import { CSSProperties } from "react";

/** Radio group — single selection, orange dot when chosen. */
export interface RadioProps {
  name: string;
  options: (string | { value: string; label: string })[];
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onChange?: (value: string) => void;
}

export function Radio(props: RadioProps): JSX.Element;
