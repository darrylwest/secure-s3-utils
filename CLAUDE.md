# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A TypeScript CLI tool that provides a thin wrapper around the `secure-s3-store` library, offering DevOps engineers simple command-line access to encrypted S3 file operations.

## Architecture

```
CLI Layer (Commander.js)
    ↓
secure-s3-store library  
    ↓
AWS S3 + Encryption
```

Each CLI command is a thin wrapper that:
1. Parses command-line arguments with Commander.js
2. Maps arguments to `secure-s3-store` method calls
3. Handles output formatting (JSON, human-readable)
4. Manages error reporting and logging with Winston

## Core Commands to Implement

- `s3-utils put <local-file> <s3-path>` - Upload and encrypt file
- `s3-utils get <s3-path> [local-path]` - Download and decrypt file
- `s3-utils list [s3-path]` - List files in bucket/prefix
- `s3-utils delete <s3-path>` - Delete file from S3

## Required CLI Features

- Standard `--help` and `--version` flags
- `--json` for JSON output (scripting)
- `--verbose` for debugging
- `--quiet` for scripts
- Unix conventions (proper exit codes, argument patterns)

## Technology Stack

- **TypeScript** - Type safety and development experience
- **Commander.js** - CLI argument parsing and command structure
- **secure-s3-store** - All S3 and encryption logic
- **Winston** - Logging (configurable levels)
- **Jest + ts-jest** - Testing
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Dotenvx** - Environment file encryption/decryption

## Project Structure (to be created)

```
src/
  commands/          # Individual command implementations
  cli.ts            # Main CLI entry point
  types/            # TypeScript type definitions
  utils/            # Shared utilities
tests/              # Jest test files
```

## Implementation Notes

- Each command should be a separate module in `src/commands/`
- All S3 operations, encryption, and AWS auth are handled by `secure-s3-store`
- Focus on CLI argument parsing, output formatting, and error handling
- Follow Unix conventions for exit codes and error messages
- Support both interactive and scripted environments