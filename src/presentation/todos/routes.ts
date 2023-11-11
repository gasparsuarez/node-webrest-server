import { Router } from "express";
import { TodoController } from "./controller";
import { todo } from "node:test";




export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodoController();

        router.get( '/', todoController.getTodos );
        router.get( '/:id', todoController.getTodoById );
        router.post('/', todoController.postTodo );
        router.put('/:id', todoController.updateTodo );
        router.delete('/:id', todoController.deteleTodo );
        
        return router;
    }

}