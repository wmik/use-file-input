import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './__tests__/vitest.setup.ts' // load jest-dom types and matchers
  }
});
