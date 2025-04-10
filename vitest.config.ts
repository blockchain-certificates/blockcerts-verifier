import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul'
    },
    exclude: ['node_modules', 'test/e2e/*.test.ts']
  }
});
