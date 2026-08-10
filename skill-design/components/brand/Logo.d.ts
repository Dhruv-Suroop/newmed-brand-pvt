import { CSSProperties } from "react";

/**
 * The NewMed Skills logo lockup, rendered from the real brand mark.
 * @startingPoint section="Brand" subtitle="Logo lockups + symbol" viewport="700x150"
 */
export interface LogoProps {
  /** @default "horizontal" */
  variant?: "horizontal" | "stack" | "symbol";
  /** Wordmark font-size / symbol base size in px. @default 32 */
  size?: number;
  /** Wordmark color (symbol stays orange). @default ink */
  color?: string;
  style?: CSSProperties;
}
export function Logo(props: LogoProps): JSX.Element;

export interface SymbolProps {
  size?: number;
  style?: CSSProperties;
}
/** The orange symbol alone. */
export function Symbol(props: SymbolProps): JSX.Element;
