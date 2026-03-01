import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/generated/prisma/client';

@Injectable()
export class PrismaService {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
    });
  }

  get prisma(): PrismaClient {
    return this.client;
  }
}