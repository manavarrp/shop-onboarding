import { Product } from '../../domain/entities/product.entity';

export class ProductMapper {

  static toDomain(raw: any): Product {
    return Product.fromPersistence(
      raw.id,
      raw.name,
      raw.price,
      raw.description,
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(product: Product) {
    return {
      name: product.getName(),
      price: product.getPrice(),
      description: product.getDescription(),
    };
  }
}