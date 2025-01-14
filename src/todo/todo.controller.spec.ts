import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

const mockTodoService: Partial<TodoService> = {
  getAllTodos: jest.fn(async () => [
    { id: 1, title: 'Test Todo 1', isCompleted: false },
    { id: 2, title: 'Test Todo 2', isCompleted: true },
  ] as Todo[]),

  getTodoById: jest.fn(async (id: number) => ({
    id,
    title: `Test Todo ${id}`,
    isCompleted: false,
  } as Todo)),

  createTodo: jest.fn(async (dto: CreateTodoDto) => ({
    id: Math.floor(Math.random() * 1000),
    ...dto,
    isCompleted: false,
  } as Todo)),

  deleteTodoById: jest.fn(async (id: number) => {
    return;
  }),
};

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

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
    expect(todos).toEqual([
      { id: 1, title: 'Test Todo 1', isCompleted: false },
      { id: 2, title: 'Test Todo 2', isCompleted: true },
    ]);
    expect(service.getAllTodos).toHaveBeenCalled();
  });

  it('should return a todo by ID', async () => {
    const id = 1;
    const todo = await controller.getTodos(id);
    expect(todo).toEqual({
      id,
      title: `Test Todo ${id}`,
      isCompleted: false,
    });
    expect(service.getTodoById).toHaveBeenCalledWith(id);
  });

  it('should create a new todo', async () => {
    const createTodoDto: CreateTodoDto = { title: 'New Todo' };
    const createdTodo = await controller.createTodo(createTodoDto);
    expect(createdTodo).toEqual({
      id: expect.any(Number),
      title: 'New Todo',
      isCompleted: false,
    });
    expect(service.createTodo).toHaveBeenCalledWith(createTodoDto);
  });

  it('should delete a todo by ID', async () => {
    const id = 1;
    await controller.deleteTodoById(id);
    expect(service.deleteTodoById).toHaveBeenCalledWith(id);
  });
});
