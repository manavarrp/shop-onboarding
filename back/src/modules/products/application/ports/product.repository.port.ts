import { Product } from "../../domain/entities/product.entity";


export interface ProductRepositoryPort {
  save(product: Product): Promise<Product>;
  findById(id: number): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');