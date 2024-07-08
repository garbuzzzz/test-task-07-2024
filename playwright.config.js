import { defineConfig } from '@playwright/test';
export default defineConfig({
  globalSetup: require.resolve('./src/global/global.setup.ts'),
  projects: [
    {
      name: 'autologin',
      testMatch: /.*\.setup\.ts/,
      fullyParallel: true,
      use: { screenshot: 'retain-on-failure' },
    },
    {
      name: 'ui-tests',
      dependencies: ['autologin'],
      use: {
        baseURL: 'https://cunning-impala-mghtzk-dev-ed.trailblaze.lightning.force.com/lightning/o/Account/list?filterName=Recent',
        storageState: 'autologinState.json',
        video: {
          mode: 'retain-on-failure',
          size: { width: 640, height: 480 },
        },
        screenshot: 'on',
        trace: 'retain-on-failure',
      },
    },
  ],
  reporter: [
    ['list'],
    ['html', { outputFolder: 'html-report', open: 'never' }],
    ['junit', { outputFile: './test-results/xml-report/results.xml' }],
  ],
});
