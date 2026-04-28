import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: [
    ['line'],
    ['allure-playwright', { resultsDir: 'allure-results' }]
  ],
  
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // API testing project
    {
      name: 'api',
      use: {
        baseURL: 'https://www.saucedemo.com/',
        extraHTTPHeaders: {
          'Accept': 'application/json',
        },
      },
      testMatch: /.*api\.spec\.ts/,
    },
  ],
});