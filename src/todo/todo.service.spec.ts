import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockTodoRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should retrieve all todos', async () => {
    const mockTodos = [{ id: 1, title: 'Test', completed: false }];
    mockTodoRepository.find.mockResolvedValue(mockTodos);

    const result = await service.getAllTodos();
    expect(result).toEqual(mockTodos);
    expect(mockTodoRepository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException if todo not found', async () => {
    mockTodoRepository.findOneBy.mockResolvedValue(null);

    await expect(service.getTodoById(1)).rejects.toThrow('Todo with ID 1 not found');
  });

  it('should delete a todo', async () => {
    mockTodoRepository.delete.mockResolvedValue({ affected: 1 });
    await service.deleteTodoById(1);
    expect(mockTodoRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if deleting a non-existent todo', async () => {
    mockTodoRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteTodoById(1)).rejects.toThrow('Todo with ID 1 not found');
  });
});
