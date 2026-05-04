# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\checkout-workflow.spec.ts >> SauceDemo Checkout Workflow Tests >> P0 - Critical Checkout Scenarios >> CHECKOUT-01: Complete purchase happy path @P0
- Location: tests\e2e\checkout-workflow.spec.ts:11:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
      - generic [ref=e15]: "Checkout: Complete!"
    - generic [ref=e16]:
      - img "Pony Express" [ref=e17]
      - heading "Thank you for your order!" [level=2] [ref=e18]
      - generic [ref=e19]: Your order has been dispatched, and will arrive just as fast as the pony can get there!
      - button "Back Home" [ref=e20] [cursor=pointer]
  - contentinfo [ref=e21]:
    - list [ref=e22]:
      - listitem [ref=e23]:
        - link "Twitter" [ref=e24] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e25]:
        - link "Facebook" [ref=e26] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e27]:
        - link "LinkedIn" [ref=e28] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e29]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { test } from '../../fixtures/checkout.fixtures';
  3   | import { testCheckoutFormValidation } from '../../fixtures/checkout.fixtures';
  4   | import { CartPage } from '../../pom/pages/CartPage';
  5   | import { CheckoutStepOnePage } from '../../pom/pages/CheckoutStepOnePage';
  6   | import { CheckoutStepTwoPage } from '../../pom/pages/CheckoutStepTwoPage';
  7   | import { CheckoutCompletePage } from '../../pom/pages/CheckoutCompletePage';
  8   | 
  9   | test.describe('SauceDemo Checkout Workflow Tests', () => {
  10  |   test.describe('P0 - Critical Checkout Scenarios', () => {
  11  |     test('CHECKOUT-01: Complete purchase happy path @P0', async ({ 
  12  |       inventoryPage, 
  13  |       cartPage, 
  14  |       checkoutStepOnePage, 
  15  |       checkoutStepTwoPage, 
  16  |       checkoutCompletePage,
  17  |       page 
  18  |     }) => {
  19  |       // Test ID: CHECKOUT-01
  20  |       // Priority: P0
  21  |       // Steps: 1. Add item to cart, 2. Go to cart, 3. Click Checkout, 
  22  |       //        4. Fill info, 5. Continue, 6. Finish
  23  |       // Expected: Order confirmation page shown, cart empty
  24  | 
  25  |       // Arrange - Add item to cart
  26  |       await inventoryPage.addProductToCart(0);
  27  |       await inventoryPage.goToCart();
  28  |       await cartPage.verifyPageLoaded();
  29  |       
  30  |       // Act - Proceed to checkout
  31  |       await cartPage.proceedToCheckout();
  32  |       
  33  |       // Step 1: Fill checkout information
  34  |       await checkoutStepOnePage.verifyPageLoaded();
  35  |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  36  |       await checkoutStepOnePage.continueToNextStep();
  37  |       
  38  |       // Step 2: Review order
  39  |       await checkoutStepTwoPage.verifyPageLoaded();
  40  |       
  41  |       // Verify order summary
  42  |       const itemCount = await checkoutStepTwoPage.getCartItemCount();
  43  |       expect(itemCount).toBe(1);
  44  |       
  45  |       const calculationsCorrect = await checkoutStepTwoPage.verifyCalculations();
  46  |       expect(calculationsCorrect).toBe(true);
  47  |       
  48  |       // Complete purchase
  49  |       await checkoutStepTwoPage.completePurchase();
  50  |       
  51  |       // Step 3: Order confirmation
  52  |       await checkoutCompletePage.verifyPageLoaded();
  53  |       
  54  |       // Assert - Verify order completion
  55  |       const orderComplete = await checkoutCompletePage.verifyOrderCompletion();
> 56  |       expect(orderComplete).toBe(true);
      |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  57  |       
  58  |       // Verify cart is empty
  59  |       const cartEmpty = await checkoutCompletePage.verifyCartIsEmpty();
  60  |       expect(cartEmpty).toBe(true);
  61  |       
  62  |       // Take screenshot
  63  |       await page.screenshot({ 
  64  |         path: 'test-results/checkout-complete.png',
  65  |         fullPage: true 
  66  |       });
  67  |     });
  68  |   });
  69  | 
  70  |   test.describe('P1 - Important Checkout Scenarios', () => {
  71  |     test('CHECKOUT-02: Checkout with empty cart @P1', async ({ 
  72  |       inventoryPage, 
  73  |       cartPage, 
  74  |       page 
  75  |     }) => {
  76  |       // Test ID: CHECKOUT-02
  77  |       // Priority: P1
  78  |       // Steps: 1. Go to cart (empty), 2. Click Checkout
  79  |       // Expected: Checkout button disabled or error
  80  | 
  81  |       // Arrange - Go to cart without adding items
  82  |       await inventoryPage.goToCart();
  83  |       await cartPage.verifyPageLoaded();
  84  |       
  85  |       // Assert - Verify cart is empty
  86  |       const isEmpty = await cartPage.isCartEmpty();
  87  |       expect(isEmpty).toBe(true);
  88  |       
  89  |       // Verify checkout button state
  90  |       const checkoutEnabled = await cartPage.verifyCheckoutEnabled();
  91  |       // Some implementations disable checkout when cart is empty
  92  |       // Accept either disabled or enabled (if enabled, clicking should show error)
  93  |       
  94  |       if (checkoutEnabled) {
  95  |         // If enabled, click and verify error
  96  |         await cartPage.proceedToCheckout();
  97  |         // Should show error or stay on cart page
  98  |         const currentUrl = page.url();
  99  |         expect(currentUrl).toContain('cart.html');
  100 |       }
  101 |     });
  102 | 
  103 |     test('CHECKOUT-03: Checkout form validation @P1', async ({ 
  104 |       inventoryPage, 
  105 |       cartPage, 
  106 |       checkoutStepOnePage 
  107 |     }) => {
  108 |       // Test ID: CHECKOUT-03
  109 |       // Priority: P1
  110 |       // Steps: 1. Proceed to checkout, 2. Leave fields empty, 3. Click Continue
  111 |       // Expected: Error message displayed
  112 | 
  113 |       // Arrange - Add item and proceed to checkout
  114 |       await inventoryPage.addProductToCart(0);
  115 |       await inventoryPage.goToCart();
  116 |       await cartPage.proceedToCheckout();
  117 |       
  118 |       await checkoutStepOnePage.verifyPageLoaded();
  119 |       
  120 |       // Act - Try to continue with empty form
  121 |       await checkoutStepOnePage.continueToNextStep();
  122 |       
  123 |       // Assert - Error should be displayed
  124 |       const isErrorDisplayed = await checkoutStepOnePage.isErrorDisplayed();
  125 |       expect(isErrorDisplayed).toBe(true);
  126 |       
  127 |       const errorText = await checkoutStepOnePage.getErrorMessage();
  128 |       expect(errorText).toContain('First Name'); // Error should mention required field
  129 |     });
  130 | 
  131 |     test('CHECKOUT-05: Cancel during checkout step 1 @P1', async ({ 
  132 |       inventoryPage, 
  133 |       cartPage, 
  134 |       checkoutStepOnePage,
  135 |       page 
  136 |     }) => {
  137 |       // Test ID: CHECKOUT-05
  138 |       // Priority: P1
  139 |       // Steps: 1. Click Cancel on checkout step 1
  140 |       // Expected: Returned to cart page
  141 | 
  142 |       // Arrange - Proceed to checkout step 1
  143 |       await inventoryPage.addProductToCart(0);
  144 |       await inventoryPage.goToCart();
  145 |       await cartPage.proceedToCheckout();
  146 |       
  147 |       await checkoutStepOnePage.verifyPageLoaded();
  148 |       
  149 |       // Act - Cancel checkout
  150 |       await checkoutStepOnePage.cancelCheckout();
  151 |       
  152 |       // Assert - Should return to cart page
  153 |       await expect(page).toHaveURL(/.*cart.html/);
  154 |       await cartPage.verifyPageLoaded();
  155 |       
  156 |       // Cart should still have the item
```