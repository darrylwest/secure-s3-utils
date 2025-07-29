import { Command } from 'commander';
import { CLIOptions } from '../types/index.js';
import { createLogger } from '../utils/logger.js';
import { createS3Store } from '../utils/s3-store.js';
import { getS3Config } from '../utils/config.js';

export const deleteCommand = new Command('delete')
  .description('Delete file from S3')
  .argument('<s3-path>', 'S3 file path to delete')
  .option('-f, --force', 'skip confirmation prompt')
  .action(async (s3Path: string, options: CLIOptions & { force?: boolean }) => {
    const logger = createLogger(options.verbose, options.quiet);

    try {
      // Get S3 configuration
      const config = getS3Config();
      const store = createS3Store(options.verbose);
      
      // Build full S3 path with bucket
      const fullS3Path = `${config.bucket}/${s3Path}`;
      
      logger.info(`Deleting file: ${fullS3Path}`);

      // First, check if file exists by attempting to get it
      try {
        await store.get(fullS3Path);
      } catch (error) {
        if (error instanceof Error && error.name === 'NotFoundError') {
          throw new Error(`File not found: ${fullS3Path}`);
        }
        throw error; // Re-throw other errors
      }

      // Delete the file using secure-s3-store
      await store.delete(fullS3Path);

      logger.info(`Successfully deleted ${fullS3Path}`);

      if (options.json) {
        console.log(JSON.stringify({
          status: 'success',
          s3Path: fullS3Path,
          deleted: true,
        }));
      } else {
        console.log(`✓ Deleted ${fullS3Path}`);
      }
    } catch (error) {
      logger.error(`Delete command failed: ${error}`);
      
      if (options.json) {
        console.log(JSON.stringify({
          status: 'error',
          error: error instanceof Error ? error.message : String(error),
        }));
      }
      
      process.exit(1);
    }
  });
