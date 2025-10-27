import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './aws-s3';

// Multer específico para exames - aceita imagens e PDFs
const examUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: (() => {
      if (!process.env.S3_BUCKET_NAME) {
        throw new Error('S3_BUCKET_NAME environment variable is not defined');
      }
      return process.env.S3_BUCKET_NAME;
    })(),
    key: function (req, file, cb) {
      // Organizar por usuário e data
      const userId = (req as any).body?.userId || 'unknown';
      const timestamp = Date.now();
      const fileName = `exams/${userId}/${timestamp}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit para exames
  fileFilter: (req, file, cb) => {
    // Aceitar imagens, PDFs e alguns documentos
    console.log('🔧 examUpload fileFilter executado:', file.originalname, file.mimetype);

    const allowedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}. Tipos aceitos: imagens, PDFs, documentos de texto.`));
    }
  },
});

export default examUpload;