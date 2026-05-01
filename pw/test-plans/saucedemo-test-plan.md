# SauceDemo Test Plan

## 1. Overview
This document outlines the comprehensive test strategy for the SauceDemo web application (https://www.saucedemo.com/). The plan covers end-to-end (E2E) functional testing, API testing considerations, and automation readiness assessment.

**Application URL:** https://www.saucedemo.com/
**Test Credentials:**
- Username: `standard_user`
- Password: `secret_sauce`
- Other users: `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`

## 2. Application Structure

### 2.1 Pages Identified
1. **Login Page** (`/`) – Authentication page with username/password fields
2. **Inventory Page** (`/inventory.html`) – Product catalog with sorting and add-to-cart functionality
3. **Cart Page** (`/cart.html`) – Shopping cart review and management
4. **Checkout Step One** (`/checkout-step-one.html`) – Customer information form (First Name, Last Name, ZIP)
5. **Checkout Step Two** (`/checkout-step-two.html`) – Order summary with payment/shipping details
6. **Checkout Complete** (`/checkout-complete.html`) – Order confirmation page

### 2.2 Key Features
- User authentication with multiple user types
- Product sorting (Name A-Z, Name Z-A, Price low-high, Price high-low)
- Shopping cart management (add/remove items)
- Checkout workflow (3-step process)
- Sidebar menu (All Items, About, Logout, Reset App State)
- Responsive design (mobile/desktop)
- Error handling for invalid inputs

## 3. E2E Test Scenarios

### 3.1 Priority Classification
- **P0** – Critical path, core functionality
- **P1** – Important functionality, major features
- **P2** – Edge cases, minor features
- **P3** – Nice-to-have, low-risk scenarios

### 3.2 Test Scenarios Matrix

#### 3.2.1 Authentication (Login/Logout)
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| AUTH-01 | Successful login with valid credentials | P0 | 1. Navigate to login page<br>2. Enter valid username/password<br>3. Click Login | User is redirected to inventory page |
| AUTH-02 | Login with invalid username | P1 | 1. Enter invalid username<br>2. Enter valid password<br>3. Click Login | Error message displayed, user stays on login page |
| AUTH-03 | Login with invalid password | P1 | 1. Enter valid username<br>2. Enter invalid password<br>3. Click Login | Error message displayed, user stays on login page |
| AUTH-04 | Login with locked_out_user | P1 | 1. Enter locked_out_user<br>2. Enter secret_sauce<br>3. Click Login | Error "Sorry, this user has been locked out." appears |
| AUTH-05 | Logout functionality | P1 | 1. Login successfully<br>2. Open menu<br>3. Click Logout | User is redirected to login page |
| AUTH-06 | Access protected page without login | P1 | 1. Navigate directly to /inventory.html<br>2. Verify page | Redirected to login with error message |

#### 3.2.2 Product Catalog & Sorting
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| CAT-01 | Default product sorting (A-Z) | P1 | 1. Login<br>2. Verify product order | Products sorted alphabetically A-Z |
| CAT-02 | Sort Z to A | P1 | 1. Select "Name (Z to A)"<br>2. Verify order | Products sorted Z-A |
| CAT-03 | Sort price low to high | P1 | 1. Select "Price (low to high)"<br>2. Verify order | Products sorted by price ascending |
| CAT-04 | Sort price high to low | P1 | 1. Select "Price (high to low)"<br>2. Verify order | Products sorted by price descending |
| CAT-05 | Product details verification | P2 | 1. Check each product<br>2. Verify name, description, price, image | All product details displayed correctly |

#### 3.2.3 Shopping Cart
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| CART-01 | Add single item to cart | P0 | 1. Click "Add to cart" on any product<br>2. Verify cart badge updates | Cart badge shows "1", button changes to "Remove" |
| CART-02 | Add multiple items to cart | P1 | 1. Add 3 different products<br>2. Verify cart badge | Cart badge shows "3" |
| CART-03 | Remove item from cart (inventory page) | P1 | 1. Add item to cart<br>2. Click "Remove"<br>3. Verify cart badge | Cart badge decrements, button changes to "Add to cart" |
| CART-04 | Remove item from cart (cart page) | P1 | 1. Add item<br>2. Go to cart page<br>3. Click "Remove" | Item removed from cart, cart empty message shown |
| CART-05 | Continue Shopping button | P1 | 1. Go to cart page<br>2. Click "Continue Shopping" | Redirected to inventory page |
| CART-06 | Cart persists after page refresh | P2 | 1. Add items to cart<br>2. Refresh page<br>3. Verify cart | Cart items preserved |

#### 3.2.4 Checkout Workflow
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| CHECKOUT-01 | Complete purchase happy path | P0 | 1. Add item to cart<br>2. Go to cart<br>3. Click Checkout<br>4. Fill info<br>5. Continue<br>6. Finish | Order confirmation page shown, cart empty |
| CHECKOUT-02 | Checkout with empty cart | P1 | 1. Go to cart (empty)<br>2. Click Checkout | Checkout button disabled or error |
| CHECKOUT-03 | Checkout form validation | P1 | 1. Proceed to checkout<br>2. Leave fields empty<br>3. Click Continue | Error message displayed |
| CHECKOUT-04 | Checkout with invalid ZIP code | P2 | 1. Enter invalid ZIP (letters)<br>2. Click Continue | Error message displayed |
| CHECKOUT-05 | Cancel during checkout step 1 | P1 | 1. Click Cancel on checkout step 1 | Returned to cart page |
| CHECKOUT-06 | Cancel during checkout step 2 | P1 | 1. Click Cancel on checkout step 2 | Returned to inventory page |
| CHECKOUT-07 | Verify order summary details | P1 | 1. Complete checkout step 1<br>2. Verify step 2 details | Correct items, quantities, prices, tax, total |

#### 3.2.5 Menu & Navigation
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| MENU-01 | All Items link | P1 | 1. Open menu<br>2. Click "All Items" | Redirected to inventory page |
| MENU-02 | About link | P2 | 1. Open menu<br>2. Click "About" | Opens Sauce Labs website in new tab |
| MENU-03 | Reset App State | P2 | 1. Add items to cart<br>2. Open menu<br>3. Click "Reset App State" | Cart emptied, all "Remove" buttons revert to "Add to cart" |
| MENU-04 | Menu open/close functionality | P2 | 1. Click menu button<br>2. Verify menu opens<br>3. Click close/X | Menu opens and closes smoothly |

#### 3.2.6 Error Handling & Edge Cases
| Test ID | Scenario | Priority | Steps | Expected Result |
|---------|----------|----------|-------|-----------------|
| ERR-01 | Problem user behavior | P2 | 1. Login as problem_user<br>2. Add items, checkout | Verify any known issues (images, buttons) |
| ERR-02 | Performance glitch user | P2 | 1. Login as performance_glitch_user<br>2. Perform actions | Verify delays but functionality works |
| ERR-03 | Visual user | P2 | 1. Login as visual_user<br>2. Verify UI | Check for visual differences |
| ERR-04 | Error user | P2 | 1. Login as error_user<br>2. Perform actions | Verify error scenarios |

### 3.3 Cross-Browser & Responsive Testing
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Viewports:** Mobile (375px), Tablet (768px), Desktop (1280px+)
- **Key checks:** Layout, functionality, touch interactions on mobile

## 4. API Test Scenarios

### 4.1 Identified API Endpoints
Based on network analysis, the application appears to be a static demo with minimal backend APIs. However, the following endpoints were observed:

1. **Analytics/Telemetry:**
   - `POST https://events.backtrace.io/api/unique-events/submit`
   - `POST https://events.backtrace.io/api/summed-events/submit`

2. **Potential Hidden APIs** (if backend exists):
   - Login endpoint (likely POST to `/api/login`)
   - Inventory data (likely GET from `/api/inventory`)
   - Checkout processing (likely POST to `/api/checkout`)

### 4.2 API Test Scenarios (If Implemented)
| Test ID | Scenario | Method | Endpoint | Expected Result |
|---------|----------|--------|----------|-----------------|
| API-01 | Valid login | POST | `/api/login` | Returns 200 with session token |
| API-02 | Invalid login | POST | `/api/login` | Returns 401 Unauthorized |
| API-03 | Get inventory | GET | `/api/inventory` | Returns product list JSON |
| API-04 | Submit order | POST | `/api/order` | Returns 201 with order ID |
| API-05 | Authentication required | GET | `/api/cart` without token | Returns 403 Forbidden |

### 4.3 API Testing Tools Recommendation
- **Postman/Newman** for manual and automated API tests
- **Jest/Supertest** for Node.js based automation
- **Integration with CI/CD** for regression testing

## 5. Automation Strategy

### 5.1 Framework Selection
**Recommended:** Playwright with TypeScript
- Cross-browser support (Chromium, Firefox, WebKit)
- Auto-waiting, network interception, mobile emulation
- Parallel execution, CI/CD integration

### 5.2 Page Object Model (POM) Structure
```
pages/
├── LoginPage.ts
├── InventoryPage.ts
├── CartPage.ts
├── CheckoutStepOnePage.ts
├── CheckoutStepTwoPage.ts
├── CheckoutCompletePage.ts
└── components/
    ├── HeaderComponent.ts
    └── MenuComponent.ts
```

### 5.3 Test Data Management
- Use environment variables for credentials
- Generate test data dynamically (faker.js)
- Separate test data from test logic

### 5.4 CI/CD Integration
- Run smoke tests (P0) on every commit
- Full regression suite nightly
- Parallel execution across browsers
- Allure/HTML reporting
- Slack/email notifications for failures

## 6. Test Environment & Data

### 6.1 Environments
- **Staging:** https://www.saucedemo.com/ (public demo)
- **Production:** Same (demo site)

### 6.2 Test Data
**Users:**
- `standard_user` – Normal user
- `locked_out_user` – Locked account
- `problem_user` – User with issues
- `performance_glitch_user` – Slow responses
- `error_user` – Error scenarios
- `visual_user` – Visual differences

**Products:** 6 static products with varying prices

## 7. Risk Assessment

### 7.1 High-Risk Areas
1. **Checkout flow** – Financial transaction simulation
2. **Authentication** – Security and user access
3. **Cart persistence** – Data consistency across sessions

### 7.2 Mitigation Strategies
- Comprehensive E2E coverage for checkout
- Negative testing for authentication
- Session storage validation tests

## 8. Exit Criteria

### 8.1 Test Completion Criteria
- All P0 test cases executed and passed
- No critical (blocker) bugs open
- All major user flows verified
- Cross-browser testing completed for Chrome, Firefox

### 8.2 Quality Gates
- Test automation coverage ≥ 80% for P0/P1 scenarios
- Zero P0/P1 defects in production
- Performance benchmarks met (page load < 3s)

## 9. Future Enhancements

### 9.1 Test Automation Roadmap
1. **Phase 1:** Implement P0 E2E tests with Playwright
2. **Phase 2:** Add API tests (if backend available)
3. **Phase 3:** Integrate with CI/CD pipeline
4. **Phase 4:** Add visual regression testing
5. **Phase 5:** Performance and load testing

### 9.2 Additional Test Types
- **Accessibility testing** (WCAG 2.1 compliance)
- **Security testing** (OWASP Top 10)
- **Load testing** (simulate multiple concurrent users)
- **Visual regression** (pixel-perfect UI validation)

---

**Document Version:** 1.0  
**Created Date:** 2026-04-29  
**Last Updated:** 2026-04-29  
**Author:** QA Engineer  
**Status:** Draft