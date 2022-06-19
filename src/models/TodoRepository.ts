import Todos from "../classes/todos"
import { Database } from "sqlite3";

export default class TodoRepository {
    error: any;
    db: Database;
    constructor(){
        this.db = new Database('database.db')
    }
    
    async getAll(): Promise <Array<Todos>> {
       await this.createTableIfNotExist();
       let allTodos: Todos[] = []
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM Todos", (error: any, rows: Array<Todos>) => {
                if (error){
                    reject(error)
                } else {
                  rows.forEach((row) => {
                allTodos.push(new Todos(row.id, row.name, row.isCompleted, row.deadline, row.creationDate));
                
                
            });  
            resolve(allTodos);
                }
        });
        })
        
    }

    async createTodo(name: string, isCompleted: boolean, deadline: number |null, creationDate: number): Promise <void>{
       await this.createTableIfNotExist();
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO "Todos" (name, isCompleted, deadline, creationDate) VALUES ($name ,$isCompleted ,$deadline ,$creationDate)'
            let params = {
                $name: name, 
                $isCompleted: isCompleted, 
                $deadline: deadline === null ? undefined : deadline, 
                $creationDate: creationDate
            }
            console.log({
              $name: name,
              $isCompleted: isCompleted,
              $deadline: deadline === null ? undefined : deadline,
              $creationDate: creationDate,
            });
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
        await this.createTableIfNotExist();
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
        await this.createTableIfNotExist();
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
        await this.createTableIfNotExist();
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

    private async createTableIfNotExist(): Promise<void>{
        return new Promise((resolve, reject) => {
            let sql = `CREATE TABLE IF NOT EXISTS Todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            isCompleted BIT,
            creationDate INTEGER,
            deadline INTEGER
        ) `;
            this.db.run(sql, function (error: any, result: void | PromiseLike<void>){
                if (error){
                    reject(error)
                } else {
                    resolve(result)
                }
            })
        })
       
    }

}
