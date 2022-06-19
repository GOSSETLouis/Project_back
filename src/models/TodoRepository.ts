import Todos from "../classes/todos"
import { Database } from "sqlite3";

export default class TodoRepository {
    error: any;
    db = new Database('/home/louis/Documents/todo-app/back/src/Database/database.db');
    
    async getAll(): Promise <Array<Todos>> {
       let allTodos = []
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM Todos", (error: any, rows: Array<Todos>) => {
                if (error){
                    reject(error)
                } else {
                  rows.forEach((row: { id: number; name: string; isCompleted: boolean; deadline: number; creationDate: number; }) => {
                allTodos.push(new Todos(row.id, row.name, row.isCompleted, row.deadline, row.creationDate));
                
                
            });  
            resolve(allTodos);
            console.log(allTodos)
                }
        });
        })
        
    }

    async createTodo(name: string, isCompleted: boolean, deadline: number, creationDate: number): Promise <void>{
        console.log("coucou")
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO "Todos" (name, isCompleted, deadline, creationDate) VALUES ($name ,$isCompleted ,$deadline ,$creationDate)'
            let params = {
                $name: name, 
                $isCompleted: isCompleted, 
                $deadline: deadline, 
                $creationDate: creationDate
            }
            this.db.run(sql, params, function (error: any, result: void | PromiseLike<void>){
                if (error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async updateTodo(id: number, isCompleted: boolean): Promise <void>{
        console.log("coucou")
        return new Promise((resolve, reject) => {
            let sql = 'Update "Todos" set isCompleted = $isCompleted WHERE id = $id'
            let params = {
                $id: id,
                $isCompleted: isCompleted,
            }
            this.db.run(sql, params, function (error: any, result: void | PromiseLike<void>){
                if (error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async updateTodoName(id: number, name: string, date: number | null): Promise <void>{
        console.log("coucou")
        return new Promise((resolve, reject) => {
            let sql = 'Update "Todos" set name = $name, deadline = $date WHERE id = $id'
            let params = {
                $id: id,
                $name: name,
                $date: date
            }
            this.db.run(sql, params, function (error: any, result: void | PromiseLike<void>){
                if (error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }

    async deleteTodo(id: number): Promise <void>{
        console.log("coucou")
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM "Todos" WHERE id = $id'
            let params = {
                $id: id,
            }
            this.db.run(sql, params, function (error: any, result: void | PromiseLike<void>){
                if (error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
    }



}
