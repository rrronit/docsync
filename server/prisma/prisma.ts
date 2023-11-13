import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | undefined;

if (process.env.NODE_ENV !== 'production' && !prismaInstance) {
  prismaInstance = new PrismaClient();
}

const prisma = prismaInstance || new PrismaClient();

export default prisma;
