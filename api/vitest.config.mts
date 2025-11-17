import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv';

// Load test environment variables before any test code runs
dotenv.config({ path: path.resolve(__dirname, 'config/.env.test') });

const config = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/support/setup.ts'],
    isolate: true,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
});

export default config;
