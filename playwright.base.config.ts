import { defineConfig } from '@playwright/test';

export const baseConfig = defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 30000,

  expect: {
    timeout: 5000,
  },

  reporter: [
    ['html'],
    [
      'allure-playwright',
      {
        resultsDir: 'reports/allure-results',
      },
    ],
  ],

  use: {
    trace: 'on-first-retry',
  },
});

export default baseConfig;
