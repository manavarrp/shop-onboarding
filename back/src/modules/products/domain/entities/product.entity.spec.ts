import { Product } from '../../domain/entities/product.entity';

describe('Product Entity', () => {

  it('should create a valid product', () => {
    const result = Product.create('Laptop', 2000);

    expect(result.isSuccess).toBe(true);

    const product = result.getValue();

    expect(product.getName()).toBe('Laptop');
    expect(product.getPrice()).toBe(2000);
  });

  it('should fail when name is invalid', () => {
    const result = Product.create('', 2000);

    expect(result.isFailure).toBe(true);
  });

  it('should fail when price is negative', () => {
    const result = Product.create('Laptop', -10);

    expect(result.isFailure).toBe(true);
  });

});