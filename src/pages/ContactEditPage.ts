/* eslint-disable max-len */
import { Page, Locator, expect } from '@playwright/test';
import Navigation from 'src/support/Navigation';

export default class ContactEditPage {
  navigation: Navigation;
  saveButton: Locator;
  validationError = '.pageErrorHeader';
  contactLastNameInput: Locator;

  constructor(public page: Page) {
    this.page = page;
    this.navigation = new Navigation(page);
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.contactLastNameInput = page.getByLabel('*Last Name');

  }

  async verifyValidationErrorDisplays(errorText: string) {
    await expect(this.page.locator(this.validationError)).toBeVisible();
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async populateContactLastName(contactLastName: string) {
    await this.contactLastNameInput.fill(contactLastName);
  }

  async save() {
    await this.saveButton.click();
  }
}
