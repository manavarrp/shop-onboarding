import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { GetOrderUseCase } from '../application/use-cases/get-order.use-case';
import { ListOrderUseCase } from '../application/use-cases/list-order.use-case';
import { Order, OrderItem } from '../domain/entities/order.entity';

describe('OrderController', () => {
  let controller: OrderController;

  const mockCreateUseCase = { execute: jest.fn() };
  const mockGetUseCase = { execute: jest.fn() };
  const mockListUseCase = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: CreateOrderUseCase, useValue: mockCreateUseCase },
        { provide: GetOrderUseCase, useValue: mockGetUseCase },
        { provide: ListOrderUseCase, useValue: mockListUseCase },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should create an order', async () => {
    const item = OrderItem.create('uuid-1', 2, 100).getValue();
    const order = Order.create([item]).getValue();

    mockCreateUseCase.execute.mockResolvedValue({
      isSuccess: true,
      getValue: () => order,
    });

    const result = await controller.create({
      items: [{ productId: 'uuid-1', quantity: 2, price: 100 }],
    });

    expect(result.getItems().length).toBe(1);
    expect(result.getTotal()).toBe(200);
  });

  it('should return all orders', async () => {
    const item = OrderItem.create('uuid-1', 2, 100).getValue();
    const order = Order.create([item]).getValue();

    mockListUseCase.execute.mockResolvedValue({
      isSuccess: true,
      getValue: () => [order],
    });

    const result = await controller.findAll();

    expect(result.length).toBe(1);
    expect(result[0].getTotal()).toBe(200);
  });

  it('should return a single order by id', async () => {
    const item = OrderItem.create('uuid-1', 2, 100).getValue();
    const order = Order.create([item]).getValue();

    mockGetUseCase.execute.mockResolvedValue({
      isSuccess: true,
      getValue: () => order,
    });

    const result = await controller.findOne('some-uuid');

    expect(result.getItems().length).toBe(1);
    expect(result.getTotal()).toBe(200);
  });
});