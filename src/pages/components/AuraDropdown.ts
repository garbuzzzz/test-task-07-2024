import { Page } from '@playwright/test';

export class AuraDropdown {
  static async openDropdown(page: Page, dropdown: string) {
    await page.locator(this.getDropdownLocator(dropdown)).click();
  }
  static async selectDropdownOption(page: Page, option: string) {
    await page.locator(this.getOptionLocator(option)).click();
  }
  static async verifyDropdownOptionIsVisible(page: Page, option: string) {
    await page
      .locator(this.getOptionLocator(option))
      .waitFor({ state: 'visible' });
  }
  static async verifySelectedOption(page: Page, option: string) {
    await page.getByRole('button', { name: option }).isVisible();
  }
  static getDropdownLocator(dropdown: string): string {
    return `//span[contains(text(),'${dropdown}')]/../following-sibling::div//a[@class=\'select\']`;
  }
  static getOptionLocator(option: string): string {
    return `a[title='${option}']`;
  }
}
