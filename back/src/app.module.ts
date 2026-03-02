import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/order.module';
import { Payment } from './modules/payments/domain/entities/payment.entity';
import { PaymentsModule } from './modules/payments/payment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Variables disponibles globalmente
    }),
    ProductsModule,
    OrdersModule,
    PaymentsModule,
  ],
})
export class AppModule {}