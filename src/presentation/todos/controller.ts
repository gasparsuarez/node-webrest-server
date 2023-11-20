import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain/usecases/todos";



export class TodoController {

    // * Dendency Injection <Repository>
    constructor(
        private readonly repository: TodoRepository,
    ) { }


    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.repository)
            .execute()
            .then( todos => res.json( todos ))
            .catch( error => res.status(400).json( { error } ));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        new GetTodo(this.repository)
            .execute(id)
            .then( todo => res.json( todo ))
            .catch(error => res.status(400).json({ error }) )
    }

    public postTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
        
        new CreateTodo(this.repository)
            .execute(createTodoDto!)
            .then( todo => res.json({ todo }) )
            .catch( error => res.status(400).json({ error }));
    }


    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateDto] = UpdateTodoDto.create({ ...req.body, id });

        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.repository)
            .execute(updateDto!)
            .then(todo => res.json({ updated : todo}))
            .catch(error => res.status(400).json( { error } ));

    }

    public deteleTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number` });

        new DeleteTodo(this.repository)
            .execute(id)
            .then( todo => res.json({ removed : todo }))
            .catch( error => res.status(400).json({ error }));
    }
}