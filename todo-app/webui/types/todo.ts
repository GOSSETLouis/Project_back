export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  deadLine: number | null;
  creationDate: number;
}

export type CreateTodo = Omit<Todo, "id">;
