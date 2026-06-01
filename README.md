<!-- @format -->

# Cypress Test Automation - SauceDemo

Automated test suite for SauceDemo application using Cypress with Page Object Model (POM) architecture.

## 📋 Project Overview

- **Framework**: Cypress 13+
- **Architecture**: Page Object Model (POM)
- **Application**: https://www.saucedemo.com
- **Node Version**: 14+ (recommended 16+)

## 🏗️ Project Structure

```
.
├── cypress/
│   ├── e2e/
│   │   └── task1.cy.js          # Task 1 tests - UI Flow
│   ├── pages/
│   │   ├── LoginPage.js         # Login page object
│   │   ├── ProductsPage.js      # Products page object
│   │   └── CartPage.js          # Cart page object
│   ├── support/
│   │   └── e2e.js               # Cypress support configuration
├── cypress.config.js             # Cypress configuration
├── package.json                  # Project dependencies
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
└── README.md                    # This file
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or update the `.env` file with the following variables:

```env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
REQRES_API_KEY=your_reqres_api_key
```

**Default credentials provided for SauceDemo:**

- Username: `standard_user`
- Password: `secret_sauce`

### 3. Verify Installation

```bash
npm run test:open
```

This will open the Cypress Test Runner GUI. You should see `task1.cy.js` in the spec list.

## ▶️ Execution Instructions

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (with browser visible)

```bash
npm run test:headed
```

### Run Specific Test (Task 1)

```bash
npm run test:task1
```

### Run Specific Test (Task 2)

```bash
npm run test:task2
```

### Run Specific Test (Task 3 - API)

**⚠️ Task 3 requires a ReqRes API key.**

1. Get a free API key from https://app.reqres.in/api-keys
2. Add to `.env` file:
   ```
   REQRES_API_KEY=your_actual_key_here
   ```
3. Run tests:
   ```bash
   npm run test:task3
   ```

### Open Cypress GUI

```bash
npm run test:open
```

## ✅ Test Coverage

### Task 1 — UI Flow

Comprehensive end-to-end UI test for SauceDemo shopping flow:

- Login with valid credentials
- Add multiple products to cart
- Verify cart badge updates correctly
- Navigate to cart and verify items

### Task 2 — Network Interception

Validates network behavior during product page load:

- Intercepts real product asset requests (images)
- Verifies HTTP 200 status code
- Validates proper content-type headers
- Confirms assets load from static media pipeline

### Task 3 — API Test

Tests public ReqRes API endpoint:

- Validates `/api/users?page=2` endpoint
- Verifies HTTP 200 status and JSON response
- Checks pagination metadata
- Validates user object schema

**Note**: Task 3 requires setting `REQRES_API_KEY` in `.env` (see setup instructions above).

## ✅ Test Scenarios - Task 1

### Scenario 1: Basic Login and Cart Badge

- **Steps**:
  1. Navigate to login page
  2. Log in with valid credentials (`standard_user` / `secret_sauce`)
  3. Add first product to cart
  4. Verify cart badge displays "1"

- **Expected Result**: Cart badge shows exactly 1 item

### Scenario 2: Cart Badge Display

- **Steps**:
  1. Log in
  2. Add first product
  3. Verify badge appears immediately

### Scenario 3: Cart Page Verification

- **Steps**:
  1. Log in
  2. Add product
  3. Navigate to cart
  4. Verify cart contains 1 item

### Scenario 4: Multiple Products

- **Steps**:
  1. Log in
  2. Add first product (verify badge = 1)
  3. Add second product (verify badge = 2)
  4. Navigate to cart
  5. Verify cart contains 2 items

## 🏗️ Architecture & Best Practices

### Page Object Model (POM)

Each page is represented as a class with:

- **Selectors**: Centralized element selectors (using data-test attributes)
- **Methods**: Reusable action methods
- **Assertions**: Verification methods

**Benefits**:

- Maintainable and scalable
- Easy to update selectors in one place
- Reduced code duplication
- Clear test intent

### Selectors Strategy

- **Primary**: Data-test attributes (`data-test="..."`)
- **Stable**: Focused on unique identifiers, not CSS classes
- **Maintainable**: Centralized in page objects

### Wait Strategy

- **No Hard-Coded Delays**: All waits are implicit through Cypress commands
- **Automatic Waits**: Cypress waits for elements to be visible/actionable
- **Command Timeouts**: Configurable via `cypress.config.js`

### Error Handling & Diagnostics

- **Screenshots on Failure**: Automatic screenshots saved to `cypress/screenshots/`
- **Clear Assertions**: Descriptive error messages
- **Organized Output**: Screenshots organized by test name

## 📊 Configuration Details

**Timeouts** (from `cypress.config.js`):

- Default Command Timeout: 8 seconds
- Request Timeout: 8 seconds
- Response Timeout: 8 seconds

**Viewport**:

- Width: 1280px
- Height: 720px

**Failure Handling**:

- Screenshots enabled
- Uncaught exceptions allowed (app-level errors don't fail tests)

## 🔐 Environment Variables

**File**: `.env`

```env
BASE_URL=https://www.saucedemo.com    # Application URL
USERNAME=standard_user                # Login username
PASSWORD=secret_sauce                 # Login password
REQRES_API_KEY=your_reqres_api_key    # ReqRes API key for Task 3
```

**Note**: Never commit `.env` file with real credentials to version control. It's already in `.gitignore`.

## 🐛 Troubleshooting

### Tests Fail with "Element not found"

- Verify the application is accessible: https://www.saucedemo.com
- Check that element selectors match the app's current DOM structure
- Run tests with headed mode: `npm run test:headed`

### Screenshots Not Generated

- Verify `screenshotOnRunFailure: true` in `cypress.config.js`
- Check write permissions for `cypress/screenshots/` folder
- Run: `npm test` to generate screenshots on failures

### Timeout Errors

- Increase timeout in `cypress.config.js` if needed
- Verify network connectivity to https://www.saucedemo.com
- Check browser devtools (in headed mode) for network issues

### Environment Variables Not Loaded

- Verify `.env` file exists in project root
- Check `.env` file has correct format: `KEY=value` (no spaces around `=`)
- Restart Cypress Test Runner after updating `.env`

## 📝 Adding New Tests

1. **Create a new test file** in `cypress/e2e/`:

   ```javascript
   // cypress/e2e/taskN.cy.js
   import LoginPage from '../pages/LoginPage';
   import ProductsPage from '../pages/ProductsPage';
   ```

2. **Use Page Objects** for all interactions:

   ```javascript
   it('should perform action', () => {
     LoginPage.login(username, password);
     ProductsPage.verifyProductsPageLoaded();
   });
   ```

3. **Follow naming conventions**:
   - File: `taskX.cy.js`
   - Test suite: `describe('Task X — Description', () => { ... });`
   - Test case: `it('Should do something specific', () => { ... });`

## 📚 Page Object Methods

### LoginPage

- `visit()` - Navigate to login page
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `login(username, password)` - Complete login flow
- `verifyErrorMessage(errorText)` - Verify error message

### ProductsPage

- `verifyProductsPageLoaded()` - Verify products page is loaded
- `getFirstProduct()` - Get first product element
- `addFirstProductToCart()` - Add first product to cart
- `addProductToCartByIndex(index)` - Add specific product by index
- `verifyCartBadge(expectedCount)` - Verify cart badge count
- `goToCart()` - Navigate to cart page

### CartPage

- `verifyCartPageLoaded()` - Verify cart page is loaded
- `verifyCartItemCount(expectedCount)` - Verify number of items
- `verifyProductInCart(productName)` - Verify product exists in cart
- `getCartItemsCount()` - Get cart items count
- `removeItemFromCart(index)` - Remove item from cart
- `continueShopping()` - Click continue shopping button
- `checkout()` - Click checkout button

## 🔄 CI/CD Integration

To run tests in CI/CD pipeline:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Tests will exit with code 0 (success) or 1 (failure)
```

Example GitHub Actions workflow:

```yaml
- name: Run Cypress tests
  run: npm test
```

## 📧 Support & Issues

For issues or questions:

1. Check the troubleshooting section above
2. Review test output and screenshots in `cypress/screenshots/`
3. Run tests in headed mode for visual debugging

## ✨ Key Features

✅ Page Object Model Architecture  
✅ Environment-based Configuration  
✅ Automatic Screenshots on Failure  
✅ No Hard-Coded Waits  
✅ Scalable Test Structure  
✅ Clear Assertions & Error Messages  
✅ Comprehensive Documentation  
✅ Easy Maintenance & Updates

---

**Last Updated**: June 1, 2026  
**Framework**: Cypress 13+  
**Status**: Ready for Testing
