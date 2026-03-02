import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { CreatePaymentUseCase } from '../application/use-cases/create-payment.use-case';
import { ListPaymentUseCase } from '../application/use-cases/list-payment.use-case';
import { GetPaymentUseCase } from '../application/use-cases/get-payment.use-case';
import { Payment, PaymentMethod } from '../domain/entities/payment.entity';
import { Result } from '../../../shared/result';

// Mock de UseCase
class MockCreatePaymentUseCase {
  async execute(dto: any): Promise<Result<Payment>> {
    // Simula un Payment aprobado
    const payment = new Payment(
      'mock-payment-id',
      dto.orderId,
      dto.method,
      'APPROVED',
      dto.amount,
      'mock-transaction-id'
    );
    return Result.ok(payment);
  }
}

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        { provide: CreatePaymentUseCase, useClass: MockCreatePaymentUseCase },
        { provide: ListPaymentUseCase, useValue: { execute: jest.fn() } },
        { provide: GetPaymentUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should create a payment for an existing order', async () => {
    const dto = {
      orderId: '7b541666-7af1-473e-b92c-ea1ccd1b7c82',
      amount: 250,
      method: 'CARD' as PaymentMethod,
      token: 'tok_test_123456789',
      customerEmail: 'cliente@example.com',
    };

    const result = await controller.create(dto);
    
    expect(result).toBeDefined();
    expect(result.getOrderId()).toBe(dto.orderId);
    expect(result.getAmount()).toBe(dto.amount);
    expect(result.getStatus()).toBe('APPROVED');
    expect(result.getTransactionId()).toBe('mock-transaction-id');
  });
});