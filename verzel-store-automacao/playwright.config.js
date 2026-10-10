const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: 'list',
  use: {
    baseURL: 'https://verzel-store.qa-test-verzel-store.workers.dev',
    headless: true,
    screenshot: 'off',
    trace: 'off',
  },

  projects: [
  {
    name: 'Chromium',
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'Firefox',
    use: {
      ...devices['Desktop Firefox'],
    },
  },
],
});