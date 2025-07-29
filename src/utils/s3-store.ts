import { SecureS3Store } from 'secure-s3-store';
import { getS3Config } from './config.js';
import { createLogger } from './logger.js';

export const createS3Store = (verbose: boolean = false): SecureS3Store => {
  const config = getS3Config();
  const logger = createLogger(verbose);

  const storeConfig = {
    keys: {
      primary: config.encryptionKey!,
    },
    primaryKey: 'primary',
    s3Config: {
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId!,
        secretAccessKey: config.secretAccessKey!,
      },
    },
    logger,
  };

  return new SecureS3Store(storeConfig);
};