import { Inject, Injectable } from '@nestjs/common';
import { OrderRepositoryPort, ORDER_REPOSITORY } from '../ports/order.repository.port';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { Result } from '../../../../shared/result';

export interface CreateOrderDTO {
  items: { productId: string; quantity: number; price: number }[];
}

@Injectable()
export class CreateOrderUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private readonly repo: OrderRepositoryPort) { }

  async execute(dto: CreateOrderDTO): Promise<Result<Order>> {
    const itemsResult: Result<OrderItem>[] = [];

    for (const i of dto.items) {
      if (!i.productId) {
        return Result.fail<Order>('productId is required');
      }

      const itemResult = OrderItem.create(i.productId!, i.quantity, i.price);
      itemsResult.push(itemResult);
    }

    const failed = itemsResult.find(r => r.isFailure);
    if (failed) return Result.fail(failed!.error ?? 'Unknown error');

    const items = itemsResult.map(r => r.getValue());

    const orderResult = Order.create(items);
    if (orderResult.isFailure) 
    return Result.fail(orderResult.error ?? 'Unknown error');

    const saved = await this.repo.save(orderResult.getValue());
    return Result.ok(saved);
  }
}