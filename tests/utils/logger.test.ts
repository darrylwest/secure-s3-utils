import { describe, it, expect } from '@jest/globals';
import { createLogger } from '../../src/utils/logger';
import winston from 'winston';

describe('createLogger', () => {

  it('should create logger with info level by default', () => {
    const logger = createLogger();
    expect(logger.level).toBe('info');
  });

  it('should create logger with debug level when verbose is true', () => {
    const logger = createLogger(true, false);
    expect(logger.level).toBe('debug');
  });

  it('should create logger with error level when quiet is true', () => {
    const logger = createLogger(false, true);
    expect(logger.level).toBe('error');
  });

  it('should prioritize quiet over verbose', () => {
    const logger = createLogger(true, true);
    expect(logger.level).toBe('error');
  });

  it('should create logger with proper format', () => {
    const logger = createLogger();
    expect(logger.format).toBeDefined();
  });

  it('should have console transport', () => {
    const logger = createLogger();
    expect(logger.transports).toHaveLength(1);
  });
});