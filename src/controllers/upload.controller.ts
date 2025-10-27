import { Request, Response } from "express";
import s3 from "../service/aws-s3";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class UploadController {
    static async uploadFile(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Return the S3 file URL
        res.json({
            message: 'File uploaded successfully',
            fileUrl: (req.file as any).location, // A URL do arquivo enviado no S3
        });
    }

    static async getPresignedUrl(bucket: string, key: string | undefined): Promise<string | null> {
        try {
            if (!key) {
                throw new Error('Object key is undefined');
            }
            
            const command = new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            });

            // const url = await getSignedUrl(s3, command, { 
						// 	expiresIn: 3600 // expira em 1 hora
						// });
						// to never expires
						const url = await getSignedUrl(s3, command);
            return url;
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            return null;
        }
    }

    static async getListFiles(req: Request, res: Response) {
        try {
            const bucketName = process.env.S3_BUCKET_NAME;
            if (!bucketName) {
                return res.status(500).send('S3_BUCKET_NAME environment variable is not defined');
            }

            const command = new ListObjectsV2Command({
                Bucket: bucketName,
            });

            const files = await s3.send(command);
            
            if (!files.Contents) {
                return res.json({
                    message: 'No files found',
                    files: [],
                });
            }

            const filesWithUrls = await Promise.all(
                files.Contents.map(async (file) => {
                    const url = await UploadController.getPresignedUrl(bucketName, file.Key);
                    return {
                        name: file.Key,
                        url: url,
                    };
                })
            );

            const validFiles = filesWithUrls.filter(file => file.url !== null);

            return res.status(200).json({
                message: 'Files retrieved successfully',
                files: validFiles
            });
        } catch (error) {
            console.error('Error listing files:', error);
            return res.status(500).json({
                message: 'Error retrieving files',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

}
