import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  forcePathStyle: true,
  endpoint: process.env.S3_ENDPOINT_URL || 'https://s3.amazonaws.com', // Use LocalStack or default AWS S3
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'default_access_key', // Default for development
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'default_secret_key',
  },
});

export default s3;