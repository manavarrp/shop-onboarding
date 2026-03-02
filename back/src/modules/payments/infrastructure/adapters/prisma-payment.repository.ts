// backend/src/payments/infrastructure/adapters/prisma-payment.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { PaymentRepositoryPort } from '../../application/ports/payment.repository.port';
import { Payment, PaymentMethod, PaymentStatus } from '../../domain/entities/payment.entity';

@Injectable()
export class PrismaPaymentRepository implements PaymentRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    const records = await this.prisma.prisma.payment.findMany();
    return records.map(
      r =>
        new Payment(
          r.id,
          r.orderId,
          r.method as PaymentMethod,
          r.status as PaymentStatus,
          r.amount,
          r.transactionId ?? undefined,
          r.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<Payment | null> {
    const r = await this.prisma.prisma.payment.findUnique({ where: { id } });
    if (!r) return null;

    return new Payment(
      r.id,
      r.orderId,
      r.method as PaymentMethod,
      r.status as PaymentStatus,
      r.amount,
      r.transactionId ?? undefined,
      r.createdAt,
    );
  }

  async save(payment: Payment): Promise<Payment> {
    const r = await this.prisma.prisma.payment.upsert({
      where: { id: payment.getId() },
      create: {
        id: payment.getId(),
        orderId: payment.getOrderId(),
        method: payment.getMethod(),
        status: payment.getStatus(),
        amount: payment.getAmount(),
        transactionId: payment.getTransactionId() ?? undefined,
      },
      update: {
        status: payment.getStatus(),
        transactionId: payment.getTransactionId() ?? undefined,
      },
    });

    return new Payment(
      r.id,
      r.orderId,
      r.method as PaymentMethod,
      r.status as PaymentStatus,
      r.amount,
      r.transactionId ?? undefined,
      r.createdAt,
    );
  }
}