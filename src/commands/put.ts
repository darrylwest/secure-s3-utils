import { Command } from 'commander';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { CLIOptions } from '../types/index.js';
import { createLogger } from '../utils/logger.js';
import { createS3Store } from '../utils/s3-store.js';
import { getS3Config } from '../utils/config.js';

export const putCommand = new Command('put')
  .description('Upload and encrypt file to S3')
  .argument('<local-file>', 'local file to upload')
  .argument('<s3-path>', 'S3 destination path')
  .action(async (localFile: string, s3Path: string, options: CLIOptions, command: Command) => {
    const parentOptions = command.parent?.opts() || {};
    const allOptions = { ...options, ...parentOptions };
    const logger = createLogger(allOptions.verbose, allOptions.quiet);

    try {
      // Validate local file exists
      if (!existsSync(localFile)) {
        throw new Error(`Local file not found: ${localFile}`);
      }

      logger.info(`Uploading ${localFile} to ${s3Path}`);

      // Read file content
      const fileContent = await readFile(localFile);

      // Get S3 configuration
      const config = getS3Config();
      const store = createS3Store(allOptions.verbose, allOptions.quiet);

      // Build full S3 path with bucket
      const fullS3Path = `${config.bucket}/${s3Path}`;

      // Upload encrypted file
      await store.put(fullS3Path, fileContent);

      logger.info(`Successfully uploaded ${localFile} to ${fullS3Path}`);

      if (allOptions.json) {
        console.log(
          JSON.stringify({
            status: 'success',
            localFile,
            s3Path: fullS3Path,
            size: fileContent.length,
          })
        );
      } else {
        console.log(`✓ Uploaded ${localFile} to ${fullS3Path} (${fileContent.length} bytes)`);
      }
    } catch (error) {
      logger.error(`Put command failed: ${error}`);

      if (allOptions.json) {
        console.log(
          JSON.stringify({
            status: 'error',
            error: error instanceof Error ? error.message : String(error),
          })
        );
      }

      process.exit(1);
    }
  });
