"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todos_1 = __importDefault(require("../classes/todos"));
const sqlite3_1 = require("sqlite3");
class TodoRepository {
    constructor() {
        this.db = new sqlite3_1.Database('/home/louis/Documents/todo-app/back/src/Database/database.db');
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allTodos = [];
            return new Promise((resolve, reject) => {
                this.db.all("SELECT * FROM Todos", (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        rows.forEach((row) => {
                            allTodos.push(new todos_1.default(row.id, row.name, row.isCompleted, row.deadline, row.creationDate));
                        });
                        resolve(allTodos);
                        console.log(allTodos);
                    }
                });
            });
        });
    }
    createTodo(name, isCompleted, deadline, creationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("coucou");
            return new Promise((resolve, reject) => {
                let sql = 'INSERT INTO "Todos" (name, isCompleted, deadline, creationDate) VALUES ($name ,$isCompleted ,$deadline ,$creationDate)';
                let params = {
                    $name: name,
                    $isCompleted: isCompleted,
                    $deadline: deadline,
                    $creationDate: creationDate
                };
                this.db.run(sql, params, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    updateTodo(id, isCompleted) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("coucou");
            return new Promise((resolve, reject) => {
                let sql = 'Update "Todos" set isCompleted = $isCompleted WHERE id = $id';
                let params = {
                    $id: id,
                    $isCompleted: isCompleted,
                };
                this.db.run(sql, params, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    updateTodoName(id, name, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("coucou");
            return new Promise((resolve, reject) => {
                let sql = 'Update "Todos" set name = $name, deadline = $date WHERE id = $id';
                let params = {
                    $id: id,
                    $name: name,
                    $date: date
                };
                this.db.run(sql, params, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("coucou");
            return new Promise((resolve, reject) => {
                let sql = 'DELETE FROM "Todos" WHERE id = $id';
                let params = {
                    $id: id,
                };
                this.db.run(sql, params, function (error, result) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
}
exports.default = TodoRepository;
