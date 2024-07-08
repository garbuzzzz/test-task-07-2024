import test from '@playwright/test';
import HomePage from 'src/pages/HomePage';
import Navigation from 'src/pages/Navigation';
import ProductsPage from 'src/pages/ProductsPage';
import ProductDetailsPage from 'src/pages/ProductDetailsPage';
import { ProductDetails } from 'src/types/typesUI';

let homePage: HomePage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let navigation: Navigation;

test.describe('Feature: Test task UI', () => {
  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    navigation = new Navigation(page);
  });

  test('Test Case 8: Verify All Products and product detail page', async () => {
    const firstProductDetails: ProductDetails = {
      name: 'Blue Top',
      category: 'Women > Tops',
      price: 500,
      availability: 'In Stock',
      condition: 'New',
      brand: 'Polo',
    };
    await homePage.open();
    await homePage.navigateToProducts();
    await productsPage.viewProduct(1);
    await productDetailsPage.verifyProductDetails(firstProductDetails);
  });

  test('Test Case 9: Search Product', async () => {
    await navigation.landOnProducts();
    await productsPage.searchProduct('Blue');
    await productsPage.verifyNumberOfFoundElementsByTitle('Blue', 7);
  });
});
