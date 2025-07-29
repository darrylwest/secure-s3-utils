#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { putCommand } from './commands/put.js';
import { getCommand } from './commands/get.js';
import { listCommand } from './commands/list.js';
import { deleteCommand } from './commands/delete.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf8')
);

const program = new Command();

program
  .name('s3-utils')
  .description('CLI wrapper for secure-s3-store - encrypted S3 file operations')
  .version(packageJson.version);

program
  .option('-j, --json', 'output in JSON format')
  .option('-v, --verbose', 'verbose output')
  .option('-q, --quiet', 'quiet mode');

program.addCommand(putCommand);
program.addCommand(getCommand);
program.addCommand(listCommand);
program.addCommand(deleteCommand);

program.parse();