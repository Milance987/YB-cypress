/** @format */

Cypress.Commands.add('getReqresUsers', ({ page }) => {
  const apiKey = Cypress.env('REQRES_API_KEY');
  const baseUrl = Cypress.env('REQRES_BASE_URL');

  expect(apiKey, 'REQRES_API_KEY should be configured').to.be.a('string').and.not.be.empty;
  expect(baseUrl, 'REQRES_BASE_URL should be configured').to.be.a('string').and.not.be.empty;

  return cy.request({
    method: 'GET',
    url: `${baseUrl}/api/users`,
    qs: {
      page,
    },
    headers: {
      'x-api-key': apiKey,
    },
  });
});
