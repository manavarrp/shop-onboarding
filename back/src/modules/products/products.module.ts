import { Module } from '@nestjs/common';
import { ProductController } from './presentation/product.controller';
import { PrismaService } from 'src/shared/infrastructure/prisma/prisma.service';
import { ListProductUseCase } from './application/use-cases/list-product.use-case';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.port';
import { PrismaProductRepository } from './infrastructure/adapters/prisma-product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { GetProductUseCase } from './application/use-cases/get-product.use-case';


@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    ListProductUseCase,
    GetProductUseCase,
    { provide: PRODUCT_REPOSITORY, useClass: PrismaProductRepository },
  ],
})
export class ProductsModule {}