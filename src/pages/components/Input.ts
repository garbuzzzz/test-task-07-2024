import { expect, Page } from '@playwright/test';

export default class Input {
  static async fill(page: Page, input: string, text: string) {
    await page.getByLabel(input).fill(text);
    await expect(page.getByLabel(input)).toHaveValue(text);
  }
}
