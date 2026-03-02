import { Inject, Injectable } from '@nestjs/common';
import { OrderRepositoryPort, ORDER_REPOSITORY } from '../ports/order.repository.port';
import { Order } from '../../domain/entities/order.entity';
import { Result } from '../../../../shared/result';

@Injectable()
export class ListOrderUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private readonly repo: OrderRepositoryPort) {}

  async execute(): Promise<Result<Order[]>> {
    const orders = await this.repo.findAll();
    return Result.ok(orders);
  }
}