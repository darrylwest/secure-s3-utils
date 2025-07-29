import { S3Config } from '../types/index.js';

export const getS3Config = (): S3Config => {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.AWS_REGION || 'sfo3';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const keys: { [kid: string]: string } = {};
  if (process.env.KEY_V1) keys.v1 = process.env.KEY_V1;
  if (process.env.KEY_V2) keys.v2 = process.env.KEY_V2;
  if (process.env.KEY_V3) keys.v3 = process.env.KEY_V3;

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
