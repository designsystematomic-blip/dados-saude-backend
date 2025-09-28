import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class UserService {
  static async createUser(email: string, password: string, name?: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, password: hashedPassword, name },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async getAllUsers() {
    return prisma.user.findMany();
  }
}
