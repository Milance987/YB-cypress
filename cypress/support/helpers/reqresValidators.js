/** @format */

export const validateReqresUserSchema = (user) => {
  expect(user, 'User object').to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');

  expect(user.id, 'User id').to.be.a('number');
  expect(user.email, 'User email').to.be.a('string').and.include('@');
  expect(user.first_name, 'User first name').to.be.a('string').and.not.be.empty;
  expect(user.last_name, 'User last name').to.be.a('string').and.not.be.empty;
  expect(user.avatar, 'User avatar').to.be.a('string').and.include('https://');
};

export const validateUsersPagination = (body, expectedPage) => {
  expect(body.page, 'Response page').to.eq(expectedPage);
  expect(body.per_page, 'Users per page').to.be.a('number');
  expect(body.total, 'Total users').to.be.a('number');
  expect(body.total_pages, 'Total pages').to.be.a('number');
};
