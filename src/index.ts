import Fastify from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const server = Fastify({

})
 const Todo = Type.Object({
   name: Type.String({minLength: 10}),
   isCompleted: Type.Boolean(),
   deadline: Type.Optional(Type.Number()),
   creationDate:Type.Number(),
 });
 type TodoType = Static<typeof Todo>;

  const TodoPatch = Type.Object({
   isCompleted: Type.Boolean(),
 });

 const TodoUpdate = Type.Object({
         name: Type.String(),
         date: Type.Number()
       });

 type TodoUpdateType = Static<typeof TodoUpdate>;
 type TodoPatchType = Static<typeof TodoPatch>;

server.register(require('fastify-cors'), {
  origin: /^http:\/\/localhost:3000/
})

import TodoController from "./controllers/TodosController"
import TodoRepository from './models/TodoRepository';
const todoController = new TodoController(new TodoRepository())
server.get('/', async (request, reply) => {
  return todoController.renderData()
})

server.get<{Params: {id: number}}>('/:id', async (request, reply) => {
  return (await todoController.renderData())[request.params.id]
})

server.post<{ Body: TodoType; Reply: string }>('/', {
     schema: {
       body: Todo,
       response: {
         200: Todo,
       },
     },
   }, async (request, reply) => {
  todoController.addNewTodo(request.body.name, request.body.isCompleted, request.body.deadline, request.body.creationDate)
  reply.status(201).send('saved')
})

server.patch<{Params: {id: number}, Body: Omit<TodoPatchType, 'id'>; Reply: string }>('/:id', {
     schema: {
       params: Type.Object({
         id: Type.Number(),
       }),
       body: TodoPatch,
       response: {
         200: TodoPatch,
       },
     },
   }, async (request, reply) => {
  todoController.setTodoComplete(request.params.id, request.body.isCompleted)
  reply.status(201).send('Updated');
})

server.patch<{Params: {id: number}, Body: TodoUpdateType, Reply: string }>('/Todo/Change/:id', {
     schema: {
       params: Type.Object({
         id: Type.Number(),
       }),
       body: TodoUpdate,
       response: {
         200: TodoUpdate,
       },
       
     },
   }, async (request, reply) => {
  todoController.update(request.params.id, request.body.name, request.body.date)
  reply.status(201).send('Updated');
})

server.delete<{ Params: { id: number }}>('/:id',{
  schema: {
   // request needs to have a querystring with a `name` parameter
   params: Type.Object({
         id: Type.Number(),
       }),
   },
}, async (request, reply) => {
const id = request.params.id
todoController.delete(id)
reply.status(201).send('Updated');
})

const main = async () => {
  try {
    let port = process.env.PORT ?? "8080"
    await server.listen(port)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()