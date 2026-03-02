import { Module } from '@nestjs/common';
import { PaymentController } from './presentation/payment.controller';
import { PrismaService } from 'src/shared/infrastructure/prisma/prisma.service';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from './application/use-cases/get-payment.use-case';
import { ListPaymentUseCase } from './application/use-cases/list-payment.use-case';
import { PrismaPaymentRepository } from './infrastructure/adapters/prisma-payment.repository';
import { PAYMENT_REPOSITORY } from './application/ports/payment.repository.port';

@Module({
  controllers: [PaymentController],
  providers: [
    PrismaService,
    CreatePaymentUseCase,
    GetPaymentUseCase,
    ListPaymentUseCase,
    { provide: PAYMENT_REPOSITORY, useClass: PrismaPaymentRepository },
  ],
})
export class PaymentsModule {}