import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { ProductRepositoryPort } from '../../application/ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.prisma.product.findMany();
    return products.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.prisma.product.findUnique({
      where: { id },
    });
    if (!product) return null;
    return ProductMapper.toDomain(product);
  }

  async save(product: Product): Promise<Product> {
    const id = product.getId();
    const data = ProductMapper.toPersistence(product);

    const saved = await this.prisma.prisma.product.upsert({
      where: { id },
      update: data,
      create: { ...data, id },
    });

    return ProductMapper.toDomain(saved);
  }
}