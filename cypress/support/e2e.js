/** @format */

// Cypress support file for e2e tests
import './commands';

// Disable uncaught exceptions to prevent tests from failing due to app errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent test failure
  return false;
});

// Global test timeout configuration
Cypress.config('defaultCommandTimeout', 8000);
Cypress.config('requestTimeout', 8000);
