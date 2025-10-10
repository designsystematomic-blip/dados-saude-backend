import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserRepository {
  static async createUser(user: Prisma.UserCreateInput) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const createdUser = await prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          cpf: user.cpf,
          name: user.name,
          sex: user.sex,
          socialName: user.socialName,
          birthDate: user.birthDate,
          phone: user.phone,
          bloodType: user.bloodType,
        },
      });

      return createdUser;
    } catch (err) {
      console.error("❌ Erro no Prisma:", err);
      throw err; // lança de volta pro controller capturar
    }
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async getAllUsers() {
    return prisma.user.findMany();
  }
}
