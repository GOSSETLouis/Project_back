export default class Todos {
    id: number;
    name: string;
    isCompleted: boolean;
    deadline: number | null;
    creationDate: number;


    constructor(id: number, name: string, isCompleted: boolean, deadline: number | null, creationDate: number) {
        this.setId(id)
        this.setName(name);
        this.setComplete(isCompleted);
        this.setDeadline(deadline);
        this.setCreation(creationDate);
    }

    setId(id: number) {
        this.id = id;
    }

    setName(name: string) {
        this.name = name;
    }
    setComplete(isCompleted: boolean) {
        this.isCompleted = isCompleted
    }
    setDeadline(deadline: number | null) {
        this.deadline = deadline === undefined ? null : deadline
    }
    setCreation(creationDate: number) {
        this.creationDate = creationDate
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }
    getComplete() {
        return this.isCompleted
    }
    getDeadline() {
        return this.deadline
    }
    getCreation() {
        return this.creationDate
    }
}