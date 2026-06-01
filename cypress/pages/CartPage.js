/**
 * Cart Page Object
 * Manages all interactions related to the shopping cart
 *
 * @format
 */

class CartPage {
  // Selectors
  selectors = {
    cartContainer: '[data-test="cart-contents"], .cart_list',
    cartItem: '[data-test="cart-item"], .cart_item',
    cartItemName: '[data-test="inventory-item-name"], .inventory_item_name',
    cartItemPrice: '[data-test="inventory-item-price"]',
    removeButton: 'button[data-test*="remove"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    checkoutButton: '[data-test="checkout"]',
    pageTitle: '.title',
  };

  /**
   * Verify user is on cart page
   */
  verifyCartPageLoaded() {
    cy.get(this.selectors.pageTitle).should('be.visible').and('contain', 'Cart');
  }

  /**
   * Verify cart contains specific number of items
   * @param {number} expectedCount - Expected number of items
   */
  verifyCartItemCount(expectedCount) {
    cy.get(this.selectors.cartItem).should('have.length', expectedCount);
  }

  /**
   * Verify specific product is in cart by name
   * @param {string} productName - Name of the product
   */
  verifyProductInCart(productName) {
    cy.get(this.selectors.cartItemName).should('contain', productName);
  }

  /**
   * Verify product exists in cart by name
   * @param {string} productName - Name of the product
   */
  verifyProductExists(productName) {
    this.verifyProductInCart(productName);
  }

  /**
   * Get cart items count
   */
  getCartItemsCount() {
    return cy.get(this.selectors.cartItem).its('length');
  }

  /**
   * Remove item from cart
   * @param {number} index - Item index
   */
  removeItemFromCart(index) {
    cy.get(this.selectors.cartItem)
      .eq(index)
      .within(() => {
        cy.get(this.selectors.removeButton).should('be.visible').click();
      });
  }

  /**
   * Click continue shopping button
   */
  continueShopping() {
    cy.get(this.selectors.continueShoppingButton).should('be.visible').click();
  }

  /**
   * Click checkout button
   */
  checkout() {
    cy.get(this.selectors.checkoutButton).should('be.visible').click();
  }
}

export default CartPage;
