import { CSSProperties } from "react";

/** Avatar — photo, or initials on a warm coral tint. */
export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  square?: boolean;
  style?: CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
