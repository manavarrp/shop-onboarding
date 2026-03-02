import { Result } from "../../../../shared/result";
import { randomUUID } from "crypto";

export class Product {
  constructor(
    private readonly id: string,
    private name: string,
    private description: string | null,
    private price: number,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  // Crear un producto
  static create(name: string, price: number, description?: string): Result<Product> {
    if (!name || name.trim().length < 2) return Result.fail('Name must be at least 2 characters long');
    if (price < 0) return Result.fail('Price must be positive');

    const product = new Product(
      randomUUID(),
      name.trim(),
      description ?? null,
      price,
      new Date(),
      new Date(),
    );

    return Result.ok(product);
  }

  static fromPersistence(
    id: string,
    name: string,
    description: string | null,
    price: number,
    createdAt: Date,
    updatedAt: Date,
  ): Product {
    return new Product(id, name, description, price, createdAt, updatedAt);
  }

  // Getters
  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getDescription(): string | null { return this.description; }
  getPrice(): number { return this.price; }
  getCreatedAt(): Date { return this.createdAt; }
  getUpdatedAt(): Date { return this.updatedAt; }

  // Updates
  updateName(name: string): Result<void> {
    if (!name || name.trim().length < 2) return Result.fail('Name must be at least 2 characters long');
    this.name = name.trim();
    this.updatedAt = new Date();
    return Result.ok(undefined);
  }

  updateDescription(description: string | null): Result<void> {
    this.description = description;
    this.updatedAt = new Date();
    return Result.ok(undefined);
  }

  updatePrice(price: number): Result<void> {
    if (price < 0) return Result.fail('Price must be positive');
    this.price = price;
    this.updatedAt = new Date();
    return Result.ok(undefined);
  }
}