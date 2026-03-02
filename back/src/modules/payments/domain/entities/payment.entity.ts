import { randomUUID } from 'crypto';
import { Result } from '../../../../shared/result';

export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FAILED';
export type PaymentMethod = 'CARD' | 'PSE' | 'CASH' | 'TRANSFER';

export class Payment {
  constructor(
    private readonly id: string,
    private orderId: string,
    private method: PaymentMethod,
    private status: PaymentStatus,
    private amount: number,
    private transactionId?: string,
    private createdAt: Date = new Date(),
  ) {}

  static create(orderId: string, method: PaymentMethod, amount: number): Result<Payment> {
    if (!orderId) return Result.fail('orderId is required');
    if (amount <= 0) return Result.fail('amount must be positive');
    if (!method) return Result.fail('method is required');

    return Result.ok(new Payment(randomUUID(), orderId, method, 'PENDING', amount));
  }

  getId() { return this.id; }
  getOrderId() { return this.orderId; }
  getMethod() { return this.method; }
  getStatus() { return this.status; }
  getAmount() { return this.amount; }
  getTransactionId() { return this.transactionId; }
  getCreatedAt() { return this.createdAt; }

  setStatus(status: PaymentStatus) { this.status = status; }
  setTransactionId(transactionId: string) { this.transactionId = transactionId; }
}