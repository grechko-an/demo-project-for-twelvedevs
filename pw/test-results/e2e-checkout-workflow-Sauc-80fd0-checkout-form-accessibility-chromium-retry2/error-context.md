# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\checkout-workflow.spec.ts >> SauceDemo Checkout Workflow Tests >> Accessibility and UI Tests >> Verify checkout form accessibility
- Location: tests\e2e\checkout-workflow.spec.ts:519:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('label[for="first-name"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('label[for="first-name"]')

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
      - generic [ref=e16]: "Checkout: Your Information"
    - generic [ref=e19]:
      - generic [ref=e20]:
        - textbox "First Name" [ref=e22]
        - textbox "Last Name" [ref=e24]
        - textbox "Zip/Postal Code" [ref=e26]
      - generic [ref=e28]:
        - button "Go back Cancel" [ref=e29] [cursor=pointer]:
          - img "Go back" [ref=e30]
          - text: Cancel
        - button "Continue" [ref=e31] [cursor=pointer]
  - contentinfo [ref=e32]:
    - list [ref=e33]:
      - listitem [ref=e34]:
        - link "Twitter" [ref=e35] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e36]:
        - link "Facebook" [ref=e37] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e38]:
        - link "LinkedIn" [ref=e39] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e40]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  437 |       
  438 |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  439 |       await checkoutStepOnePage.continueToNextStep();
  440 |       
  441 |       await checkoutStepTwoPage.completePurchase();
  442 |       
  443 |       // Validate post-purchase state
  444 |       const validation = await checkoutCompletePage.validatePostPurchaseState();
  445 |       
  446 |       expect(validation.orderComplete).toBe(true);
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
> 537 |       await expect(firstNameLabel).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
  538 |       
  539 |       // Check tab order
  540 |       await firstNameInput.focus();
  541 |       await expect(firstNameInput).toBeFocused();
  542 |       
  543 |       await page.keyboard.press('Tab');
  544 |       await expect(lastNameInput).toBeFocused();
  545 |       
  546 |       await page.keyboard.press('Tab');
  547 |       await expect(postalCodeInput).toBeFocused();
  548 |     });
  549 | 
  550 |     test('Take checkout workflow screenshots', async ({ 
  551 |       inventoryPage, 
  552 |       cartPage, 
  553 |       checkoutStepOnePage,
  554 |       checkoutStepTwoPage,
  555 |       page 
  556 |     }) => {
  557 |       // Document entire checkout workflow
  558 |       await inventoryPage.addProductToCart(0);
  559 |       await page.screenshot({ 
  560 |         path: 'test-results/checkout-1-cart-added.png',
  561 |         fullPage: false 
  562 |       });
  563 |       
  564 |       await inventoryPage.goToCart();
  565 |       await page.screenshot({ 
  566 |         path: 'test-results/checkout-2-cart-page.png',
  567 |         fullPage: true 
  568 |       });
  569 |       
  570 |       await cartPage.proceedToCheckout();
  571 |       await page.screenshot({ 
  572 |         path: 'test-results/checkout-3-step-one.png',
  573 |         fullPage: true 
  574 |       });
  575 |       
  576 |       await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
  577 |       await page.screenshot({ 
  578 |         path: 'test-results/checkout-4-form-filled.png',
  579 |         fullPage: false 
  580 |       });
  581 |       
  582 |       await checkoutStepOnePage.continueToNextStep();
  583 |       await page.screenshot({ 
  584 |         path: 'test-results/checkout-5-step-two.png',
  585 |         fullPage: true 
  586 |       });
  587 |       
  588 |       await checkoutStepTwoPage.completePurchase();
  589 |       await page.screenshot({ 
  590 |         path: 'test-results/checkout-6-complete.png',
  591 |         fullPage: true 
  592 |       });
  593 |     });
  594 |   });
  595 | });
```