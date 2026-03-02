import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/order.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Variables disponibles globalmente
    }),
    ProductsModule,
    OrdersModule, // <-- agregar aquí
  ],
})
export class AppModule {}