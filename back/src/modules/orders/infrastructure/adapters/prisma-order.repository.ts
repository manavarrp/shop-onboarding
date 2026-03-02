import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { OrderRepositoryPort } from '../../application/ports/order.repository.port';
import { OrderMapper } from '../mappers/order.mapper';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class PrismaOrderRepository implements OrderRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.prisma.order.findMany({
      include: { items: true },
    });
    return orders.map(OrderMapper.toDomain);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) return null;
    return OrderMapper.toDomain(order);
  }

  async save(order: Order): Promise<Order> {
    const data = OrderMapper.toPersistence(order);

    const saved = await this.prisma.prisma.order.upsert({
      where: { id: data.id },
      update: {
        status: data.status,
        total: data.total,
        items: {
          deleteMany: {},
          create: data.items,
        },
      },
      create: {
        id: data.id,
        status: data.status,
        total: data.total,
        items: {
          create: data.items,
        },
      },
      include: { items: true },
    });

    return OrderMapper.toDomain(saved);
  }

  
}