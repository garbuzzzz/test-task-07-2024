/* eslint-disable max-len */
import { Page, Locator, expect } from '@playwright/test';
import Navigation from 'src/support/Navigation';

export default class AccountEditPage {
  navigation: Navigation;
  saveButton: Locator;
  validationError = '.pageErrorHeader';
  accountNameInput: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.navigation = new Navigation(page);
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.accountNameInput = page.getByLabel('*Account Name');
  }

  async verifyValidationErrorDisplays(errorText: string) {
    await expect(this.page.locator(this.validationError)).toBeVisible();
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async populateAccountName(accountName: string) {
    await this.accountNameInput.fill(accountName);
  }

  async save() {
    await this.saveButton.click();
  }
}
