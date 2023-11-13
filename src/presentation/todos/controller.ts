import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";


export class TodoController {

    // * Dendency Injection

    constructor(){}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();

        return res.json( todos );
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id)) return res.status( 400 ).json( { error: `ID argument is not a number` } );

        const todo = await prisma.todo.findFirst({
            where: {
                id: id,
            }
        });
        
        ( todo ) 
        ? res.json( todo ) 
        : res.status( 404 ).json({ error: `todo with id ${id} not found` } ); 
    }

    public postTodo = async (req: Request, res: Response) => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);

        if( error ) return res.status(400).json({ error });
        
        const todo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return res.json( todo );
    }


    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updateDto ] = UpdateTodoDto.create({...req.body, id});
        
        if( error ) return res.status(400).json({ error });

            const todo = await prisma.todo.findFirst({
                where: { id : id }
            });
            if(!todo) return res.status(404).json( { error: `Todo with id ${id} not exists` } );

            const updatedTodo = await prisma.todo.update({
                where: { id: id },
                data: updateDto!.values
            });

            return res.json( updatedTodo );
    }

    public deteleTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id)) return res.status( 400 ).json( { error: `ID argument is not a number` } );

        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if(!todo) return res.status(404).json( { error: `Todo with id ${id} not exists` } );
        
        const deleted = await prisma.todo.delete({ 
            where: {
                id: id,
            }
        });

        return res.json( { message: 'Element removed.', deleted } );
    }
}