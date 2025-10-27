import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FileRepository {

	static async create(data: Prisma.FileCreateInput) {
		return prisma.file.create({ data });
	}

	static async findByExamId(examId: string) {
		return prisma.file.findMany({ where: { 
			examId
		}});
	}

}
