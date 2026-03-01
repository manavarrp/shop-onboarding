import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryPort, PRODUCT_REPOSITORY } from '../ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { Result } from 'src/shared/result';


@Injectable()
export class GetProductUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly repo: ProductRepositoryPort) {}

  async execute(id: number): Promise<Result<Product>> {
    const product = await this.repo.findById(id);
    if (!product) return Result.fail('Product not found');
    return Result.ok(product);
  }
}