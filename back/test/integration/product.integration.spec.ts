import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/shared/infrastructure/prisma/prisma.service';
import { PrismaProductRepository } from '../../src/modules/products/infrastructure/adapters/prisma-product.repository';
import { Product } from '../../src/modules/products/domain/entities/product.entity';

describe('Product Integration', () => {
  let prisma: PrismaService;
  let repository: PrismaProductRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PrismaProductRepository],
    }).compile();

    prisma = module.get(PrismaService);
    repository = module.get(PrismaProductRepository);
  });

  beforeEach(async () => {
    await prisma.prisma.product.deleteMany();
  });

  it('should persist product in database', async () => {
    const result = Product.create('Laptop', 2000);
    const product = result.getValue();

    const saved = await repository.save(product);

    expect(saved.getName()).toBe('Laptop');

    const dbProducts = await prisma.prisma.product.findMany();
    expect(dbProducts.length).toBe(1);
  });
});