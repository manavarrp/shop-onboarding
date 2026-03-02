import { Payment } from '../../domain/entities/payment.entity';

export interface PaymentRepositoryPort {
  save(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
}

export const PAYMENT_REPOSITORY = Symbol('PAYMENT_REPOSITORY');