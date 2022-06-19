import type { MouseEvent } from "react";

export interface FloatingButton {
  src: string;
  color: string;
  click?: (event: MouseEvent<HTMLButtonElement>) => void;
}
