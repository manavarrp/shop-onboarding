import { Product } from '../../domain/entities/product.entity';

export class ProductMapper {
  static toDomain(raw: any): Product {
    return Product.fromPersistence(
      raw.id,           // string
      raw.name,         // string
      raw.description,  // string | null
      raw.price,        // number
      raw.createdAt,    // Date
      raw.updatedAt     // Date
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