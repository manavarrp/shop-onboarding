import { CreateProductUseCase } from './create-product.use-case';
import { ProductRepositoryPort } from '../ports/product.repository.port';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let repository: jest.Mocked<ProductRepositoryPort>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    useCase = new CreateProductUseCase(repository);
  });

  it('should create a product successfully', async () => {
    repository.save.mockImplementation(async (product) => product);

    const result = await useCase.execute({
      name: 'Laptop',
      price: 2000,
      description: 'Gaming',
    });

    expect(result.isSuccess).toBe(true);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should fail when name invalid', async () => {
    const result = await useCase.execute({
      name: '',
      price: 2000,
    });

    expect(result.isFailure).toBe(true);
  });
});