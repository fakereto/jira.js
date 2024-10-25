import { defineConfig } from 'vitest/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 10
      },
      forks: {
        minForks: 1,
        maxForks: 10,
      }
    },
    typecheck: {
      enabled: true,
      tsconfig: 'tsconfig.lint.json',
    },
    setupFiles: ['dotenv/config'],
  },
  resolve: {
    alias: {
      '@jirajs': new URL('./src', import.meta.url).pathname,
      '@tests': new URL('./tests', import.meta.url).pathname,
    },
  },
  plugins: [tsconfigPaths({ configNames: ['tsconfig.json', 'tsconfig.lint.json'] })],
});
