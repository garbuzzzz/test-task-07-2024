import { expect, Page } from '@playwright/test';
/*
 * Represents Salesforce Combobox
 *
 * https://www.lightningdesignsystem.com/components/combobox/
 */
export class LightningDropdown {
  static async fill(page: Page, dropdown: string, option: string) {
    await this.openDropdown(page, dropdown);
    await this.verifyDropdownOptionIsVisible(page, option);
    await this.selectDropdownOption(page, option);
    await this.verifySelectedOption(page, dropdown, option);
  }
  static async openDropdown(page: Page, dropdown: string) {
    await page.locator(this.getDropdownLocator(dropdown)).first().click();
  }
  static async selectDropdownOption(page: Page, option: string) {
    await page.locator(this.getOptionLocator(option)).click();
  }
  static async verifyDropdownOptionIsVisible(page: Page, option: string) {
    await page
      // alternatively:
      // .getByRole('option', { name: option }).getByText(option)
      .locator(this.getOptionLocator(option))
      .waitFor({ state: 'visible' });
  }
  static async verifySelectedOption(
    page: Page,
    dropdown: string,
    option: string
  ) {
    const dropdownSelectedOption = await page
      .locator(this.getDropdownLocator(dropdown))
      .textContent();
    expect(dropdownSelectedOption).toBe(`${option}`);
  }
  static getDropdownLocator(dropdown: string): string {
    return `//button[starts-with(@aria-label,'${dropdown},')]//span`;
  }
  static getOptionLocator(option: string): string {
    return `lightning-base-combobox-item[data-value="${option}"][aria-checked=false]`;
  }
}
