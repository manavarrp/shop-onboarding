import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { ProductRepositoryPort } from '../../application/ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepositoryPort {

    constructor(private readonly prisma: PrismaService) { }

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.prisma.product.findMany();
        return products.map(ProductMapper.toDomain);
    }

    async findById(id: number): Promise<Product | null> {
        const product = await this.prisma.prisma.product.findUnique({
            where: { id },
        });

        if (!product) return null;

        return ProductMapper.toDomain(product);
    }

    async save(product: Product): Promise<Product> {
        const id = product.getId();

        if (!id) {
            const created = await this.prisma.prisma.product.create({
                data: ProductMapper.toPersistence(product),
            });

            return ProductMapper.toDomain(created);
        }

        const updated = await this.prisma.prisma.product.update({
            where: { id }, 
            data: ProductMapper.toPersistence(product),
        });

        return ProductMapper.toDomain(updated);
    }
}