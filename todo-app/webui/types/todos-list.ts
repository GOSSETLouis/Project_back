import type { Todo } from "./todo";

export interface TodosList {
  filter: string;
  todos: Todo[];
  listfilter: boolean;
  onCompleteTodo: (id: number, isCompleted: boolean) => void;
  onUpdateTodo: (id: number, value: string, date: number | null) => void;
  onDeleteTodo: (id: number) => void;
}
