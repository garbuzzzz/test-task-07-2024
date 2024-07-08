import { Login } from '../pages/Login';
import { test as setup } from '@playwright/test';
import { LoginDataProvider } from './LoginDataProvider';

setup('Login and store cookies', async ({ page, context }) => {
  const loginPage = new Login(page);
  const baseUrl = LoginDataProvider.getBaseURL();
  const credentials = LoginDataProvider.getCredentials();
  await loginPage.login(baseUrl, credentials.username, credentials.password);
  await context.storageState({ path: 'autologinState.json' });
});

setup.afterAll(async ({ browser }) => {
  await browser.close();
});
