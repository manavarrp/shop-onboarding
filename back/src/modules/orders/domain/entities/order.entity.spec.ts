import { Order, OrderItem } from './order.entity';

describe('Order Entity', () => {
  it('should create a valid order with items', () => {
    const item1 = OrderItem.create('uuid-1', 2, 100).getValue();
    const item2 = OrderItem.create('uuid-2', 1, 50).getValue();

    const order = Order.create([item1, item2]).getValue();

    expect(order.getItems().length).toBe(2);
    expect(order.getTotal()).toBe(250);
  });

  it('should fail when no items are provided', () => {
    const result = Order.create([]);
    expect(result.isFailure).toBe(true);
  });

  it('should fail when an item has invalid data', () => {
    const itemResult = OrderItem.create('', 1, 100);
    expect(itemResult.isFailure).toBe(true);
  });
});