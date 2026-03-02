import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentUseCase, CreatePaymentDTO } from './create-payment.use-case';
import { PaymentRepositoryPort, PAYMENT_REPOSITORY } from '../ports/payment.repository.port';
import { Payment, PaymentMethod } from '../../domain/entities/payment.entity';
import { Result } from '../../../../shared/result';

// Mock de repositorio
class MockPaymentRepository implements PaymentRepositoryPort {
  async save(payment: Payment): Promise<Payment> {
    return payment;
  }
  async findById(id: string): Promise<Payment | null> {
    return null;
  }
  async findAll(): Promise<Payment[]> {
    return [];
  }
}

// Mock WompiClient
jest.mock('../../wompi-client', () => {
  return {
    WompiClient: class {
      async createPayment(req: any) {
        return {
          data: {
            id: 'mock-txn-id',
            status: 'APPROVED',
            amount_in_cents: req.amount_in_cents,
            reference: 'ref-123',
          },
        };
      }
    },
  };
});

describe('CreatePaymentUseCase', () => {
  let useCase: CreatePaymentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePaymentUseCase,
        { provide: PAYMENT_REPOSITORY, useClass: MockPaymentRepository },
      ],
    }).compile();

    useCase = module.get<CreatePaymentUseCase>(CreatePaymentUseCase);
  });

  it('should create a payment and mark it APPROVED', async () => {
    const dto: CreatePaymentDTO = {
      orderId: 'order-123',
      amount: 150,
      method: 'CARD',
      token: 'tok_test_123',
      customerEmail: 'cliente@example.com',
    };

    const result = await useCase.execute(dto);
    expect(result.isSuccess).toBe(true);

    const payment = result.getValue();
    expect(payment.getOrderId()).toBe(dto.orderId);
    expect(payment.getAmount()).toBe(dto.amount);
    expect(payment.getStatus()).toBe('APPROVED');
    expect(payment.getTransactionId()).toBe('mock-txn-id');
  });

  it('should fail if amount is invalid', async () => {
    const dto: CreatePaymentDTO = {
      orderId: 'order-123',
      amount: 0,
      method: 'CARD',
      token: 'tok_test_123',
      customerEmail: 'cliente@example.com',
    };

    const result = await useCase.execute(dto);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('amount must be positive');
  });
});