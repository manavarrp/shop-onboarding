import { CreateOrderUseCase } from './create-order.use-case';
import { OrderRepositoryPort } from '../ports/order.repository.port';


describe('CreateOrderUseCase', () => {
  let useCase: CreateOrderUseCase;
  let repository: jest.Mocked<OrderRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new CreateOrderUseCase(repository);
  });

  it('should create an order successfully', async () => {
    repository.save.mockImplementation(async (order) => order);

    const result = await useCase.execute({
      items: [
        { productId: 'uuid-1', quantity: 2, price: 100 },
        { productId: 'uuid-2', quantity: 1, price: 50 },
      ],
    });

    expect(result.isSuccess).toBe(true);
    expect(repository.save).toHaveBeenCalled();

    const order = result.getValue();
    expect(order.getItems().length).toBe(2);
    expect(order.getItems()[0].getProductId()).toBe('uuid-1');
  });

  it('should fail if an item is invalid', async () => {
    const result = await useCase.execute({
      items: [
        { productId: '', quantity: 2, price: 100 }, // invalid productId
      ],
    });

    expect(result.isFailure).toBe(true);
  });
});