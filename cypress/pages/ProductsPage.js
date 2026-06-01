/**
 * Products Page Object
 * Manages all interactions related to the products page
 *
 * @format
 */

class ProductsPage {
  // Selectors
  selectors = {
    productList: '[data-test="inventory-list"]',
    productItem: '[data-test="inventory-item"]',
    productName: '[data-test="inventory-item-name"]',
    addToCartButton: 'button[data-test*="add-to-cart"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    cartLink: '[data-test="shopping-cart-link"]',
    pageTitle: '.title',
  };

  /**
   * Verify user is on products page
   */
  verifyProductsPageLoaded() {
    cy.get(this.selectors.pageTitle).should('be.visible').and('contain', 'Products');
    cy.get(this.selectors.productList).should('be.visible');
  }

  /**
   * Add product to cart by index
   * @param {number} index - Product index (0-based)
   */
  addProductToCartByIndex(index) {
    cy.get(this.selectors.productItem)
      .eq(index)
      .within(() => {
        cy.get(this.selectors.addToCartButton).should('be.visible').click();
      });
  }

  /**
   * Get product name by index
   * @param {number} index - Product index (0-based)
   */
  getProductNameByIndex(index) {
    return cy
      .get(this.selectors.productItem)
      .eq(index)
      .find(this.selectors.productName)
      .invoke('text')
      .then((text) => text.trim());
  }

  /**
   * Verify cart badge shows correct count
   * @param {number} expectedCount - Expected cart item count
   */
  verifyCartBadge(expectedCount) {
    cy.get(this.selectors.cartBadge)
      .should('be.visible')
      .and('have.text', expectedCount.toString());
  }

  /**
   * Click on cart link
   */
  goToCart() {
    cy.get(this.selectors.cartLink).should('be.visible').click();
  }

  /**
   * Get add to cart button for specific product
   * @param {number} index - Product index
   */
  getAddToCartButtonByIndex(index) {
    return cy.get(this.selectors.productItem).eq(index).find(this.selectors.addToCartButton);
  }
}

export default ProductsPage;
