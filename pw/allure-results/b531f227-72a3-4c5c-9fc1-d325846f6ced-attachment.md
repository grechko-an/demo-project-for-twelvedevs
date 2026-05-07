# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\checkout-workflow.spec.ts >> SauceDemo Checkout Workflow Tests >> Checkout Completion and Post-Purchase >> Verify post-purchase state
- Location: tests\e2e\checkout-workflow.spec.ts:425:9

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
  371 |         
  372 |         // Go back to start for next test case
  373 |         await checkoutCompletePage.backToHome();
  374 |       }
  375 |     });
  376 |   });
  377 | 
  378 |   test.describe('Checkout Error Handling', () => {
  379 |     test('Checkout form field validation sequence', async ({ 
  380 |       inventoryPage, 
  381 |       cartPage, 
  382 |       checkoutStepOnePage 
  383 |     }) => {
  384 |       await inventoryPage.addProductToCart(0);
  385 |       await inventoryPage.goToCart();
  386 |       await cartPage.proceedToCheckout();
  387 |       
  388 |       // Test validation with different invalid inputs
  389 |       const testCases = [
  390 |         { firstName: '', lastName: '', postalCode: '', expectedError: 'First Name' },
  391 |         { firstName: 'John', lastName: '', postalCode: '', expectedError: 'Last Name' },
  392 |         { firstName: 'John', lastName: 'Doe', postalCode: '', expectedError: 'Postal' },
  393 |         { firstName: 'John', lastName: 'Doe', postalCode: 'ABC', expectedError: 'Postal' }
  394 |       ];
  395 |       
  396 |       await testCheckoutFormValidation(checkoutStepOnePage, testCases);
  397 |     });
  398 | 
  399 |     test('Checkout with problem_user account', async ({ 
  400 |       loginPage,
  401 |       page 
  402 |     }) => {
  403 |       // Login as problem_user
  404 |       await loginPage.gotoLoginPage();
  405 |       const problemInventory = await loginPage.login('problem_user', 'secret_sauce');
  406 |       await problemInventory.verifyPageLoaded();
  407 |       
  408 |       // Try checkout flow
  409 |       await problemInventory.addProductToCart(0);
  410 |       await problemInventory.goToCart();
  411 |       const problemCart = new CartPage(page);
  412 |       await problemCart.proceedToCheckout();
  413 |       
  414 |       const problemCheckout = new CheckoutStepOnePage(page);
  415 |       await problemCheckout.fillCheckoutInfo('Test', 'User', '12345');
  416 |       await problemCheckout.continueToNextStep();
  417 |       
  418 |       // problem_user might have issues but should proceed or show appropriate error
  419 |       const currentUrl = page.url();
  420 |       // Accept either checkout-step-two.html or error
  421 |     });
  422 |   });
  423 | 
  424 |   test.describe('Checkout Completion and Post-Purchase', () => {
  425 |     test('Verify post-purchase state', async ({ 
  426 |       inventoryPage, 
  427 |       cartPage, 
  428 |       checkoutStepOnePage,
  429 |       checkoutStepTwoPage,
  430 |       checkoutCompletePage,
  431 |       page 
  432 |     }) => {
  433 |       // Complete a purchase
  434 |       await inventoryPage.addProductToCart(0);
  435 |       await inventoryPage.goToCart();
  436 |       await cartPage.proceedToCheckout();
  437 |       
  438 |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  439 |       await checkoutStepOnePage.continueToNextStep();
  440 |       
  441 |       await checkoutStepTwoPage.completePurchase();
  442 |       
  443 |       // Validate post-purchase state
  444 |       const validation = await checkoutCompletePage.validatePostPurchaseState();
  445 |       
> 446 |       expect(validation.orderComplete).toBe(true);
      |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  447 |       expect(validation.cartEmpty).toBe(true);
  448 |       expect(validation.correctUrl).toBe(true);
  449 |       expect(validation.allElementsVisible).toBe(true);
  450 |       
  451 |       // Verify back home button works
  452 |       await checkoutCompletePage.backToHome();
  453 |       await expect(page).toHaveURL(/.*inventory.html/);
  454 |       await inventoryPage.verifyPageLoaded();
  455 |     });
  456 | 
  457 |     test('Multiple purchases in sequence', async ({ 
  458 |       inventoryPage, 
  459 |       cartPage, 
  460 |       checkoutStepOnePage,
  461 |       checkoutStepTwoPage,
  462 |       checkoutCompletePage,
  463 |       page 
  464 |     }) => {
  465 |       // Make multiple purchases in a row
  466 |       for (let i = 0; i < 2; i++) {
  467 |         await inventoryPage.addProductToCart(i);
  468 |         await inventoryPage.goToCart();
  469 |         await cartPage.proceedToCheckout();
  470 |         
  471 |         await checkoutStepOnePage.fillCheckoutInfo(`User${i}`, `Test${i}`, `1234${i}`);
  472 |         await checkoutStepOnePage.continueToNextStep();
  473 |         
  474 |         await checkoutStepTwoPage.completePurchase();
  475 |         
  476 |         await checkoutCompletePage.verifyPageLoaded();
  477 |         
  478 |         // Go back for next purchase
  479 |         await checkoutCompletePage.backToHome();
  480 |         await inventoryPage.verifyPageLoaded();
  481 |       }
  482 |     });
  483 | 
  484 |     test('Verify checkout complete page elements', async ({ 
  485 |       inventoryPage, 
  486 |       cartPage, 
  487 |       checkoutStepOnePage,
  488 |       checkoutStepTwoPage,
  489 |       checkoutCompletePage 
  490 |     }) => {
  491 |       // Complete a purchase to get to completion page
  492 |       await inventoryPage.addProductToCart(0);
  493 |       await inventoryPage.goToCart();
  494 |       await cartPage.proceedToCheckout();
  495 |       
  496 |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  497 |       await checkoutStepOnePage.continueToNextStep();
  498 |       
  499 |       await checkoutStepTwoPage.completePurchase();
  500 |       
  501 |       // Verify all elements
  502 |       const elements = await checkoutCompletePage.verifyAllElementsDisplayed();
  503 |       expect(elements.header).toBe(true);
  504 |       expect(elements.text).toBe(true);
  505 |       expect(elements.image).toBe(true);
  506 |       expect(elements.button).toBe(true);
  507 |       
  508 |       // Verify specific text content
  509 |       const headerText = await checkoutCompletePage.getCompletionHeader();
  510 |       // Actual text in SauceDemo is "Thank you for your order!" (case-sensitive)
  511 |       expect(headerText).toBe('Thank you for your order!');
  512 |       
  513 |       const completionText = await checkoutCompletePage.getCompletionText();
  514 |       expect(completionText).toContain('Your order has been dispatched');
  515 |     });
  516 |   });
  517 | 
  518 |   test.describe('Accessibility and UI Tests', () => {
  519 |     test('Verify checkout form accessibility', async ({ 
  520 |       inventoryPage, 
  521 |       cartPage, 
  522 |       checkoutStepOnePage,
  523 |       page 
  524 |     }) => {
  525 |       await inventoryPage.addProductToCart(0);
  526 |       await inventoryPage.goToCart();
  527 |       await cartPage.proceedToCheckout();
  528 |       
  529 |       // Check form field labels
  530 |       const firstNameInput = checkoutStepOnePage.firstNameInput;
  531 |       const lastNameInput = checkoutStepOnePage.lastNameInput;
  532 |       const postalCodeInput = checkoutStepOnePage.postalCodeInput;
  533 |       
  534 |       // Check ARIA attributes
  535 |       const firstNameId = await firstNameInput.getAttribute('id');
  536 |       const firstNameLabel = page.locator(`label[for="${firstNameId}"]`);
  537 |       await expect(firstNameLabel).toBeVisible();
  538 |       
  539 |       // Check tab order
  540 |       await firstNameInput.focus();
  541 |       await expect(firstNameInput).toBeFocused();
  542 |       
  543 |       await page.keyboard.press('Tab');
  544 |       await expect(lastNameInput).toBeFocused();
  545 |       
  546 |       await page.keyboard.press('Tab');
```