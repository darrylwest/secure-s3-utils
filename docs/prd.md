# PRD: `s3-utils` NPM Package

## 1. Overview

A CLI wrapper around the `secure-s3-store` library, providing DevOps engineers with simple command-line access to encrypted S3 file operations.

### 1.1 Project Goal

Create a thin CLI interface that exposes `secure-s3-store` functionality through intuitive commands, eliminating the need for DevOps engineers to write custom scripts for secure S3 operations.

### 1.2 Problem Statement

DevOps engineers need command-line access to `secure-s3-store` functionality but don't want to write custom Node.js scripts for basic file operations. They need a simple CLI tool that works like standard Unix utilities.

### 1.3 Target Audience

DevOps engineers managing cloud infrastructure on Linux-based systems (Ubuntu, macOS, etc.)

## 2. Functional Requirements

### 2.1 Core Commands

The CLI will expose these `secure-s3-store` operations:

- **`s3-utils put <local-file> <s3-path>`** - Upload and encrypt file
- **`s3-utils get <s3-path> [local-path]`** - Download and decrypt file  
- **`s3-utils list [s3-path]`** - List files in bucket/prefix
- **`s3-utils delete <s3-path>`** - Delete file from S3

### 2.2 Configuration

- Support standard `secure-s3-store` configuration methods
- Environment variables for CI/CD integration
- Configuration file support for local development
- Pass-through of all library configuration options

### 2.3 CLI Features

- Standard `--help` and `--version` flags
- JSON output option (`--json`) for scripting
- Verbose mode (`--verbose`) for debugging
- Quiet mode (`--quiet`) for scripts

## 3. Technical Implementation

### 3.1 Architecture

```
CLI Layer (thin)
    ↓
secure-s3-store library
    ↓  
AWS S3 + Encryption
```

### 3.2 Technology Stack

- **TypeScript** - Type safety and development experience
- **Commander.js** - CLI argument parsing and command structure
- **secure-s3-store** - All S3 and encryption logic
- **Winston** - Logging (configurable levels)
- **Jest + ts-jest** - Testing
- **ESLint + Prettier** - Code quality
- **Prettier** - Code view consitancy
- **Dotenvx** - to encrypt/decrypt .env files
- **Bun** (optional) - Standalone executable generation

### 3.3 Implementation Approach

Each CLI command will be a thin wrapper that:

1. Parses command-line arguments
2. Maps arguments to `secure-s3-store` method calls
3. Handles output formatting (JSON, human-readable)
4. Manages error reporting and logging

## 4. Success Criteria

- [ ] All four commands successfully invoke corresponding `secure-s3-store` methods
- [ ] CLI follows Unix conventions (exit codes, argument patterns)
- [ ] Error messages are clear and actionable
- [ ] Works in both interactive and scripted environments
- [ ] Package installs and runs on target platforms
- [ ] Basic test coverage for CLI argument parsing and error handling

## 5. Implementation Plan

**Week 1:** Basic CLI structure, `put` and `get` commands
**Week 2:** `list` and `delete` commands, error handling
**Week 3:** Testing, documentation, (optional) NPM packaging

## 6. Out of Scope

- Encryption/decryption logic (handled by `secure-s3-store`)
- AWS authentication (handled by `secure-s3-store`)
- S3 operations (handled by `secure-s3-store`)
- Key management (handled by `secure-s3-store`)
- Complex configuration management beyond what the library provides
