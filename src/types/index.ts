export interface CLIOptions {
  json?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

export interface S3Config {
  keys: { [kid: string]: string };
  primaryKey: string;
  endpoint?: string;
  bucket: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}
