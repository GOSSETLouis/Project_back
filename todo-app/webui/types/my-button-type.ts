import { MouseEvent } from "react";

export interface MyButtonType {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>) => void;
}
