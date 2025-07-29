import { S3Config } from '../types';

export const getS3Config = (): S3Config => {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.AWS_REGION || 'us-east-1';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const encryptionKey = process.env.ENCRYPTION_KEY;

  if (!bucket) {
    throw new Error('S3_BUCKET environment variable is required');
  }

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are required');
  }

  if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }

  return {
    bucket,
    region,
    accessKeyId,
    secretAccessKey,
    encryptionKey,
  };
};