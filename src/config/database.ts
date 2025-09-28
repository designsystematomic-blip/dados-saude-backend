import { PrismaClient } from "../generated/prisma";

function databaseConnection() {
  const prisma = new PrismaClient();

  return prisma;
}

export default databaseConnection;
