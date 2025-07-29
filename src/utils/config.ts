import { S3Config } from '../types/index.js';

export const getS3Config = (): S3Config => {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const region = process.env.AWS_REGION || 'sfo3';
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const keys: { [kid: string]: string } = {};
  if (process.env.KEY_V1) keys.v1 = process.env.KEY_V1;
  if (process.env.KEY_V2) keys.v2 = process.env.KEY_V2;
  if (process.env.KEY_V3) keys.v3 = process.env.KEY_V3;

  const primaryKey = process.env.PRIMARY_KEY || 'v1';

  if (!endpoint) {
    throw new Error('S3_ENDPOINT environment variable is required');
  }

  if (!bucket) {
    throw new Error('S3_BUCKET environment variable is required');
  }

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are required'
    );
  }

  if (!primaryKey) {
    throw new Error('PRIMARY_KEY environment variable is required (current key)');
  }

  if (Object.keys(keys).length === 0) {
    throw new Error('At least one encryption key (KEY_V1, KEY_V2, or KEY_V3) must be provided');
  }

  if (!keys[primaryKey]) {
    throw new Error(
      `PRIMARY_KEY '${primaryKey}' must exist in available keys (${Object.keys(keys).join(', ')})`
    );
  }

  return {
    keys,
    primaryKey,
    endpoint,
    bucket,
    region,
    accessKeyId,
    secretAccessKey,
  };
};
