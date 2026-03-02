import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepositoryPort, PAYMENT_REPOSITORY } from '../ports/payment.repository.port';
import { Payment } from '../../domain/entities/payment.entity';
import { Result } from '../../../../shared/result';

@Injectable()
export class ListPaymentUseCase {
  constructor(@Inject(PAYMENT_REPOSITORY) private readonly repo: PaymentRepositoryPort) {}

  async execute(): Promise<Result<Payment[]>> {
    const payments = await this.repo.findAll();
    return Result.ok(payments);
  }
}