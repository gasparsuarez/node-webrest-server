import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";


export interface UpdateTodoUseCase {
    execute(updateTodo: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase{
    
    
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    execute(updateTodo: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.updateById(updateTodo);
    }


}