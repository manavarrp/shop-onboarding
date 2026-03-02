import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreatePaymentUseCase } from '../application/use-cases/create-payment.use-case';
import { GetPaymentUseCase } from '../application/use-cases/get-payment.use-case';
import { ListPaymentUseCase } from '../application/use-cases/list-payment.use-case';
import { CreatePaymentDTO } from '../application/use-cases/create-payment.use-case';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPayment: CreatePaymentUseCase,
    private readonly getPayment: GetPaymentUseCase,
    private readonly listPayments: ListPaymentUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreatePaymentDTO) {
    const result = await this.createPayment.execute(dto);
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getPayment.execute(id);
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }

  @Get()
  async findAll() {
    const result = await this.listPayments.execute();
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }
}