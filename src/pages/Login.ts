import { Locator, Page } from '@playwright/test';
import { EnvPropsProvider } from '../support/EnvPropsProvider';

export class Login {
  private page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('input#username');
    this.password = page.locator('input#password');
    this.loginBtn = page.locator('input#Login');
  }

  async login(url: string, email: string, pass: string): Promise<void> {
    await this.page.goto(url, {
      timeout: EnvPropsProvider.getDefaultTimeouts()._95sec,
    });
    await this.username.waitFor({ state: 'visible' });
    await this.username.type(email);
    await this.password.type(pass);
    await this.loginBtn.click();
    try {
      await this.page.waitForURL(/\/contentDoor/);
    } catch (e) {
      throw Error(
        'Login failed. Please check the credentials, or verification code is required'
      );
    }
  }
}
