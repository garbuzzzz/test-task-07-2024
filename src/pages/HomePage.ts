import { Page } from '@playwright/test';
import ProductsPage from './ProductsPage';
import Navigation from './Navigation';
import { NavBarItem } from 'src/types/typesUI';
const MIN_TIMEOUT = 4000;

export default class HomePage {
  productsPage: ProductsPage;
  navigation: Navigation;
  constructor(public page: Page) {
    this.page = page;
    this.productsPage = new ProductsPage(page);
    this.navigation = new Navigation(page);
  }

  /**
   * Opens Home Page and accepts Cookies if needed
   * @param { boolean } acceptCookies - flag if needed to accept cookies
   */
  async open(acceptCookies = true) {
    await this.page.goto('');
    await this.verifyHomePageVisible();
    if (acceptCookies) await this.confirmCookies();
  }

  /**
   * Navigates to Product Page from Nav bar
   */
  async navigateToProducts() {
    await this.navigateToNavBarItem('products');
    await this.productsPage.verifyProductsPageVisible();
  }

  /**
   * Navigates to given Nav bar item
   * @param { NavBarItem } navBarItem - Nav bar item title
   */
  private async navigateToNavBarItem(navBarItem: NavBarItem) {
    await this.page.locator(`//a[@href='/${navBarItem}']`).click();
  }

  /**
   * Closes cookies popup by accepting them
   */
  private async confirmCookies() {
    await this.navigation.acceptCookiesButton.click();
  }

  /**
   * Verifies Home Page is visible
   */
  private async verifyHomePageVisible() {
    await this.page
      .getByRole('heading', { name: 'AutomationExercise' })
      .locator('span')
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .locator('.carousel-inner')
      .first()
      .isVisible({ timeout: MIN_TIMEOUT });
  }
}
