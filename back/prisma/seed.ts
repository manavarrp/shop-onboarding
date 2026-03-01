import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import { Prisma } from "./generated/prisma/browser";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const userProducts: Prisma.ProductCreateInput[] = [
    {
        name: "Product 1",
        description: "Description for product 1",
        price: 10,
    },
    {
        name: "Product 2",
        description: "Description for product 2",
        price: 20,
    },
    {
        name: "Product 3",
        description: "Description for product 3",
        price: 30,
    }
]

export async function main() {
    for (const product of userProducts) {
        await prisma.product.create({
            data: product
        });
    }
}

main()