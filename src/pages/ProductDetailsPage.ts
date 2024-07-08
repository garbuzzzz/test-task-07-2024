import { Page } from '@playwright/test';
import { ProductDetails } from 'src/types/typesUI';
const MIN_TIMEOUT = 4000;

export default class ProductDetailsPage {
  constructor(public page: Page) {
    this.page = page;
  }

  /**
   * Verifies Product Details Page is visible
   */
  async verifyProductDetailsPageVisible() {
    await this.page
      .locator('div.product-information')
      .isVisible({ timeout: MIN_TIMEOUT });
  }

  /**
   * Verifies details of given Product
   * @param { ProductDetails } productDetails - details of given Product
   */
  async verifyProductDetails(productDetails: ProductDetails) {
    await this.page
      .getByRole('heading', { name: `${productDetails.name}` })
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .getByText(`Category: ${productDetails.category}`)
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .getByText(`Rs. ${String(productDetails.price)}`)
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .getByText(`Availability: ${productDetails.availability}`)
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .getByText(`Condition: ${productDetails.condition}`)
      .isVisible({ timeout: MIN_TIMEOUT });
    await this.page
      .getByText(`Brand: ${productDetails.brand}`)
      .isVisible({ timeout: MIN_TIMEOUT });
  }
}
