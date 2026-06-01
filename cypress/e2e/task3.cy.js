/**
 * Task 3 — API Test
 *
 * Validates ReqRes users endpoint:
 * - GET /api/users?page=2
 * - Status code is 200
 * - Response has valid pagination metadata
 * - Response has non-empty data array
 * - User objects have expected schema
 *
 * @format
 */

import {
  validateReqresUserSchema,
  validateUsersPagination,
} from '../support/helpers/reqresValidators';

const testCases = [
  {
    name: 'page 2',
    page: 2,
    expectedStatus: 200,
  },
];

describe('Task 3 — API Test', () => {
  testCases.forEach(({ name, page, expectedStatus }) => {
    it(`Should validate users API response for ${name}`, () => {
      cy.getReqresUsers({ page }).then((response) => {
        expect(response.status, 'Status code').to.eq(expectedStatus);
        expect(response.headers['content-type'], 'Content type').to.include('application/json');

        expect(response.body, 'Response body').to.exist;
        validateUsersPagination(response.body, page);

        expect(response.body.data, 'Users data').to.be.an('array').and.not.be.empty;

        response.body.data.forEach(validateReqresUserSchema);
      });
    });
  });
});
