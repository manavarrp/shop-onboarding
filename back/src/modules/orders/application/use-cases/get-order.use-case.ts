import { Inject, Injectable } from '@nestjs/common';
import { OrderRepositoryPort, ORDER_REPOSITORY } from '../ports/order.repository.port';
import { Order } from '../../domain/entities/order.entity';
import { Result } from '../../../../shared/result';

@Injectable()
export class GetOrderUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private readonly repo: OrderRepositoryPort) {}

  async execute(id: string): Promise<Result<Order>> {
    const order = await this.repo.findById(id);
    if (!order) return Result.fail('Order not found');
    return Result.ok(order);
  }
}