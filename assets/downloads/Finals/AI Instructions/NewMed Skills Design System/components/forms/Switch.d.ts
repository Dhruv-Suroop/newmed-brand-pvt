import { CSSProperties } from "react";

/** Switch toggle with coral "on" track. */
export interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  onChange?: (checked: boolean) => void;
}

export function Switch(props: SwitchProps): JSX.Element;
