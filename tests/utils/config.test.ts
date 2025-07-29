import { describe, it, expect, beforeEach, afterAll, jest } from '@jest/globals';
import { getS3Config } from '../../src/utils/config';

describe('getS3Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    // Clear all environment variables that might affect config
    delete process.env.S3_ENDPOINT;
    delete process.env.S3_BUCKET;
    delete process.env.AWS_REGION;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.KEY_V1;
    delete process.env.KEY_V2;
    delete process.env.KEY_V3;
    delete process.env.PRIMARY_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return valid config when all required environment variables are set', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';
    process.env.PRIMARY_KEY = 'v1';

    const config = getS3Config();

    expect(config).toEqual({
      keys: { v1: 'test-key-v1' },
      primaryKey: 'v1',
      endpoint: 'https://test.endpoint.com',
      bucket: 'test-bucket',
      region: 'sfo3',
      accessKeyId: 'test-access-key',
      secretAccessKey: 'test-secret-key',
    });
  });

  it('should use custom region when AWS_REGION is set', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_REGION = 'us-west-2';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';

    const config = getS3Config();
    expect(config.region).toBe('us-west-2');
  });

  it('should collect multiple keys', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';
    process.env.KEY_V2 = 'test-key-v2';
    process.env.KEY_V3 = 'test-key-v3';

    const config = getS3Config();
    expect(config.keys).toEqual({
      v1: 'test-key-v1',
      v2: 'test-key-v2',
      v3: 'test-key-v3',
    });
  });

  it('should throw error when S3_ENDPOINT is missing', () => {
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';

    expect(() => getS3Config()).toThrow('S3_ENDPOINT environment variable is required');
  });

  it('should throw error when S3_BUCKET is missing', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';

    expect(() => getS3Config()).toThrow('S3_BUCKET environment variable is required');
  });

  it('should throw error when AWS credentials are missing', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.KEY_V1 = 'test-key-v1';

    expect(() => getS3Config()).toThrow('AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables are required');
  });

  it('should throw error when no encryption keys are provided', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';

    expect(() => getS3Config()).toThrow('At least one encryption key (KEY_V1, KEY_V2, or KEY_V3) must be provided');
  });

  it('should throw error when PRIMARY_KEY does not exist in available keys', () => {
    process.env.S3_ENDPOINT = 'https://test.endpoint.com';
    process.env.S3_BUCKET = 'test-bucket';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.KEY_V1 = 'test-key-v1';
    process.env.PRIMARY_KEY = 'v2';

    expect(() => getS3Config()).toThrow("PRIMARY_KEY 'v2' must exist in available keys (v1)");
  });
});