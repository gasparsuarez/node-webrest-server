import { Router } from "express";
import { TodoController } from "./controller";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";
import { TodoDatasourceImpl } from "../../infraestructure/datasources/todo.datasource.impl";



export class TodoRoutes {
    
    static get routes(): Router {
        
        const router = Router();
            
        const datasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl( datasource );

        const todoController = new TodoController( todoRepository );

        router.get( '/', todoController.getTodos );
        router.get( '/:id', todoController.getTodoById );
        router.post('/', todoController.postTodo );
        router.put('/:id', todoController.updateTodo );
        router.delete('/:id', todoController.deteleTodo );
        
        return router;
    }

}