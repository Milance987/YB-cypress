/**
 * Windows Page Object
 *
 * Manages interactions with the windows page on the-internet.herokuapp.com
 * Handles multi-tab and cross-domain navigation scenarios
 *
 * @format
 */

export default class WindowsPage {
  /**
   * Navigate to the windows page
   */
  visit() {
    cy.visit('https://the-internet.herokuapp.com/windows');
  }

  /**
   * Get the "Click Here" link element
   * This link opens a new window on the same domain
   */
  getClickHereLink() {
    return cy.contains('a', 'Click Here');
  }

  /**
   * Get the "Elemental Selenium" link element
   * This link opens a new window on a different domain
   */
  getElementalSeleniumLink() {
    return cy.contains('a', 'Elemental Selenium');
  }

  /**
   * Click on "Click Here" link (same domain)
   * Removes target="_blank" attribute to test in same tab
   */
  clickOnClickHereLink() {
    return this.getClickHereLink()
      .should('have.attr', 'href', '/windows/new')
      .invoke('removeAttr', 'target')
      .click();
  }

  /**
   * Verify navigation to new window page
   */
  verifyNewWindowPage() {
    cy.url().should('include', '/windows/new');
    cy.contains('New Window').should('be.visible');
  }

  /**
   * Get href attribute from "Elemental Selenium" link
   * Returns the target URL
   */
  getElementalSeleniumLinkHref() {
    return this.getElementalSeleniumLink()
      .should('have.attr', 'target', '_blank')
      .invoke('attr', 'href');
  }
}
