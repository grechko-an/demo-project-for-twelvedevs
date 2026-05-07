# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\checkout-workflow.spec.ts >> SauceDemo Checkout Workflow Tests >> P2 - Additional Checkout Scenarios >> CHECKOUT-04: Checkout with invalid ZIP code @P2
- Location: tests\e2e\checkout-workflow.spec.ts:249:9

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
        - generic [ref=e14]: "1"
      - generic [ref=e16]: "Checkout: Overview"
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e29]: $29.99
      - generic [ref=e30]:
        - generic [ref=e31]: "Payment Information:"
        - generic [ref=e32]: "SauceCard #31337"
        - generic [ref=e33]: "Shipping Information:"
        - generic [ref=e34]: Free Pony Express Delivery!
        - generic [ref=e35]: Price Total
        - generic [ref=e36]: "Item total: $29.99"
        - generic [ref=e37]: "Tax: $2.40"
        - generic [ref=e38]: "Total: $32.39"
        - generic [ref=e39]:
          - button "Go back Cancel" [ref=e40] [cursor=pointer]:
            - img "Go back" [ref=e41]
            - text: Cancel
          - button "Finish" [ref=e42] [cursor=pointer]
  - contentinfo [ref=e43]:
    - list [ref=e44]:
      - listitem [ref=e45]:
        - link "Twitter" [ref=e46]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e47]:
        - link "Facebook" [ref=e48]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e49]:
        - link "LinkedIn" [ref=e50]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e51]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  170 |       checkoutStepOnePage,
  171 |       checkoutStepTwoPage,
  172 |       page 
  173 |     }) => {
  174 |       // Test ID: CHECKOUT-06
  175 |       // Priority: P1
  176 |       // Steps: 1. Click Cancel on checkout step 2
  177 |       // Expected: Returned to inventory page
  178 | 
  179 |       // Arrange - Complete checkout step 1
  180 |       await inventoryPage.addProductToCart(0);
  181 |       await inventoryPage.goToCart();
  182 |       await cartPage.proceedToCheckout();
  183 |       
  184 |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  185 |       await checkoutStepOnePage.continueToNextStep();
  186 |       
  187 |       await checkoutStepTwoPage.verifyPageLoaded();
  188 |       
  189 |       // Act - Cancel purchase
  190 |       await checkoutStepTwoPage.cancelPurchase();
  191 |       
  192 |       // Assert - Should return to inventory page
  193 |       await expect(page).toHaveURL(/.*inventory.html/);
  194 |       await inventoryPage.verifyPageLoaded();
  195 |     });
  196 | 
  197 |     test('CHECKOUT-07: Verify order summary details @P1', async ({ 
  198 |       inventoryPage, 
  199 |       cartPage, 
  200 |       checkoutStepOnePage,
  201 |       checkoutStepTwoPage,
  202 |       page 
  203 |     }) => {
  204 |       // Test ID: CHECKOUT-07
  205 |       // Priority: P1
  206 |       // Steps: 1. Complete checkout step 1, 2. Verify step 2 details
  207 |       // Expected: Correct items, quantities, prices, tax, total
  208 | 
  209 |       // Arrange - Add multiple items
  210 |       await inventoryPage.addProductToCart(0);
  211 |       await inventoryPage.addProductToCart(1);
  212 |       await inventoryPage.goToCart();
  213 |       await cartPage.proceedToCheckout();
  214 |       
  215 |       await checkoutStepOnePage.fillCheckoutInfo('Jane', 'Smith', '54321');
  216 |       await checkoutStepOnePage.continueToNextStep();
  217 |       
  218 |       await checkoutStepTwoPage.verifyPageLoaded();
  219 |       
  220 |       // Assert - Verify all details
  221 |       const itemCount = await checkoutStepTwoPage.getCartItemCount();
  222 |       expect(itemCount).toBe(2);
  223 |       
  224 |       // Verify calculations
  225 |       const calculationsCorrect = await checkoutStepTwoPage.verifyCalculations();
  226 |       expect(calculationsCorrect).toBe(true);
  227 |       
  228 |       // Verify tax calculation
  229 |       const taxCorrect = await checkoutStepTwoPage.verifyTaxCalculation();
  230 |       expect(taxCorrect).toBe(true);
  231 |       
  232 |       // Verify payment and shipping info
  233 |       const paymentInfo = await checkoutStepTwoPage.getPaymentInfo();
  234 |       expect(paymentInfo).toContain('SauceCard');
  235 |       
  236 |       const shippingInfo = await checkoutStepTwoPage.getShippingInfo();
  237 |       // Actual text in SauceDemo is "Free Pony Express Delivery!" (case-sensitive)
  238 |       expect(shippingInfo).toContain('Free Pony Express Delivery!');
  239 |       
  240 |       // Take screenshot of order summary
  241 |       await page.screenshot({ 
  242 |         path: 'test-results/order-summary.png',
  243 |         fullPage: false 
  244 |       });
  245 |     });
  246 |   });
  247 | 
  248 |   test.describe('P2 - Additional Checkout Scenarios', () => {
  249 |     test('CHECKOUT-04: Checkout with invalid ZIP code @P2', async ({ 
  250 |       inventoryPage, 
  251 |       cartPage, 
  252 |       checkoutStepOnePage 
  253 |     }) => {
  254 |       // Test ID: CHECKOUT-04
  255 |       // Priority: P2
  256 |       // Steps: 1. Enter invalid ZIP (letters), 2. Click Continue
  257 |       // Expected: Error message displayed
  258 | 
  259 |       // Arrange - Proceed to checkout step 1
  260 |       await inventoryPage.addProductToCart(0);
  261 |       await inventoryPage.goToCart();
  262 |       await cartPage.proceedToCheckout();
  263 |       
  264 |       await checkoutStepOnePage.verifyPageLoaded();
  265 |       
  266 |       // Act - Try invalid postal code (letters)
  267 |       const hasError = await checkoutStepOnePage.testInvalidPostalCode('ABC');
  268 |       
  269 |       // Assert - Should show error
> 270 |       expect(hasError).toBe(true);
      |                        ^ Error: expect(received).toBe(expected) // Object.is equality
  271 |       
  272 |       if (hasError) {
  273 |         const errorText = await checkoutStepOnePage.getErrorMessage();
  274 |         expect(errorText).toContain('Postal'); // Error should mention postal code
  275 |       }
  276 |     });
  277 | 
  278 |     test('Checkout with special characters in name', async ({ 
  279 |       inventoryPage, 
  280 |       cartPage, 
  281 |       checkoutStepOnePage,
  282 |       checkoutStepTwoPage 
  283 |     }) => {
  284 |       // Test with special characters in name fields
  285 |       await inventoryPage.addProductToCart(0);
  286 |       await inventoryPage.goToCart();
  287 |       await cartPage.proceedToCheckout();
  288 |       
  289 |       await checkoutStepOnePage.fillCheckoutInfo('John-O\'Connor', 'Doe-Smith', '12345');
  290 |       await checkoutStepOnePage.continueToNextStep();
  291 |       
  292 |       // Should proceed to next step
  293 |       await checkoutStepTwoPage.verifyPageLoaded();
  294 |     });
  295 | 
  296 |     test('Checkout with very long names', async ({ 
  297 |       inventoryPage, 
  298 |       cartPage, 
  299 |       checkoutStepOnePage,
  300 |       page 
  301 |     }) => {
  302 |       // Test with long name fields
  303 |       const longFirstName = 'A'.repeat(100);
  304 |       const longLastName = 'B'.repeat(100);
  305 |       
  306 |       await inventoryPage.addProductToCart(0);
  307 |       await inventoryPage.goToCart();
  308 |       await cartPage.proceedToCheckout();
  309 |       
  310 |       await checkoutStepOnePage.fillCheckoutInfo(longFirstName, longLastName, '12345');
  311 |       await checkoutStepOnePage.continueToNextStep();
  312 |       
  313 |       // Should proceed to next step (or show error if too long)
  314 |       const currentUrl = page.url();
  315 |       // Accept either success or appropriate error
  316 |     });
  317 | 
  318 |     test('Checkout with different product combinations', async ({ 
  319 |       loginPage,
  320 |       inventoryPage,
  321 |       cartPage,
  322 |       checkoutStepOnePage,
  323 |       checkoutStepTwoPage,
  324 |       checkoutCompletePage,
  325 |       page 
  326 |     }) => {
  327 |       // Test checkout with various product combinations
  328 |       const testCases = [
  329 |         { products: [0], description: 'Single product' },
  330 |         { products: [0, 1, 2], description: 'Multiple products' },
  331 |         { products: [5], description: 'Last product' }
  332 |       ];
  333 |       
  334 |       for (const testCase of testCases) {
  335 |         // Reset for each test case
  336 |         await loginPage.gotoLoginPage();
  337 |         const inventoryPage = await loginPage.loginAsStandardUser();
  338 |         
  339 |         // Add products
  340 |         for (const productIndex of testCase.products) {
  341 |           await inventoryPage.addProductToCart(productIndex);
  342 |         }
  343 |         
  344 |         // Complete checkout
  345 |         await inventoryPage.goToCart();
  346 |         const cartPage = new CartPage(page);
  347 |         await cartPage.proceedToCheckout();
  348 |         
  349 |         const checkoutStepOnePage = new CheckoutStepOnePage(page);
  350 |         await checkoutStepOnePage.fillCheckoutInfo('Test', 'User', '12345');
  351 |         await checkoutStepOnePage.continueToNextStep();
  352 |         
  353 |         const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  354 |         await checkoutStepTwoPage.verifyPageLoaded();
  355 |         
  356 |         // Verify correct number of items
  357 |         const itemCount = await checkoutStepTwoPage.getCartItemCount();
  358 |         expect(itemCount).toBe(testCase.products.length);
  359 |         
  360 |         // Complete purchase
  361 |         await checkoutStepTwoPage.completePurchase();
  362 |         
  363 |         const checkoutCompletePage = new CheckoutCompletePage(page);
  364 |         await checkoutCompletePage.verifyPageLoaded();
  365 |         
  366 |         // Take screenshot for each test case
  367 |         await page.screenshot({ 
  368 |           path: `test-results/checkout-${testCase.description.replace(/\s+/g, '-')}.png`,
  369 |           fullPage: false 
  370 |         });
```