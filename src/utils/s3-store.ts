import { SecureS3Store } from 'secure-s3-store';
import { getS3Config } from './config.js';
import { createLogger } from './logger.js';

export const createS3Store = (verbose: boolean = false, quiet: boolean = false): SecureS3Store => {
  const config = getS3Config();
  const logger = createLogger(verbose, quiet);

  return new SecureS3Store({
    keys: config.keys,
    primaryKey: config.primaryKey,
    s3Config: {
      endpoint: config.endpoint,
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId!,
        secretAccessKey: config.secretAccessKey!,
      },
    },
    logger,
  });
};
