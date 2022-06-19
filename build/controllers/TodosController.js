"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TodoRepository_1 = __importDefault(require("../models/TodoRepository"));
class TodoController extends TodoRepository_1.default {
    renderData() {
        return this.getAll();
    }
    addNewTodo(name, isCompleted, deadline, creationDate) {
        return this.createTodo(name, isCompleted, deadline, creationDate);
    }
    setTodoComplete(id, isCompleted) {
        return this.updateTodo(id, isCompleted);
    }
    delete(id) {
        return this.deleteTodo(id);
    }
    update(id, name, date) {
        return this.updateTodoName(id, name, date);
    }
}
exports.default = TodoController;
