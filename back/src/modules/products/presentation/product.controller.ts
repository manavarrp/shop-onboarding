import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { GetProductUseCase } from '../application/use-cases/get-product.use-case';
import { CreateProductDTO } from '../application/dto/create-product.dto';
import { Product } from '../domain/entities/product.entity';
import { ListProductUseCase } from '../application/use-cases/list-product.use-case';

@Controller('products')
export class ProductController {

    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly listProductsUseCase: ListProductUseCase,
        private readonly getProductUseCase: GetProductUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CreateProductDTO) {
        const product = await this.createProductUseCase.execute(dto);
        return this.map(product.getValue());
    }


    @Get()
    async findAll() {
        const result = await this.listProductsUseCase.execute();

        if (result.isFailure) {
            throw new Error(result.error);
        }

        return result.getValue().map(p => this.map(p));
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const product = await this.getProductUseCase.execute(Number(id));
        return this.map(product.getValue());
    }

    private map(product: Product) {
        return {
            id: product.getId(),
            name: product.getName(),
            description: product.getDescription(),
            price: product.getPrice(),
            createdAt: product.getCreatedAt(),
            updatedAt: product.getUpdatedAt(),
        };
    }
}