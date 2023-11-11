import { Request, Response } from "express";
import { todo } from "node:test";

interface TodoProperties {
    id: number;
    text: String;
    createdAt: Date;
}


class Todo {

    id: number;
    text: String;
    createdAt: Date;

    constructor(properties: TodoProperties){
        const { id, text, createdAt } = properties;
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
    }


    static toJson(todo: Todo) {
        return {
            "id": todo.id,
            "text": todo.text,
            "createdAt": todo.createdAt,
        }
    } 

}

const todosList = [
    new Todo({ id: 1,text: 'Hola',createdAt: new Date() }),
    new Todo({ id: 2,text: 'Adios',createdAt: new Date() }),
    new Todo({ id: 3,text: 'Buen día',createdAt: new Date() }),
];


export class TodoController {

    constructor(){}

    public getTodos = (req: Request, res: Response) => {
        return res.json(todosList.map(e => Todo.toJson(e)));
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id)) return res.status( 400 ).json( { error: `ID argument is not a number` } );

        const element = todosList.find(e => e.id === id);
        
        ( element ) 
        ? res.json(element) 
        : res.status( 404 ).json({ error: `todo with id ${id} not found` } ); 
    }

    public postTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if( !text ) return res.status(400).json({ error: 'Text property is required' });

        const newTodo = new Todo({
            id: todosList.length + 1,
            text: text,
            createdAt: new Date(),
        });

        todosList.push(newTodo);

        return res.send(newTodo);
    }


    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if( isNaN(id)) return res.status( 400 ).json( { error: `ID argument is not a number` } );
            
        const todo = todosList.find(e => e.id === id);
        if( !todo ) return res.status(404).json( { error: `Todo with id ${id} not exists` } );
        
        const { text } = req.body;

        todosList.filter(e => e.id === id).map((e) => {
            e.text = text || todo.text
        });

        return res.send(todosList.map(Todo.toJson));
    }

    public deteleTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id)) return res.status( 400 ).json( { error: `ID argument is not a number` } );

        const todo = todosList.find(e => e.id === id);
        if( !todo ) return res.status(404).json( { error: `Todo with id ${id} not exists` } );

        todosList.splice( todosList.indexOf(todo), 1);

        return res.send(todosList.map(Todo.toJson));
    }
}