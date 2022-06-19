import type { ChangeEvent, KeyboardEvent } from "react";

export interface MyInput {
  id: string;
  label: string;
  value: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKey?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
