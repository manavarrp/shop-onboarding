import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepositoryPort, PAYMENT_REPOSITORY } from '../ports/payment.repository.port';
import { Payment } from '../../domain/entities/payment.entity';
import { Result } from '../../../../shared/result';

@Injectable()
export class GetPaymentUseCase {
  constructor(@Inject(PAYMENT_REPOSITORY) private readonly repo: PaymentRepositoryPort) {}

  async execute(id: string): Promise<Result<Payment>> {
    const payment = await this.repo.findById(id);
    if (!payment) return Result.fail('Payment not found');
    return Result.ok(payment);
  }
}