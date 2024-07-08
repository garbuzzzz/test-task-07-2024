import { Page } from '@playwright/test';
import { expect, Locator } from '@playwright/test';
import { EnvPropsProvider } from '../../support/EnvPropsProvider';

/**
 * Represents Salesforce Toast component
 *
 * https://www.lightningdesignsystem.com/components/toast/
 * */
export default class ToastMessage {
  protected readonly page: Page;
  private readonly toastElementSuccess: Locator;
  private readonly toastElementError: Locator;
  private readonly toastMessage: Locator;

  constructor(context: Page) {
    this.page = context;
    this.toastElementSuccess = this.page.locator(
      "div[role='alertdialog'][data-key='success']"
    );
    this.toastElementError = this.page.locator(
      "div[role='alertdialog'][data-key='error']"
    );
    this.toastMessage = this.page.locator('.toastMessage').first();
  }
  async verifySuccessfulToastMessage(message: string) {
    await this.toastElementSuccess.first().waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
    await this.verifyToastMessage(message);
  }
  async verifyFailedToastMessage(message: string) {
    await this.toastElementError.first().waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._15sec,
    });
    await this.verifyToastMessage(message);
  }
  async verifyToastMessage(message: string) {
    await expect(this.toastMessage).toContainText(message);
  }
  async navigateToNewlyCreatedRecord() {
    await Promise.all([
      this.page
        .locator('span[class*="toastMessage"] a[class="forceActionLink"]')
        .click(),
      this.page.waitForNavigation(),
    ]);
    await this.page.waitForLoadState('networkidle', {
      timeout: EnvPropsProvider.getDefaultTimeouts()._50sec,
    });
  }
}
