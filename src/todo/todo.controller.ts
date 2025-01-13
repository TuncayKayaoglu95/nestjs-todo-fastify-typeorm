import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todoService.remove(Number(id));
  }
}
