# SauceDemo E2E and API Automation Tests

This directory contains comprehensive automated tests for the SauceDemo web application (https://www.saucedemo.com/). The tests are based on the test plan in `pw/test-plans/saucedemo-test-plan.md`.

## Test Structure

### Page Object Model (POM) Architecture

```
pw/
├── pages/pages/
│   ├── BasePage.ts                    # Base class with common functionality
│   ├── SauceDemoLoginPage.ts          # SauceDemo-specific login page POM
│   ├── InventoryPage.ts               # Product catalog page POM
│   ├── CartPage.ts                    # Shopping cart page POM
│   ├── CheckoutStepOnePage.ts         # Checkout step 1 (customer info) POM
│   ├── CheckoutStepTwoPage.ts         # Checkout step 2 (order summary) POM
│   ├── CheckoutCompletePage.ts        # Checkout completion page POM
│   └── components/
│       ├── HeaderComponent.ts         # Header component POM
│       ├── MenuComponent.ts           # Sidebar menu component POM
│       └── ThemeToggle.ts             # Existing theme toggle component
├── tests/e2e/
│   ├── authentication.spec.ts         # Authentication tests (P0/P1)
│   ├── product-catalog.spec.ts        # Product catalog & sorting tests
│   ├── shopping-cart.spec.ts          # Shopping cart functionality tests
│   ├── checkout-workflow.spec.ts      # Checkout workflow tests (P0/P1)
│   └── menu-navigation.spec.ts        # Menu & navigation tests
└── tests/api/
    ├── api-utils.ts                   # API test utilities
    └── saucedemo-api.spec.ts          # API endpoint tests
```

## Test Coverage

The tests cover all scenarios from the SauceDemo test plan:

### Authentication Tests (`authentication.spec.ts`)
- **AUTH-01**: Successful login with valid credentials (P0)
- **AUTH-02**: Login with invalid username (P1)
- **AUTH-03**: Login with invalid password (P1)
- **AUTH-04**: Login with locked_out_user (P0)
- **AUTH-05**: Logout functionality (P1)
- **AUTH-06**: Access protected page without login (P1)
- Additional: Login with problem_user, performance_glitch_user, etc.

### Product Catalog & Sorting Tests (`product-catalog.spec.ts`)
- **CAT-01**: Default product sorting (A-Z) (P1)
- **CAT-02**: Sort Z to A (P1)
- **CAT-03**: Sort price low to high (P1)
- **CAT-04**: Sort price high to low (P1)
- **CAT-05**: Product details verification (P2)
- Additional: Product count, unique names, price validation, etc.

### Shopping Cart Tests (`shopping-cart.spec.ts`)
- **CART-01**: Add single item to cart (P0)
- **CART-02**: Add multiple items to cart (P1)
- **CART-03**: Remove item from cart (inventory page) (P1)
- **CART-04**: Remove item from cart (cart page) (P1)
- **CART-05**: Continue Shopping button (P1)
- **CART-06**: Cart persists after page refresh (P2)
- Additional: Cart total calculation, edge cases, etc.

### Checkout Workflow Tests (`checkout-workflow.spec.ts`)
- **CHECKOUT-01**: Complete purchase happy path (P0)
- **CHECKOUT-02**: Checkout with empty cart (P1)
- **CHECKOUT-03**: Checkout form validation (P1)
- **CHECKOUT-04**: Checkout with invalid ZIP code (P2)
- **CHECKOUT-05**: Cancel during checkout step 1 (P1)
- **CHECKOUT-06**: Cancel during checkout step 2 (P1)
- **CHECKOUT-07**: Verify order summary details (P1)
- Additional: Special characters, long names, multiple purchases, etc.

### Menu & Navigation Tests (`menu-navigation.spec.ts`)
- **MENU-01**: All Items link (P1)
- **MENU-02**: About link (P2)
- **MENU-03**: Reset App State (P2)
- **MENU-04**: Menu open/close functionality (P2)
- Additional: Keyboard navigation, accessibility, edge cases, etc.

### API Tests (`saucedemo-api.spec.ts`)
- **API-01**: Valid login API (if exists)
- **API-02**: Invalid login API (if exists)
- **API-03**: Get inventory API (if exists)
- **API-04**: Submit order API (if exists)
- **API-05**: Authentication required for cart API (if exists)
- Analytics API tests for Backtrace.io endpoints
- API performance, reliability, and error handling tests

## Test Execution

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run all API tests
npm run test:api

# Run all tests
npm run test:all

# Run tests in headed mode (with browser UI)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Generate and view test report
npm run report
```

### Test Tags

Tests are tagged for selective execution:

- `@P0` - Critical path tests
- `@P1` - Important functionality tests
- `@P2` - Edge cases and minor features
- `@api` - API tests

Example: Run only P0 tests
```bash
npx playwright test --grep @P0
```

### Test Configuration

Configuration is in `playwright.config.ts`:
- Base URL: `https://www.saucedemo.com/`
- Timeout: 60 seconds
- Retries: 2
- Workers: 1 (can be increased for parallel execution)
- Browsers: Chromium, Firefox, WebKit
- Reporting: Line reporter + Allure
- Screenshots: On failure only
- Video: Retain on failure
- Trace: On first retry

## Test Data

### Credentials
- `standard_user` - Normal user (password: `secret_sauce`)
- `locked_out_user` - Locked account
- `problem_user` - User with known issues
- `performance_glitch_user` - User with performance delays
- `error_user` - User for error scenarios
- `visual_user` - User for visual differences

### Test Data Management
- Credentials are managed in `SauceDemoLoginPage.ts`
- Test data is generated dynamically where needed
- No hardcoded sensitive data in test files

## Best Practices Implemented

### 1. Page Object Model (POM)
- Each page has its own class with locators and methods
- Components are separated into reusable classes
- Base class provides common functionality
- Methods return page objects for fluent navigation

### 2. Reliability
- Explicit waits instead of hardcoded timeouts
- `locator.waitFor()` and `expect(locator).toBeVisible()`
- No `page.waitForTimeout()` usage
- Retry mechanism in Playwright config

### 3. Maintainability
- Descriptive test names with test IDs
- Clear test structure with Arrange-Act-Assert pattern
- Comments linking to test plan requirements
- Screenshots for documentation and debugging

### 4. CI/CD Readiness
- Tests run in headless mode
- Parallel execution support
- Allure reporting integration
- Screenshots and videos on failure

### 5. Type Safety
- Full TypeScript implementation
- No `any` types
- Proper interfaces for API responses
- Type-safe method parameters

## Test Results and Reporting

### Output Locations
- Test results: `test-results/` directory
- Screenshots: Automatically captured on failure
- Videos: Recorded for failed tests
- Traces: Available for debugging failed tests
- Allure reports: `allure-results/` directory

### Viewing Reports
```bash
# Generate Allure report
npx allure generate allure-results --clean

# Open Allure report
npx allure open
```

## Troubleshooting

### Common Issues

1. **Tests failing due to timing issues**
   - Increase timeouts in `playwright.config.ts`
   - Use explicit waits instead of hardcoded delays
   - Check for network requests completion

2. **Locator not found**
   - Verify element selectors match current page structure
   - Use `page.pause()` or `--debug` flag to inspect page
   - Check if page loaded completely

3. **API tests failing**
   - SauceDemo is a static site with minimal APIs
   - Analytics endpoints may have rate limiting
   - Hidden APIs mentioned in test plan may not exist

### Debugging Tips
```bash
# Run with debug mode
npm run test:debug

# Run with UI
npm run test:headed

# Generate trace for failed tests
# Configured in playwright.config.ts
```

## Future Enhancements

1. **Visual Regression Testing**
   - Add Percy or similar visual testing
   - Compare screenshots across browsers

2. **Performance Testing**
   - Measure page load times
   - Test with performance_glitch_user

3. **Accessibility Testing**
   - Integrate axe-core for accessibility checks
   - Verify WCAG compliance

4. **Cross-Browser Testing**
   - Extend to mobile browsers
   - Test responsive design

5. **CI/CD Integration**
   - Add GitHub Actions workflow
   - Slack notifications for failures
   - Test result dashboards

## Dependencies

- Playwright Test Runner
- TypeScript
- Allure Playwright Reporter
- Node.js 16+

See `package.json` for complete dependency list.

## Author

QA Automation Engineer  
Based on test plan: `pw/test-plans/saucedemo-test-plan.md`  
Generated: 2026-05-01