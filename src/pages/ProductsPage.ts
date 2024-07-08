import { Page, expect } from '@playwright/test';
import ProductDetailsPage from './ProductDetailsPage';
const MIN_TIMEOUT = 4000;
const MAX_TIMEOUT = 8000;

export default class ProductsPage {
  productDetailsPage: ProductDetailsPage;
  constructor(public page: Page) {
    this.page = page;
    this.productDetailsPage = new ProductDetailsPage(page);
  }

  // locators
  getProductTitleLocatorInTile(productTitle: string) {
    return this.page.locator(
      `//div[@class='productinfo text-center']//p[contains(text(), '${productTitle}')]`
    );
  }

  // actions
  /**
   * Verifies Product Page is visible
   */
  async verifyProductsPageVisible() {
    await this.page
      .getByPlaceholder('Search Product')
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .locator('div.features_items')
      .isVisible({ timeout: MIN_TIMEOUT });
  }

  /**
   * Verifies Product Page is visible
   * @param { number } itemNumber - number of Product in the list
   */
  async viewProduct(itemNumber: number) {
    await this.page
      .locator('.choose > .nav > li > a')
      .nth(itemNumber - 1)
      .click();
    await this.productDetailsPage.verifyProductDetailsPageVisible();
  }

  /**
   * Verifies Product Page is visible
   * @param { string } searchValue - search value for specific Product
   */
  async searchProduct(searchValue: string) {
    await this.page.getByPlaceholder('Search Product').fill(searchValue);
    await this.page.locator('button#submit_search').click();
    await this.page
      .getByText('SEARCHED PRODUCTS')
      .isVisible({ timeout: MAX_TIMEOUT });
  }

  /**
   * Verifies Product Page is visible
   * @param { string } productTitle - title of Product
   * @param { number } expectedNumber - number of expected Products on the page after searching
   */
  async verifyNumberOfFoundElementsByTitle(
    productTitle: string,
    expectedNumber: number
  ) {
    const lowerCaseSearchResult = await this.getProductTitleLocatorInTile(
      productTitle.toLocaleLowerCase()
    ).count();
    const upperCaseSearchResult = await this.getProductTitleLocatorInTile(
      productTitle.toUpperCase()
    ).count();
    const searchResultWithoutModifying =
      await this.getProductTitleLocatorInTile(productTitle).count();
    const expectedSearchResult =
      lowerCaseSearchResult +
      upperCaseSearchResult +
      searchResultWithoutModifying;

    expect(expectedSearchResult).toEqual(expectedNumber);
  }
}
