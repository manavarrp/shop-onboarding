import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';


describe('Product E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /products', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Laptop',
        price: 2000,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Laptop');
  });

  it('GET /products', async () => {
    const res = await request(app.getHttpServer())
      .get('/products');

    expect(res.status).toBe(200);
  });
});