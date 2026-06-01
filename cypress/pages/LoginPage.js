/**
 * Login Page Object
 * Manages all interactions related to the login page
 *
 * @format
 */

class LoginPage {
  // Selectors
  selectors = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
  };

  /**
   * Navigate to login page
   */
  visit() {
    cy.visit('/');
  }

  /**
   * Enter username
   * @param {string} username - The username to enter
   */
  enterUsername(username) {
    cy.get(this.selectors.usernameInput).should('be.visible').clear().type(username);
  }

  /**
   * Enter password
   * @param {string} password - The password to enter
   */
  enterPassword(password) {
    cy.get(this.selectors.passwordInput).should('be.visible').clear().type(password);
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    cy.get(this.selectors.loginButton).should('be.visible').click();
  }

  /**
   * Login with credentials
   * Uses Cypress env credentials by default, but allows explicit override.
   * @param {string} [username] - Optional username
   * @param {string} [password] - Optional password
   */
  login(username, password) {
    const resolvedUsername = username ?? Cypress.env('USERNAME');
    const resolvedPassword = password ?? Cypress.env('PASSWORD');

    if (typeof resolvedUsername !== 'string' || resolvedUsername.trim() === '') {
      throw new Error('Username must be provided via login(username) or Cypress env USERNAME');
    }

    if (typeof resolvedPassword !== 'string' || resolvedPassword.trim() === '') {
      throw new Error('Password must be provided via login(password) or Cypress env PASSWORD');
    }

    this.enterUsername(resolvedUsername);
    this.enterPassword(resolvedPassword);
    this.clickLoginButton();
  }

  /**
   * Verify error message is displayed
   * @param {string} errorText - Expected error text
   */
  verifyErrorMessage(errorText) {
    cy.get(this.selectors.errorMessage).should('be.visible').and('contain', errorText);
  }
}

export default LoginPage;
