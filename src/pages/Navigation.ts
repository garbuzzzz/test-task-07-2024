import { Page, Locator } from '@playwright/test';
import ProductsPage from './ProductsPage';

export default class Navigation {
  productsPage: ProductsPage;
  acceptCookiesButton: Locator;
  constructor(public page: Page) {
    this.page = page;
    this.productsPage = new ProductsPage(page);
    this.acceptCookiesButton = page.getByLabel('Consent', { exact: true });
  }

  /**
   * Navigates to Products Page and accepts cookies if needed
   * @param { boolean } acceptCookies - flag if needed to accept cookies
   */
  async landOnProducts(acceptCookies = true) {
    await this.page.goto('products');
    await this.productsPage.verifyProductsPageVisible();
    if (acceptCookies) await this.acceptCookiesButton.click();
  }
}
