import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { ListProductUseCase } from '../application/use-cases/list-product.use-case';
import { GetProductUseCase } from '../application/use-cases/get-product.use-case';
import { Product } from '../domain/entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;

  const mockCreateUseCase = {
    execute: jest.fn(),
  };

  const mockListUseCase = {
    execute: jest.fn(),
  };

  const mockGetUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: CreateProductUseCase, useValue: mockCreateUseCase },
        { provide: ListProductUseCase, useValue: mockListUseCase },
        { provide: GetProductUseCase, useValue: mockGetUseCase },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should create product', async () => {
    const entity = Product.create('Laptop', 2000).getValue();

    mockCreateUseCase.execute.mockResolvedValue({
      isSuccess: true,
      getValue: () => entity,
    });

    const result = await controller.create({
      name: 'Laptop',
      price: 2000,
    });

    expect(result.name).toBe('Laptop');
  });

  it('should return all products', async () => {
    const entity = Product.create('Laptop', 2000).getValue();

    mockListUseCase.execute.mockResolvedValue({
      isSuccess: true,
      getValue: () => [entity],
    });

    const result = await controller.findAll();

    expect(result.length).toBe(1);
  });
});