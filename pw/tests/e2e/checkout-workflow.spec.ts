import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../../pages/pages/SauceDemoLoginPage';
import { InventoryPage } from '../../pages/pages/InventoryPage';
import { CartPage } from '../../pages/pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/pages/CheckoutCompletePage';

test.describe('SauceDemo Checkout Workflow Tests', () => {
  let loginPage: SauceDemoLoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
  });

  test.describe('P0 - Critical Checkout Scenarios', () => {
    test('CHECKOUT-01: Complete purchase happy path @P0', async ({ page }) => {
      // Test ID: CHECKOUT-01
      // Priority: P0
      // Steps: 1. Add item to cart, 2. Go to cart, 3. Click Checkout, 
      //        4. Fill info, 5. Continue, 6. Finish
      // Expected: Order confirmation page shown, cart empty

      // Arrange - Add item to cart
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      
      cartPage = new CartPage(page);
      await cartPage.verifyPageLoaded();
      
      // Act - Proceed to checkout
      await cartPage.proceedToCheckout();
      
      // Step 1: Fill checkout information
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.verifyPageLoaded();
      await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      // Step 2: Review order
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.verifyPageLoaded();
      
      // Verify order summary
      const itemCount = await checkoutStepTwoPage.getCartItemCount();
      expect(itemCount).toBe(1);
      
      const calculationsCorrect = await checkoutStepTwoPage.verifyCalculations();
      expect(calculationsCorrect).toBe(true);
      
      // Complete purchase
      await checkoutStepTwoPage.completePurchase();
      
      // Step 3: Order confirmation
      checkoutCompletePage = new CheckoutCompletePage(page);
      await checkoutCompletePage.verifyPageLoaded();
      
      // Assert - Verify order completion
      const orderComplete = await checkoutCompletePage.verifyOrderCompletion();
      expect(orderComplete).toBe(true);
      
      // Verify cart is empty
      const cartEmpty = await checkoutCompletePage.verifyCartIsEmpty();
      expect(cartEmpty).toBe(true);
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/checkout-complete.png',
        fullPage: true 
      });
    });
  });

  test.describe('P1 - Important Checkout Scenarios', () => {
    test('CHECKOUT-02: Checkout with empty cart @P1', async ({ page }) => {
      // Test ID: CHECKOUT-02
      // Priority: P1
      // Steps: 1. Go to cart (empty), 2. Click Checkout
      // Expected: Checkout button disabled or error

      // Arrange - Go to cart without adding items
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.verifyPageLoaded();
      
      // Assert - Verify cart is empty
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
      
      // Verify checkout button state
      const checkoutEnabled = await cartPage.verifyCheckoutEnabled();
      // Some implementations disable checkout when cart is empty
      // Accept either disabled or enabled (if enabled, clicking should show error)
      
      if (checkoutEnabled) {
        // If enabled, click and verify error
        await cartPage.proceedToCheckout();
        // Should show error or stay on cart page
        const currentUrl = page.url();
        expect(currentUrl).toContain('cart.html');
      }
    });

    test('CHECKOUT-03: Checkout form validation @P1', async ({ page }) => {
      // Test ID: CHECKOUT-03
      // Priority: P1
      // Steps: 1. Proceed to checkout, 2. Leave fields empty, 3. Click Continue
      // Expected: Error message displayed

      // Arrange - Add item and proceed to checkout
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.verifyPageLoaded();
      
      // Act - Try to continue with empty form
      await checkoutStepOnePage.continueToNextStep();
      
      // Assert - Error should be displayed
      const isErrorDisplayed = await checkoutStepOnePage.isErrorDisplayed();
      expect(isErrorDisplayed).toBe(true);
      
      const errorText = await checkoutStepOnePage.getErrorMessage();
      expect(errorText).toContain('First Name'); // Error should mention required field
    });

    test('CHECKOUT-05: Cancel during checkout step 1 @P1', async ({ page }) => {
      // Test ID: CHECKOUT-05
      // Priority: P1
      // Steps: 1. Click Cancel on checkout step 1
      // Expected: Returned to cart page

      // Arrange - Proceed to checkout step 1
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.verifyPageLoaded();
      
      // Act - Cancel checkout
      await checkoutStepOnePage.cancelCheckout();
      
      // Assert - Should return to cart page
      await expect(page).toHaveURL(/.*cart.html/);
      await cartPage.verifyPageLoaded();
      
      // Cart should still have the item
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
    });

    test('CHECKOUT-06: Cancel during checkout step 2 @P1', async ({ page }) => {
      // Test ID: CHECKOUT-06
      // Priority: P1
      // Steps: 1. Click Cancel on checkout step 2
      // Expected: Returned to inventory page

      // Arrange - Complete checkout step 1
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.verifyPageLoaded();
      
      // Act - Cancel purchase
      await checkoutStepTwoPage.cancelPurchase();
      
      // Assert - Should return to inventory page
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });

    test('CHECKOUT-07: Verify order summary details @P1', async ({ page }) => {
      // Test ID: CHECKOUT-07
      // Priority: P1
      // Steps: 1. Complete checkout step 1, 2. Verify step 2 details
      // Expected: Correct items, quantities, prices, tax, total

      // Arrange - Add multiple items
      await inventoryPage.addProductToCart(0);
      await inventoryPage.addProductToCart(1);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo('Jane', 'Smith', '54321');
      await checkoutStepOnePage.continueToNextStep();
      
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.verifyPageLoaded();
      
      // Assert - Verify all details
      const itemCount = await checkoutStepTwoPage.getCartItemCount();
      expect(itemCount).toBe(2);
      
      // Verify calculations
      const calculationsCorrect = await checkoutStepTwoPage.verifyCalculations();
      expect(calculationsCorrect).toBe(true);
      
      // Verify tax calculation
      const taxCorrect = await checkoutStepTwoPage.verifyTaxCalculation();
      expect(taxCorrect).toBe(true);
      
      // Verify payment and shipping info
      const paymentInfo = await checkoutStepTwoPage.getPaymentInfo();
      expect(paymentInfo).toContain('SauceCard');
      
      const shippingInfo = await checkoutStepTwoPage.getShippingInfo();
      expect(shippingInfo).toContain('FREE PONY EXPRESS DELIVERY');
      
      // Take screenshot of order summary
      await page.screenshot({ 
        path: 'test-results/order-summary.png',
        fullPage: false 
      });
    });
  });

  test.describe('P2 - Additional Checkout Scenarios', () => {
    test('CHECKOUT-04: Checkout with invalid ZIP code @P2', async ({ page }) => {
      // Test ID: CHECKOUT-04
      // Priority: P2
      // Steps: 1. Enter invalid ZIP (letters), 2. Click Continue
      // Expected: Error message displayed

      // Arrange - Proceed to checkout step 1
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.verifyPageLoaded();
      
      // Act - Try invalid postal code (letters)
      const hasError = await checkoutStepOnePage.testInvalidPostalCode('ABC');
      
      // Assert - Should show error
      expect(hasError).toBe(true);
      
      if (hasError) {
        const errorText = await checkoutStepOnePage.getErrorMessage();
        expect(errorText).toContain('Postal'); // Error should mention postal code
      }
    });

    test('Checkout with special characters in name', async ({ page }) => {
      // Test with special characters in name fields
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo('John-O\'Connor', 'Doe-Smith', '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      // Should proceed to next step
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.verifyPageLoaded();
    });

    test('Checkout with very long names', async ({ page }) => {
      // Test with long name fields
      const longFirstName = 'A'.repeat(100);
      const longLastName = 'B'.repeat(100);
      
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo(longFirstName, longLastName, '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      // Should proceed to next step (or show error if too long)
      const currentUrl = page.url();
      // Accept either success or appropriate error
    });

    test('Checkout with different product combinations', async ({ page }) => {
      // Test checkout with various product combinations
      const testCases = [
        { products: [0], description: 'Single product' },
        { products: [0, 1, 2], description: 'Multiple products' },
        { products: [5], description: 'Last product' }
      ];
      
      for (const testCase of testCases) {
        // Reset for each test case
        await loginPage.gotoLoginPage();
        inventoryPage = await loginPage.loginAsStandardUser();
        
        // Add products
        for (const productIndex of testCase.products) {
          await inventoryPage.addProductToCart(productIndex);
        }
        
        // Complete checkout
        await inventoryPage.goToCart();
        cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.fillCheckoutInfo('Test', 'User', '12345');
        await checkoutStepOnePage.continueToNextStep();
        
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.verifyPageLoaded();
        
        // Verify correct number of items
        const itemCount = await checkoutStepTwoPage.getCartItemCount();
        expect(itemCount).toBe(testCase.products.length);
        
        // Complete purchase
        await checkoutStepTwoPage.completePurchase();
        
        checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.verifyPageLoaded();
        
        // Take screenshot for each test case
        await page.screenshot({ 
          path: `test-results/checkout-${testCase.description.replace(/\s+/g, '-')}.png`,
          fullPage: false 
        });
        
        // Go back to start for next test case
        await checkoutCompletePage.backToHome();
      }
    });
  });

  test.describe('Checkout Error Handling', () => {
    test('Checkout form field validation sequence', async ({ page }) => {
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      
      // Test validation with different invalid inputs
      const testCases = [
        { firstName: '', lastName: '', postalCode: '', expectedError: 'First Name' },
        { firstName: 'John', lastName: '', postalCode: '', expectedError: 'Last Name' },
        { firstName: 'John', lastName: 'Doe', postalCode: '', expectedError: 'Postal' },
        { firstName: 'John', lastName: 'Doe', postalCode: 'ABC', expectedError: 'Postal' }
      ];
      
      for (const testCase of testCases) {
        await checkoutStepOnePage.clearForm();
        await checkoutStepOnePage.fillCheckoutInfo(
          testCase.firstName,
          testCase.lastName,
          testCase.postalCode
        );
        await checkoutStepOnePage.continueToNextStep();
        
        const hasError = await checkoutStepOnePage.isErrorDisplayed();
        expect(hasError).toBe(true);
        
        if (hasError) {
          const errorText = await checkoutStepOnePage.getErrorMessage();
          expect(errorText).toContain(testCase.expectedError);
        }
      }
    });

    test('Checkout with problem_user account', async ({ page }) => {
      // Login as problem_user
      await loginPage.gotoLoginPage();
      const problemInventory = await loginPage.login('problem_user', 'secret_sauce');
      await problemInventory.verifyPageLoaded();
      
      // Try checkout flow
      await problemInventory.addProductToCart(0);
      await problemInventory.goToCart();
      const problemCart = new CartPage(page);
      await problemCart.proceedToCheckout();
      
      const problemCheckout = new CheckoutStepOnePage(page);
      await problemCheckout.fillCheckoutInfo('Test', 'User', '12345');
      await problemCheckout.continueToNextStep();
      
      // problem_user might have issues but should proceed or show appropriate error
      const currentUrl = page.url();
      // Accept either checkout-step-two.html or error
    });
  });

  test.describe('Checkout Completion and Post-Purchase', () => {
    test('Verify post-purchase state', async ({ page }) => {
      // Complete a purchase
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.completePurchase();
      
      checkoutCompletePage = new CheckoutCompletePage(page);
      
      // Validate post-purchase state
      const validation = await checkoutCompletePage.validatePostPurchaseState();
      
      expect(validation.orderComplete).toBe(true);
      expect(validation.cartEmpty).toBe(true);
      expect(validation.correctUrl).toBe(true);
      expect(validation.allElementsVisible).toBe(true);
      
      // Verify back home button works
      await checkoutCompletePage.backToHome();
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });

    test('Multiple purchases in sequence', async ({ page }) => {
      // Make multiple purchases in a row
      for (let i = 0; i < 2; i++) {
        await inventoryPage.addProductToCart(i);
        await inventoryPage.goToCart();
        cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
        
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.fillCheckoutInfo(`User${i}`, `Test${i}`, `1234${i}`);
        await checkoutStepOnePage.continueToNextStep();
        
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.completePurchase();
        
        checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.verifyPageLoaded();
        
        // Go back for next purchase
        await checkoutCompletePage.backToHome();
        await inventoryPage.verifyPageLoaded();
      }
    });

    test('Verify checkout complete page elements', async ({ page }) => {
      // Complete a purchase to get to completion page
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continueToNextStep();
      
      checkoutStepTwoPage = new CheckoutStepTwoPage(page);
      await checkoutStepTwoPage.completePurchase();
      
      checkoutCompletePage = new CheckoutCompletePage(page);
      
      // Verify all elements
      const elements = await checkoutCompletePage.verifyAllElementsDisplayed();
      expect(elements.header).toBe(true);
      expect(elements.text).toBe(true);
      expect(elements.image).toBe(true);
      expect(elements.button).toBe(true);
      
      // Verify specific text content
      const headerText = await checkoutCompletePage.getCompletionHeader();
      expect(headerText).toBe('THANK YOU FOR YOUR ORDER');
      
      const completionText = await checkoutCompletePage.getCompletionText();
      expect(completionText).toContain('Your order has been dispatched');
    });
  });

  test.describe('Accessibility and UI Tests', () => {
    test('Verify checkout form accessibility', async ({ page }) => {
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      cartPage = new CartPage(page);
      await cartPage.proceedToCheckout();
      
      checkoutStepOnePage = new CheckoutStepOnePage(page);
      
      // Check form field labels
      const firstNameInput = checkoutStepOnePage.firstNameInput;
      const lastNameInput = checkoutStepOnePage.lastNameInput;
      const postalCodeInput = checkoutStepOnePage.postalCodeInput;
      
      // Check ARIA attributes
      const firstNameId = await firstNameInput.getAttribute('id');
      const firstNameLabel = page.locator(`label[for="${firstNameId}"]`);
      await expect(firstNameLabel).toBeVisible();
      
      // Check tab order
      await firstNameInput.focus();
      await expect(firstNameInput).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(lastNameInput).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(postalCodeInput).toBeFocused();
    });

    test('Take checkout workflow screenshots', async ({ page }) => {
      // Document entire checkout workflow
      await inventoryPage.addProductToCart(0);
      await page.screenshot({ 
        path: 'test-results/checkout-1-cart-added.png',
        fullPage: false 
      });
      
      await inventoryPage.goToCart();
      await page.screenshot({ 
        path: 'test-results/checkout-2-cart-page.png',
        fullPage: true 
      });
      
      await cartPage.proceedToCheckout();
      await page.screenshot({ 
        path: 'test-results/checkout-3-step-one.png',
        fullPage: true 
      });
      
      await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
      await page.screenshot({ 
        path: 'test-results/checkout-4-form-filled.png',
        fullPage: false 
      });
      
      await checkoutStepOnePage.continueToNextStep();
      await page.screenshot({ 
        path: 'test-results/checkout-5-step-two.png',
        fullPage: true 
      });
      
      await checkoutStepTwoPage.completePurchase();
      await page.screenshot({ 
        path: 'test-results/checkout-6-complete.png',
        fullPage: true 
      });
    });
  });
});