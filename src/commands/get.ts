import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { CLIOptions } from '../types';
import { createLogger } from '../utils/logger';
import { createS3Store } from '../utils/s3-store';
import { getS3Config } from '../utils/config';

export const getCommand = new Command('get')
  .description('Download and decrypt file from S3')
  .argument('<s3-path>', 'S3 source path')
  .argument('[local-path]', 'local destination path (optional)')
  .action(async (s3Path: string, localPath: string | undefined, options: CLIOptions) => {
    const logger = createLogger(options.verbose, options.quiet);

    try {
      const destination = localPath || s3Path.split('/').pop() || 'downloaded-file';
      logger.info(`Downloading ${s3Path} to ${destination}`);

      // Get S3 configuration
      const config = getS3Config();
      const store = createS3Store(options.verbose);
      
      // Build full S3 path with bucket
      const fullS3Path = `${config.bucket}/${s3Path}`;
      
      // Download and decrypt file
      const fileContent = await store.get(fullS3Path);
      
      if (!fileContent) {
        throw new Error(`File not found: ${fullS3Path}`);
      }

      // Write file to local destination
      await writeFile(destination, fileContent);

      logger.info(`Successfully downloaded ${fullS3Path} to ${destination}`);

      if (options.json) {
        console.log(JSON.stringify({
          status: 'success',
          s3Path: fullS3Path,
          localPath: destination,
          size: fileContent.length,
        }));
      } else {
        console.log(`✓ Downloaded ${fullS3Path} to ${destination} (${fileContent.length} bytes)`);
      }
    } catch (error) {
      logger.error(`Get command failed: ${error}`);
      
      if (options.json) {
        console.log(JSON.stringify({
          status: 'error',
          error: error instanceof Error ? error.message : String(error),
        }));
      }
      
      process.exit(1);
    }
  });
