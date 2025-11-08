import { Prisma, PrismaClient, ExamType, Specialty } from "@prisma/client";

const prisma = new PrismaClient();
export class ExamRepository {

	static async create(data: Prisma.ExamCreateInput) {
		return await prisma.exam.create({ data });
	}

	static async createMany(data: Prisma.ExamCreateManyInput[]) {
		return await prisma.exam.createMany({ data });
	}

	static async findByUserId(id: string) {
    return await prisma.exam.findMany({ 
			where: { 
				userId: id
			},
			include: {
				file: true
			},
			orderBy: {
				date: 'asc'
			}
		});
  }

	static async findUnique(id: string, userId: string) {
		return await prisma.exam.findUnique({ 
			where: { id: id, userId: userId },
				include: {
					file: true,
					user: {
						select: {
							id: true,
							name: true,
							email: true
						}
					}
				}
		});
	}

	static async findMany({ userId, examName }: { userId: string, examName: string | null | undefined }) {
		
		const whereParms = {
			userId,
		}

		if (examName) {
			Object.assign(whereParms, {
				name: {
					contains: examName,
					mode: 'insensitive'
				}
			});
		}

		return await prisma.exam.findMany({
			where: whereParms,
			include: {
				file: true
			},
			orderBy: {
				date: 'desc'
			}
		});
	}

	static async filterByExamName(userId: string, examName: string, orderBy: 'asc' | 'desc' = 'asc') {
		return await prisma.exam.findMany({
			where: {
				userId,
				name: {
					contains: examName,
					mode: 'insensitive'
				}
			},
			// include: {
			// 	file: true
			// },
			orderBy: {
				date: orderBy
			}
		});
	}

	static async filterByExamType(userId: string, examType: ExamType, orderBy: 'asc' | 'desc' = 'asc') {
		return await prisma.exam.findMany({
			where: {
				userId,
				type: examType
			},
			include: {
				file: true
			},
			orderBy: {
				date: orderBy
			}
		});
	}

	static async filterBySpecialty(userId: string, specialty: Specialty, orderBy: 'asc' | 'desc' = 'asc') {
		return await prisma.exam.findMany({
			where: {
				userId,
				specialty
			},
			include: {
				file: true
			},
			orderBy: {
				date: orderBy
			}
		});
	}

}