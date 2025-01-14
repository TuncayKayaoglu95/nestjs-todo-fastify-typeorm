import { Controller, Get, Post, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Query('id') id?: number) {
    if (id) {
      return this.todoService.getTodoById(id);
    }
    return this.todoService.getAllTodos();
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id', ParseIntPipe) id: number) {
    await this.todoService.deleteTodoById(id);
    return { message: `Todo with ID ${id} deleted successfully` };
  }
}
