import { PrismaClient } from "@prisma/client";

function databaseConnection() {
  const prisma = new PrismaClient();

  return prisma;
}

export default databaseConnection;
