import type { TodoFilter } from "../const/todos-filter";

export interface TodosFilter {
  filter: string;
  click: (argument: TodoFilter) => void;
}
