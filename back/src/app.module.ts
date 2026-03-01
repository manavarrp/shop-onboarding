import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Las variables estarán disponibles en todo el proyecto
    }),
    ProductsModule,
  ],
})
export class AppModule {}