import { Payment, PaymentMethod, PaymentStatus } from './payment.entity';
import { Result } from '../../../../shared/result';

describe('Payment Entity', () => {
  it('should create a Payment with valid data', () => {
    const result = Payment.create('order-123', 'CARD', 100);

    expect(result.isSuccess).toBe(true);
    const payment = result.getValue();

    expect(payment.getOrderId()).toBe('order-123');
    expect(payment.getAmount()).toBe(100);
    expect(payment.getMethod()).toBe('CARD');
    expect(payment.getStatus()).toBe('PENDING');
    expect(payment.getId()).toBeDefined();
    expect(payment.getCreatedAt()).toBeInstanceOf(Date);
  });

  it('should fail if amount is zero or negative', () => {
    const result = Payment.create('order-123', 'CARD', 0);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('amount must be positive');
  });

  it('should fail if orderId is empty', () => {
    const result = Payment.create('', 'CARD', 100);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('orderId is required');
  });

  it('should allow updating status and transactionId', () => {
    const payment = Payment.create('order-123', 'CARD', 100).getValue();

    payment.setStatus('APPROVED');
    payment.setTransactionId('txn-456');

    expect(payment.getStatus()).toBe('APPROVED');
    expect(payment.getTransactionId()).toBe('txn-456');
  });
});