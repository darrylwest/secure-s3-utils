#!/usr/bin/env node

import { Command } from 'commander';
import { putCommand } from './commands/put';
import { getCommand } from './commands/get';
import { listCommand } from './commands/list';
import { deleteCommand } from './commands/delete';

const program = new Command();

program
  .name('s3-utils')
  .description('CLI wrapper for secure-s3-store - encrypted S3 file operations')
  .version('0.1.0');

program
  .option('-j, --json', 'output in JSON format')
  .option('-v, --verbose', 'verbose output')
  .option('-q, --quiet', 'quiet mode');

program.addCommand(putCommand);
program.addCommand(getCommand);
program.addCommand(listCommand);
program.addCommand(deleteCommand);

program.parse();