import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepositoryPort, PAYMENT_REPOSITORY } from '../ports/payment.repository.port';
import { Payment, PaymentMethod, PaymentStatus } from '../../domain/entities/payment.entity';
import { Result } from '../../../../shared/result';
import { WompiClient, WompiPaymentRequest } from '../../wompi-client';


export interface CreatePaymentDTO {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  token: string; // requerido para Wompi
  customerEmail: string;
}

@Injectable()
export class CreatePaymentUseCase {
  private wompiClient = new WompiClient();

  constructor(@Inject(PAYMENT_REPOSITORY) private readonly repo: PaymentRepositoryPort) {}

  async execute(dto: CreatePaymentDTO): Promise<Result<Payment>> {
    // Crear Payment localmente como PENDING
    const paymentOrError = Payment.create(dto.orderId, dto.method, dto.amount);
    if (paymentOrError.isFailure) return Result.fail(paymentOrError.error!);

    const payment = await this.repo.save(paymentOrError.getValue());

    // Preparar request para Wompi
    const request: WompiPaymentRequest = {
      amount_in_cents: Math.round(dto.amount * 100),
      currency: 'COP',
      payment_method: dto.method,
      source_id: dto.token,
      customer_email: dto.customerEmail,
    };

    try {
      // Llamar Wompi
      const response = await this.wompiClient.createPayment(request);

      // Actualizar Payment con status y transactionId
      let status: PaymentStatus;
      switch (response.data.status) {
        case 'APPROVED':
          status = 'APPROVED';
          break;
        case 'PENDING':
          status = 'PENDING';
          break;
        case 'DECLINED':
        case 'FAILED':
          status = 'REJECTED';
          break;
        default:
          status = 'FAILED';
      }

      payment.setStatus(status);
      payment.setTransactionId(response.data.id);

      // Guardar update en DB
      const updatedPayment = await this.repo.save(payment);

      return Result.ok(updatedPayment);

    } catch (error) {
      // Si falla la llamada Wompi, marcamos como FAILED
      payment.setStatus('FAILED');
      await this.repo.save(payment);
      return Result.fail('Payment processing failed');
    }
  }
}