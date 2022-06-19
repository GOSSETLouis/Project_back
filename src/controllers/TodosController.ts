import TodoRepository from '../models/TodoRepository'
export default class TodoController {
private todoRepository: TodoRepository;

    constructor(todoRepository: TodoRepository){
        this.todoRepository = todoRepository;
    }
    renderData(){
        return this.todoRepository.getAll()
    }

    addNewTodo(name: string, isCompleted: boolean, deadline: number | null, creationDate: number){
            return this.todoRepository.createTodo(
              name,
              isCompleted,
              deadline,
              creationDate
            );
    }

    setTodoComplete(id: number, isCompleted: boolean){
        return this.todoRepository.updateTodo(id, isCompleted);
    }

    delete(id: number){
        return this.todoRepository.deleteTodo(id);
    }

    update(id: number, name: string, date: number | null){
        return this.todoRepository.updateTodoName(id, name, date);
    }
}