# S3 Utils

```
 _______ ______        _______ __   __ __        
|     __|__    |______|   |   |  |_|__|  |.-----.
|__     |__    |______|   |   |   _|  |  ||__ --|
|_______|______|      |_______|____|__|__||_____|
                                                 
```

A TypeScript CLI tool that provides a thin wrapper around the `secure-s3-store` library, offering DevOps engineers simple command-line access to encrypted S3 file operations.

## Features

- 🔐 **Automatic encryption/decryption** using AES-256-GCM
- 🔑 **Key rotation support** with multiple encryption keys
- 🌐 **S3-compatible storage** (AWS S3, DigitalOcean Spaces, etc.)
- 📋 **Multiple output formats** (human-readable, JSON)
- 🔧 **DevOps-friendly** with proper exit codes and error handling
- 📝 **Comprehensive logging** with verbose and quiet modes

## Installation

```bash
npm install
npm run build
```

## Configuration

Set up your environment variables (using dotenvx for encrypted storage):

```bash
S3_ENDPOINT=https://sfo3.digitaloceanspaces.com  # Your S3-compatible endpoint
S3_BUCKET=your-bucket-name                       # Target bucket
AWS_REGION=sfo3                                  # Region (default: sfo3)
AWS_ACCESS_KEY_ID=your-access-key               # Access credentials
AWS_SECRET_ACCESS_KEY=your-secret-key           # Secret credentials

# Encryption keys (supports rotation)
KEY_V1=your-encryption-key-v1                   # Primary encryption key
KEY_V2=your-encryption-key-v2                   # Optional: Previous key
KEY_V3=your-encryption-key-v3                   # Optional: Rollback key
PRIMARY_KEY=v1                                   # Which key to use for new encryptions
```

## Usage

### Global Options

- `--json` - Output results in JSON format (perfect for scripting)
- `--verbose` - Enable verbose logging for debugging
- `--quiet` - Minimize output (errors only)
- `--help` - Show help information
- `--version` - Display version number

### Commands

#### Upload a file to S3
```bash
s3-utils put <local-file> <s3-path>

# Examples
s3-utils put ./document.pdf documents/document.pdf
s3-utils --json put ./data.csv backups/data-2025.csv
```

#### Download a file from S3
```bash
s3-utils get <s3-path> [local-path]

# Examples  
s3-utils get documents/document.pdf ./downloaded.pdf
s3-utils get backups/data.csv  # Downloads to 'data.csv'
s3-utils --json get documents/report.docx ./report.docx
```

#### List files in S3
```bash
s3-utils list [s3-path-prefix]

# Examples
s3-utils list                    # List all files
s3-utils list documents/         # List files in documents/ folder
s3-utils --json list backups/    # JSON output for scripting
```

#### Delete a file from S3
```bash
s3-utils delete <s3-path>

# Examples
s3-utils delete documents/old-file.pdf
s3-utils --json delete backups/expired-data.csv
```

### Development Scripts

```bash
# Build and test
npm run build                    # Compile TypeScript
npm run test                     # Run all tests
npm run test:unit               # Unit tests only
npm run test:int                # Integration tests only  
npm run test:cov                # Tests with coverage

# Code quality
npm run lint                    # Check code style
npm run lint:fix               # Fix linting issues
npm run format                 # Format code with Prettier

# Quick CLI access
npm run put -- file.txt s3/path.txt     # Quick put
npm run get -- s3/path.txt file.txt     # Quick get
npm run list -- folder/                 # Quick list
```

## Architecture

```
CLI Layer (Commander.js)
    ↓
secure-s3-store library  
    ↓
AWS S3 + AES-256-GCM Encryption
```

Each CLI command:
1. Parses arguments with Commander.js
2. Validates environment configuration  
3. Creates secure-s3-store instance
4. Performs encrypted S3 operations
5. Formats output (human/JSON)
6. Handles errors with proper exit codes

## Key Rotation

The CLI supports seamless key rotation:

1. **Add new key**: Set `KEY_V2=new-encryption-key`
2. **Update primary**: Set `PRIMARY_KEY=v2` 
3. **New uploads**: Encrypted with v2
4. **Existing files**: Still readable with v1
5. **Gradual migration**: Re-upload files to use new key

## Error Handling

- **Exit code 0**: Success
- **Exit code 1**: Command failed (file not found, permission denied, etc.)
- **JSON mode**: Errors returned as `{"status": "error", "error": "message"}`
- **Verbose logging**: Detailed operation information
- **Quiet mode**: Only critical errors shown

## Testing

Comprehensive test suite with 39 tests:

- **Unit tests**: Configuration, logging, utilities
- **Integration tests**: Real S3 operations end-to-end
- **CLI tests**: Actual command execution with process spawning
- **Coverage**: All major functionality validated

```bash
npm test              # All tests
npm run test:int      # Real S3 integration tests (requires .env)
npm run test:cov      # Coverage report
```

## Security

- Files encrypted with AES-256-GCM before upload
- Encryption keys never transmitted or logged
- Supports multiple keys for rotation
- Compatible with secure-s3-store security model

## References

- [secure-s3-store](https://github.com/darrylwest/secure-s3-store) - Core encryption library
- [dotenvx](https://github.com/dotenvx/dotenvx) - Environment file encryption
- [Commander.js](https://github.com/tj/commander.js) - CLI framework

###### dpw | 2025.07.29
