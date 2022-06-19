"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todos {
    constructor(id, name, isCompleted, deadline, creationDate) {
        this.setId(id);
        this.setName(name);
        this.setComplete(isCompleted);
        this.setDeadline(deadline);
        this.setCreation(creationDate);
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setComplete(isCompleted) {
        this.isCompleted = isCompleted;
    }
    setDeadline(deadline) {
        this.deadline = deadline;
    }
    setCreation(creationDate) {
        this.creationDate = creationDate;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getComplete() {
        return this.isCompleted;
    }
    getDeadline() {
        return this.deadline;
    }
    getCreation() {
        return this.creationDate;
    }
}
exports.default = Todos;
