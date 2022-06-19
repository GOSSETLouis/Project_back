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
const fastify_1 = __importDefault(require("fastify"));
const typebox_1 = require("@sinclair/typebox");
const server = (0, fastify_1.default)({});
const Todo = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    isCompleted: typebox_1.Type.Boolean(),
    deadline: typebox_1.Type.Optional(typebox_1.Type.Number()),
    creationDate: typebox_1.Type.Number(),
});
const TodoPatch = typebox_1.Type.Object({
    isCompleted: typebox_1.Type.Boolean(),
});
const TodoUpdate = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    date: typebox_1.Type.Number()
});
server.register(require('fastify-cors'), {
    origin: /^http:\/\/localhost:3000/
});
const TodosController_1 = __importDefault(require("./controllers/TodosController"));
const todoController = new TodosController_1.default;
server.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return todoController.renderData();
}));
server.get('/:id', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield todoController.renderData())[request.params.id];
}));
server.post('/', {
    schema: {
        body: Todo,
        response: {
            200: Todo,
        },
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    todoController.addNewTodo(request.body.name, request.body.isCompleted, request.body.deadline, request.body.creationDate);
    reply.status(201).send('saved');
}));
server.patch('/:id', {
    schema: {
        params: typebox_1.Type.Object({
            id: typebox_1.Type.Number(),
        }),
        body: TodoPatch,
        response: {
            200: TodoPatch,
        },
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    todoController.setTodoComplete(request.params.id, request.body.isCompleted);
    reply.status(201).send('Updated');
}));
server.patch('/Todo/Change/:id', {
    schema: {
        params: typebox_1.Type.Object({
            id: typebox_1.Type.Number(),
        }),
        body: TodoUpdate,
        response: {
            200: TodoUpdate,
        },
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    todoController.update(request.params.id, request.body.name, request.body.date);
    reply.status(201).send('Updated');
}));
server.delete('/:id', {
    schema: {
        // request needs to have a querystring with a `name` parameter
        params: typebox_1.Type.Object({
            id: typebox_1.Type.Number(),
        }),
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    console.log('coucou id delete', id);
    todoController.delete(id);
    reply.status(201).send('Updated');
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(8080);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
main();
