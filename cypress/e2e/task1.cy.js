/**
 * Task 1 — UI Flow Test
 *
 * Comprehensive test covering all scenarios in a single session
 *
 * Scenarios:
 * - Log in using valid credentials
 * - Add products to cart
 * - Verify cart badge increments correctly
 * - Navigate to cart and verify items
 *
 * @format
 */

import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();

describe('Task 1 — UI Flow', () => {
  it('Should complete full shopping flow: login, add products, verify cart', () => {
    // Step 1: Login
    loginPage.visit();
    loginPage.login();

    // Wait for navigation to inventory
    cy.url().should('include', 'inventory');

    // Verify we're on products page
    productsPage.verifyProductsPageLoaded();

    // Step 2: Capture and add first product
    productsPage.getProductNameByIndex(0).as('firstProductName');
    productsPage.addProductToCartByIndex(0);

    // Verify cart badge equals 1
    productsPage.verifyCartBadge(1);

    // Step 3: Capture and add second product
    productsPage.getProductNameByIndex(1).as('secondProductName');
    productsPage.addProductToCartByIndex(1);

    // Verify badge now equals 2
    productsPage.verifyCartBadge(2);

    // Step 5: Navigate to cart
    productsPage.goToCart();

    // Verify we're on cart page
    cy.url().should('include', 'cart');
    cartPage.verifyCartPageLoaded();
    cartPage.verifyCartItemCount(2);

    // Verify exact products were added
    cy.get('@firstProductName').then((firstProductName) => {
      cartPage.verifyProductExists(firstProductName);
    });

    cy.get('@secondProductName').then((secondProductName) => {
      cartPage.verifyProductExists(secondProductName);
    });
  });
});
