import { Request, Response } from "express";
import { ExamRepository } from "../repository/exam/exam.repository";
import { PrismaClient } from "@prisma/client";
import s3 from "../service/aws-s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileRepository } from "../repository/file/file.repository";
import { URL } from "url";

const prisma = new PrismaClient();

export class ExamController {

	static async findByUserId(req: Request, res: Response) {
		const { id } = req.params;
		const result = await ExamRepository.findByUserId(id);
		return res.json({ result });
	}

	static async createExamWithFiles(req: Request, res: Response) {
		try {
			const { name, date, type, specialty, observations, userId } = req.body;
			const files = req.files as Express.Multer.File[];

			console.log('Files received:', files);

			if (!name || !date || !userId) {
				return res.status(400).json({
					message: 'Name, date e userId são obrigatórios'
				});
			}

 			// Criar o exame no banco
			const exam = await ExamRepository.create({
				name,
				date: new Date(date),
				type: type || null,
				specialty: specialty || null,
				observations: observations || '',
				user: { connect: { id: userId } }
			});

			// Se há arquivos, processar cada um
			const savedFiles = [];
			if (files && files.length > 0) {
				for (const file of files) {
					// O multer-s3 já fez o upload para o S3
					// Agora salvamos as informações no banco
					const savedFile = await FileRepository.create({
						filename: file.originalname,
						mimeType: file.mimetype,
						size: file.size,
						path: (file as any).key, // Chave do S3
						url: (file as any).location, // URL do S3
						exams: { connect: { id: exam.id } }
					});

					savedFiles.push(savedFile);
				}
			}

			// Buscar o exame criado com os arquivos
			const examWithFiles = await ExamRepository.findUnique(exam.id, userId);

			return res.status(201).json({
				message: 'Exame criado com sucesso',
				exam: examWithFiles
			});

		} catch (error) {
			console.error('Error creating exam:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	static async getUserExamsWithFiles(req: Request, res: Response) {
		try {

			const examName = req.query.name;
			let filterByName = null;

			if (examName) {
				filterByName = String(examName);
			}

			const { userId } = req.params;

			const exams = await ExamRepository.findMany({ userId, examName: filterByName });

			return res.json({
				message: 'Exames encontrados',
				exams
			});

		} catch (error) {
			console.error('Error fetching user exams:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	static async getExamById(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const headers = req.headers;
			const userId = headers['x-user-id'] as string;
			const exam = await ExamRepository.findUnique(id, userId);

			if (!exam) {
				return res.status(404).json({
					message: 'Exame não encontrado'
				});
			}

			return res.json({
				message: 'Exame encontrado',
				exam
			});

		} catch (error) {
			console.error('Error fetching exam by ID:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Gerar URLs de download dos arquivos
	static async getFileDownloadUrl(req: Request, res: Response) {
		try {
			const { fileId } = req.params;

			const file = await prisma.file.findUnique({
				where: { id: fileId }
			});

			if (!file || !file.path) {
				return res.status(404).json({
					message: 'Arquivo não encontrado'
				});
			}

			const bucketName = process.env.S3_BUCKET_NAME;
			if (!bucketName) {
				return res.status(500).json({
					message: 'Configuração do S3 não encontrada'
				});
			}

			const command = new GetObjectCommand({
				Bucket: bucketName,
				Key: file.path
			});

			const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

			return res.json({
				message: 'URL de download gerada',
				downloadUrl,
				filename: file.filename,
				mimeType: file.mimeType
			});

		} catch (error) {
			console.error('Error generating download URL:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	// Servir arquivo diretamente via backend
	static async getFileStream(req: Request, res: Response) {
		try {
			const { fileId } = req.params;
			
			// Verificar token (pode vir do header ou query)
			const token = req.headers.authorization?.replace('Bearer ', '') || req.query.token as string;
			
			if (!token) {
				return res.status(401).json({
					message: 'Token de autorização necessário'
				});
			}

			const file = await prisma.file.findUnique({
				where: { id: fileId }
			});

			if (!file || !file.path) {
				return res.status(404).json({
					message: 'Arquivo não encontrado'
				});
			}

			const bucketName = process.env.S3_BUCKET_NAME;
			if (!bucketName) {
				return res.status(500).json({
					message: 'Bucket S3 não configurado'
				});
			}

			const command = new GetObjectCommand({
				Bucket: bucketName,
				Key: file.path
			});

			const s3Response = await s3.send(command);

			if (!s3Response.Body) {
				return res.status(404).json({
					message: 'Arquivo não encontrado no S3'
				});
			}

			// Configurar headers apropriados
			res.setHeader('Content-Type', file.mimeType);
			res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
			res.setHeader('Cache-Control', 'public, max-age=3600');

			// Stream do arquivo
			const stream = s3Response.Body as any;
			
			if (stream && typeof stream.pipe === 'function') {
				// Para Node.js Readable stream
				stream.pipe(res);
			} else {
				// Para outros tipos de Body (como Uint8Array)
				const bodyContents = await s3Response.Body?.transformToByteArray();
				if (bodyContents) {
					res.send(Buffer.from(bodyContents));
				} else {
					return res.status(404).json({
						message: 'Conteúdo do arquivo não encontrado'
					});
				}
			}

		} catch (error) {
			console.error('Error streaming file:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	static async getFilterByExamName(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const { examName, orderBy } = req.query;

			if (typeof examName !== 'string') {
				return res.status(400).json({ message: 'examName query parameter is required and must be a string' });
			}

			const exams = await ExamRepository.filterByExamName(
				userId,
				examName,
				orderBy === 'desc' ? 'desc' : 'asc'
			);

			return res.json({
				message: 'Exames filtrados por nome',
				exams
			});
		} catch (error) {
			console.error('Error filtering exams by name:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	static async getFilterByExamType(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const { examType, orderBy } = req.query;

			if (typeof examType !== 'string') {
				return res.status(400).json({ message: 'examType query parameter is required and must be a string' });
			}

			const exams = await ExamRepository.filterByExamType(
				userId,
				examType as any,
				orderBy === 'desc' ? 'desc' : 'asc'
			);

			return res.json({
				message: 'Exames filtrados por tipo',
				exams
			});
		} catch (error) {
			console.error('Error filtering exams by type:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

	static async getFilterBySpecialty(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const { specialty, orderBy } = req.query;

			if (typeof specialty !== 'string') {
				return res.status(400).json({ message: 'specialty query parameter is required and must be a string' });
			}

			const exams = await ExamRepository.filterBySpecialty(
				userId,
				specialty as any,
				orderBy === 'desc' ? 'desc' : 'asc'
			);

			return res.json({
				message: 'Exames filtrados por especialidade',
				exams
			});
		} catch (error) {
			console.error('Error filtering exams by specialty:', error);
			return res.status(500).json({
				message: 'Erro interno do servidor',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}

}