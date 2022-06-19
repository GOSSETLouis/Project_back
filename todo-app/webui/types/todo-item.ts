export interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
  onComplete: (id: number, isCompleted: boolean) => void;
  onUpdate: (id: number, argument2: string, argument3: number | null) => void;
  onDelete: (id: number) => void;
  deadLine: number | null;
  listfilter: boolean;
  creationDate: number;
}
