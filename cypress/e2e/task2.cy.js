/**
 * Task 2 — Network Interception
 *
 * Validates natural network behavior through a request that occurs after login:
 * - Intercepts static media asset request triggered while products page loads
 * - Validates HTTP response status code is 200
 * - Validates response headers indicate image payload
 *
 * Why network-level validation?
 * UI assertions alone cannot confirm that resource delivery is healthy.
 * This test validates a real network response directly, without manual fetch triggers.
 *
 * @format
 */

import LoginPage from '../pages/LoginPage';

const loginPage = new LoginPage();

describe('Task 2 — Network Interception', () => {
  it('Should validate product image asset response after login', () => {
    // Intercept natural static-media request made while products page is loading.
    cy.intercept('GET', /\/static\/media\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i).as(
      'productAssetRequest'
    );

    loginPage.visit();
    loginPage.login();

    // UI confirmation: login flow should land on inventory page.
    cy.url().should('include', 'inventory');

    // Validate network response for naturally occurring asset load.
    cy.wait('@productAssetRequest').then(({ request, response }) => {
      expect(request, 'Product asset request should exist').to.exist;
      expect(response, 'Product asset response should exist').to.exist;
      expect(response.statusCode, 'Product asset status code').to.eq(200);

      const contentType = response.headers['content-type'] || '';
      expect(contentType, 'Response should be an image asset').to.match(/^image\//i);

      expect(request.url, 'Request should target static media path').to.include('/static/media/');
    });
  });
});
