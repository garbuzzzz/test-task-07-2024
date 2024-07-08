import { defineConfig } from '@playwright/test';
export default defineConfig({
  projects: [
    {
      name: 'test-project',
      use: {
        baseURL: 'https://automationexercise.com/',
        video: {
          mode: 'retain-on-failure',
          size: { width: 640, height: 480 },
        },
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
      timeout: 120000,
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'html-report', open: 'never' }],
    ['junit', { outputFile: './test-results/xml-report/results.xml' }],
  ],
});
