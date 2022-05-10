import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: './src',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ['<rootDir>/lib/testing/setup.ts', 'dotenv/config'],
};
export default config;
