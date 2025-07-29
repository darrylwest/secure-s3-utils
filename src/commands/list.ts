import { Command } from 'commander';
import { CLIOptions } from '../types/index.js';
import { createLogger } from '../utils/logger.js';
import { createS3Store } from '../utils/s3-store.js';
import { getS3Config } from '../utils/config.js';

export const listCommand = new Command('list')
  .description('List files in S3 bucket/prefix')
  .argument('[s3-path]', 'S3 path/prefix to list (optional)')
  .action(async (s3Path: string | undefined, options: CLIOptions) => {
    const logger = createLogger(options.verbose, options.quiet);

    try {
      // Get S3 configuration
      const config = getS3Config();
      const store = createS3Store(options.verbose);
      
      // Build full S3 path with bucket
      const prefix = s3Path ? `${config.bucket}/${s3Path}` : `${config.bucket}/`;
      
      logger.info(`Listing files with prefix: ${prefix}`);
      
      // List files using secure-s3-store
      const files = await store.list(prefix);
      
      logger.info(`Found ${files.length} files`);

      if (options.json) {
        console.log(JSON.stringify({
          status: 'success',
          prefix,
          count: files.length,
          files: files,
        }));
      } else {
        if (files.length === 0) {
          console.log(`No files found with prefix: ${prefix}`);
        } else {
          console.log(`Found ${files.length} files:`);
          files.forEach(file => {
            // Remove bucket prefix for cleaner display
            const cleanPath = file.startsWith(config.bucket + '/') 
              ? file.substring(config.bucket.length + 1)
              : file;
            console.log(`  ${cleanPath}`);
          });
        }
      }
    } catch (error) {
      logger.error(`List command failed: ${error}`);
      
      if (options.json) {
        console.log(JSON.stringify({
          status: 'error',
          error: error instanceof Error ? error.message : String(error),
        }));
      }
      
      process.exit(1);
    }
  });
