import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateOrderUseCase } from '../application/use-cases/create-order.use-case';
import { GetOrderUseCase } from '../application/use-cases/get-order.use-case';
import { ListOrderUseCase } from '../application/use-cases/list-order.use-case';
import { CreateOrderDTO } from '../application/use-cases/create-order.use-case';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrder: CreateOrderUseCase,
    private readonly getOrder: GetOrderUseCase,
    private readonly listOrders: ListOrderUseCase,  // <--- inyectado
  ) {}

  @Post()
  async create(@Body() dto: CreateOrderDTO) {
    const result = await this.createOrder.execute(dto);
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getOrder.execute(id);
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }

  @Get()
  async findAll() {
    const result = await this.listOrders.execute();
    if (result.isFailure) throw new Error(result.error);
    return result.getValue();
  }
}