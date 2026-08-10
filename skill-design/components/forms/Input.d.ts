import { ReactNode, CSSProperties } from "react";

/** Labelled text input with hint/error states and a soft orange focus ring. */
export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  iconLeft?: ReactNode;
  style?: CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps): JSX.Element;
