export interface CLIOptions {
  json?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

export interface S3Config {
  bucket: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  encryptionKey?: string;
}
