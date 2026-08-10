import { CSSProperties } from "react";

/** Labelled dropdown styled to match Input. Options accept strings or {value,label}. */
export interface SelectProps {
  label?: string;
  hint?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  options: (string | { value: string; label: string })[];
  disabled?: boolean;
  style?: CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select(props: SelectProps): JSX.Element;
