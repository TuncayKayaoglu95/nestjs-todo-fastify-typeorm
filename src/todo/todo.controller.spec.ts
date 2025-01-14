import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = {
    getAllTodos: jest.fn(() => [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ]),
    getTodoById: jest.fn((id: number) => ({
      id,
      title: `Test Todo ${id}`,
      completed: false,
    })),
    createTodo: jest.fn((dto) => ({
      id: Math.floor(Math.random() * 1000),
      ...dto,
    })),
    deleteTodoById: jest.fn((id: number) => ({
      message: `Todo with ID ${id} deleted`,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all todos', async () => {
    const todos = await controller.getTodos();
    expect(todos).toEqual(mockTodoService.getAllTodos());
    expect(service.getAllTodos).toHaveBeenCalled();
  });

  it('should return a todo by ID', async () => {
    const id = 1;
    const todo = await controller.getTodos(id);
    expect(todo).toEqual(mockTodoService.getTodoById(id));
    expect(service.getTodoById).toHaveBeenCalledWith(id);
  });
});
