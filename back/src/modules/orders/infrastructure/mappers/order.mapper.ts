import { Order, OrderItem } from '../../domain/entities/order.entity';

export class OrderMapper {
  static toDomain(raw: any): Order {
    const items = raw.items.map((i: any) => new OrderItem(i.id, i.productId, i.quantity, i.price));
    return new Order(raw.id, raw.createdAt, raw.status, raw.total, items);
  }

  static toPersistence(order: Order) {
    return {
      id: order.getId(),
      status: order.getStatus(),
      total: order.getTotal(),
      items: order.getItems().map(i => ({
        id: i.getId(),
        productId: i.getProductId(),
        quantity: i.getQuantity(),
        price: i.getPrice(),
      })),
    };
  }
}