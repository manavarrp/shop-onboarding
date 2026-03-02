import { Module } from '@nestjs/common';
import { OrderController } from './presentation/order.controller';
import { PrismaService } from 'src/shared/infrastructure/prisma/prisma.service';
import { CreateOrderUseCase } from './application/use-cases/create-order.use-case';
import { ListOrderUseCase } from './application/use-cases/list-order.use-case';
import { GetOrderUseCase } from './application/use-cases/get-order.use-case';
import { PrismaOrderRepository } from './infrastructure/adapters/prisma-order.repository';
import { ORDER_REPOSITORY } from './application/ports/order.repository.port';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    CreateOrderUseCase,
    ListOrderUseCase,
    GetOrderUseCase,
    { provide: ORDER_REPOSITORY, useClass: PrismaOrderRepository },
  ],
})
export class OrdersModule {}