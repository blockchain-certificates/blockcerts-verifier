import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage'
    },
    exclude: ['node_modules', 'test/e2e/*.test.ts']
  }
});
