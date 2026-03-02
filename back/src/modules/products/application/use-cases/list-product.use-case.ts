import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryPort, PRODUCT_REPOSITORY } from '../ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { Result } from '../../../../shared/result';

@Injectable()
export class ListProductUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly repo: ProductRepositoryPort) {}

  async execute(): Promise<Result<Product[]>> {
    const products = await this.repo.findAll();
    return Result.ok(products);
  }
}