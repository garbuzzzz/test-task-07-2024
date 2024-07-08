import { Page, Locator } from '@playwright/test';
import { EnvPropsProvider } from '../../support/EnvPropsProvider';

/**
 * Represents Salesforce Spinner component
 *
 * https://www.lightningdesignsystem.com/components/spinners
 */
export class Spinner {
  protected readonly page: Page;
  private readonly spinner: Locator;

  constructor(context: Page) {
    this.page = context;
    // this.spinner = this.page.locator(".forceModalSpinner div[role='alert']");
    this.spinner = this.page.locator(
      "//div[contains(concat('', @class, ''), 'slds-spinner slds-spinner_brand slds-spinner_medium')]//span[contains(text(),'Loading')]"
    );
  }

  async done() {
    await this.spinner.waitFor({
      state: 'visible',
      timeout: EnvPropsProvider.getDefaultTimeouts()._95sec,
    });
    await this.spinner.waitFor({
      state: 'hidden',
      timeout: EnvPropsProvider.getDefaultTimeouts()._95sec,
    });
  }
}
