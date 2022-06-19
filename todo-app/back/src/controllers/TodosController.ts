import TodoRepository from '../models/TodoRepository'
export default class TodoController extends TodoRepository{


    renderData(){
        return this.getAll()
    }

    addNewTodo(name: string, isCompleted: boolean, deadline: number, creationDate: number){
            return this.createTodo(name, isCompleted, deadline, creationDate)
    }

    setTodoComplete(id: number, isCompleted: boolean){
        return this.updateTodo(id, isCompleted)
    }

    delete(id: number){
        return this.deleteTodo(id)
    }

    update(id: number, name: string, date: number | null){
        return this.updateTodoName(id, name, date)
    }
}