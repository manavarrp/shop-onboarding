import { Inject, Injectable } from '@nestjs/common';
import { ProductRepositoryPort, PRODUCT_REPOSITORY } from '../ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { Result } from 'src/shared/result';


export interface CreateProductDTO { name: string; price: number; description?: string }


@Injectable()
export class CreateProductUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly repo: ProductRepositoryPort) {}

  async execute(dto: CreateProductDTO): Promise<Result<Product>> {
    try {
      const product = Product.create(dto.name, dto.price, dto.description);
      const saved = await this.repo.save(product.getValue());
      return Result.ok(saved);
    } catch (err: any) { return Result.fail(err.message); }
  }
}


