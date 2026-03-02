import { Result } from '../../../../shared/result';
import { randomUUID } from 'crypto';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export class OrderItem {
  constructor(
    private readonly id: string,
    private productId: string,
    private quantity: number,
    private price: number
  ) {}

  static create(productId: string, quantity: number, price: number): Result<OrderItem> {
    if (!productId) return Result.fail('productId is required');
    if (quantity <= 0) return Result.fail('quantity must be greater than 0');
    if (price < 0) return Result.fail('price must be positive');

    return Result.ok(new OrderItem(randomUUID(), productId, quantity, price));
  }

  getId(): string { return this.id; }
  getProductId(): string { return this.productId; }
  getQuantity(): number { return this.quantity; }
  getPrice(): number { return this.price; }
}

export class Order {
  constructor(
    private readonly id: string,
    private createdAt: Date,
    private status: OrderStatus,
    private total: number,
    private items: OrderItem[],
  ) {}

  static create(items: OrderItem[]): Result<Order> {
    if (!items || items.length === 0) return Result.fail('Order must have at least one item');

    const total = items.reduce((sum, item) => sum + item.getPrice() * item.getQuantity(), 0);
    return Result.ok(new Order(randomUUID(), new Date(), 'PENDING', total, items));
  }

  getId(): string { return this.id; }
  getCreatedAt(): Date { return this.createdAt; }
  getStatus(): OrderStatus { return this.status; }
  getTotal(): number { return this.total; }
  getItems(): OrderItem[] { return this.items; }

  setStatus(status: OrderStatus) { this.status = status; }
}