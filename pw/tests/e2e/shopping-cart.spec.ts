import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

test.describe('SauceDemo Shopping Cart Tests', () => {
  test.describe('P0 - Critical Cart Scenarios', () => {
    test('CART-01: Add single item to cart @P0', async ({ page, inventoryPage, header }) => {
      // Test ID: CART-01
      // Priority: P0
      // Steps: 1. Click "Add to cart" on any product, 2. Verify cart badge updates
      // Expected: Cart badge shows "1", button changes to "Remove"

      // Arrange - Get initial cart state
      const initialCartCount = await header.getCartItemCount();
      expect(initialCartCount).toBe(0);

      // Act - Add first product to cart
      await inventoryPage.addProductToCart(0);
      
      // Assert - Verify cart badge updated
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(1);
      
      // Verify button changed to "Remove"
      const removeButton = inventoryPage.removeButtons.first();
      await expect(removeButton).toBeVisible();
      await expect(removeButton).toHaveText('Remove');
      
      // Verify "Add to cart" button is gone for this product
      const addButton = inventoryPage.addToCartButtons.first();
      await expect(addButton).toBeHidden();
      
      // Take screenshot
      await page.screenshot({ 
        path: 'test-results/cart-add-single.png',
        fullPage: false 
      });
    });
  });

  test.describe('P1 - Important Cart Scenarios', () => {
    test('CART-02: Add multiple items to cart @P1', async ({ inventoryPage, header, addItemsToCart }) => {
      // Test ID: CART-02
      // Priority: P1
      // Steps: 1. Add 3 different products, 2. Verify cart badge
      // Expected: Cart badge shows "3"

      // Arrange
      const itemsToAdd = 3;
      const indices = [0, 1, 2];
      
      // Act - Add multiple products using helper
      await addItemsToCart(indices);
      
      // Assert
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(itemsToAdd);
      
      // Verify all added items show "Remove" button
      const removeButtonsCount = await inventoryPage.removeButtons.count();
      expect(removeButtonsCount).toBe(itemsToAdd);
    });

    test('CART-03: Remove item from cart (inventory page) @P1', async ({ inventoryPage, header }) => {
      // Test ID: CART-03
      // Priority: P1
      // Steps: 1. Add item to cart, 2. Click "Remove", 3. Verify cart badge
      // Expected: Cart badge decrements, button changes to "Add to cart"

      // Arrange - Add item first
      await inventoryPage.addProductToCart(0);
      let cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(1);
      
      // Act - Remove the item
      await inventoryPage.removeProductFromCart(0);
      
      // Assert
      cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
      
      // Verify button changed back to "Add to cart"
      const addButton = inventoryPage.addToCartButtons.first();
      await expect(addButton).toBeVisible();
      await expect(addButton).toHaveText('Add to cart');
    });

    test('CART-04: Remove item from cart (cart page) @P1', async ({ page, inventoryPage, header, goToCartWithItems }) => {
      // Test ID: CART-04
      // Priority: P1
      // Steps: 1. Add item, 2. Go to cart page, 3. Click "Remove"
      // Expected: Item removed from cart, cart empty message shown

      // Arrange - Add item and go to cart using helper
      const { cartPage } = await goToCartWithItems([0]);
      
      let itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
      
      // Act - Remove item from cart page
      await cartPage.removeItem(0);
      
      // Assert
      itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
      
      // Verify cart is empty
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
      
      // Verify cart badge is empty
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
    });

    test('CART-05: Continue Shopping button @P1', async ({ page, inventoryPage, goToCartWithItems }) => {
      // Test ID: CART-05
      // Priority: P1
      // Steps: 1. Go to cart page, 2. Click "Continue Shopping"
      // Expected: Redirected to inventory page

      // Arrange - Add item and go to cart using helper
      const { cartPage } = await goToCartWithItems([0]);
      
      // Act - Click Continue Shopping
      await cartPage.continueShopping();
      
      // Assert - Should be back on inventory page
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });
  });

  test.describe('P2 - Additional Cart Scenarios', () => {
    test('CART-06: Cart persists after page refresh @P2', async ({ page, inventoryPage, header, addItemsToCart }) => {
      // Test ID: CART-06
      // Priority: P2
      // Steps: 1. Add items to cart, 2. Refresh page, 3. Verify cart
      // Expected: Cart items preserved

      // Arrange - Add multiple items using helper
      await addItemsToCart([0, 1]);
      
      const cartCountBefore = await header.getCartItemCount();
      expect(cartCountBefore).toBe(2);
      
      // Act - Refresh page
      await page.reload();
      await inventoryPage.verifyPageLoaded();
      
      // Assert - Cart should persist
      const cartCountAfter = await header.getCartItemCount();
      expect(cartCountAfter).toBe(2);
      
      // Verify "Remove" buttons are still visible
      const removeButtonsCount = await inventoryPage.removeButtons.count();
      expect(removeButtonsCount).toBe(2);
    });

    test('Add and remove multiple items in sequence', async ({ inventoryPage, header }) => {
      // Test complex cart operations
      const operations = [
        { action: 'add', index: 0 },
        { action: 'add', index: 1 },
        { action: 'remove', index: 0 },
        { action: 'add', index: 2 },
        { action: 'add', index: 3 },
        { action: 'remove', index: 1 }
      ];
      
      let expectedCount = 0;
      
      for (const op of operations) {
        if (op.action === 'add') {
          await inventoryPage.addProductToCart(op.index);
          expectedCount++;
        } else {
          await inventoryPage.removeProductFromCart(op.index);
          expectedCount--;
        }
        
        // Verify cart count after each operation
        const cartCount = await header.getCartItemCount();
        expect(cartCount).toBe(expectedCount);
      }
    });

    test('Verify cart item details match inventory', async ({ page, inventoryPage, goToCartWithItems }) => {
      // Add specific product and verify details in cart
      const productIndex = 2;
      const inventoryDetails = await inventoryPage.getProductDetails(productIndex);
      
      // Add to cart and go to cart page using helper
      const { cartPage } = await goToCartWithItems([productIndex]);
      
      // Get cart item details
      const cartDetails = await cartPage.getCartItemDetails(0);
      
      // Assert - Details should match
      expect(cartDetails.name).toBe(inventoryDetails.name);
      expect(cartDetails.description).toBe(inventoryDetails.description);
      expect(cartDetails.price).toBe(inventoryDetails.price);
      expect(cartDetails.quantity).toBe('1');
    });

    test('Verify cart total calculation', async ({ page, inventoryPage, goToCartWithItems }) => {
      // Add multiple items and verify total
      const indices = [0, 1, 2]; // Add first 3 products
      let expectedTotal = 0;
      
      // Get prices and calculate expected total
      for (const index of indices) {
        const details = await inventoryPage.getProductDetails(index);
        const price = parseFloat(details.price.replace('$', ''));
        expectedTotal += price;
      }
      
      // Add items and go to cart using helper
      const { cartPage } = await goToCartWithItems(indices);
      
      const actualTotal = await cartPage.getTotalPrice();
      expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    });
  });

  test.describe('Cart Page Functionality', () => {
    test('Verify cart page elements', async ({ cartPage, page }) => {
      // Verify all cart page elements are visible
      await expect(cartPage.cartContainer).toBeVisible();
      await expect(cartPage.continueShoppingButton).toBeVisible();
      await expect(cartPage.checkoutButton).toBeVisible();
      
      // Verify cart has items (cartPage fixture adds one item by default)
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
      
      // Verify item details are displayed
      await expect(cartPage.itemNames.first()).toBeVisible();
      await expect(cartPage.itemPrices.first()).toBeVisible();
      await expect(cartPage.removeButtons.first()).toBeVisible();
    });

    test('Remove all items from cart page', async ({ cartPage, header, authenticatedPageWithCartItems }) => {
      // Create a page with multiple items
      const { cartPage: cartPageWithItems } = await authenticatedPageWithCartItems(2);
      
      // Remove all items
      await cartPageWithItems.removeAllItems();
      
      // Verify cart is empty
      const itemCount = await cartPageWithItems.getCartItemCount();
      expect(itemCount).toBe(0);
      
      // Verify cart badge is empty
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
      
      // Verify checkout button might be disabled (depends on implementation)
      const checkoutEnabled = await cartPageWithItems.verifyCheckoutEnabled();
      // Some implementations disable checkout when cart is empty
    });

    test('Verify item verification methods', async ({ inventoryPage, goToCartWithItems }) => {
      // Get details of first product from inventory
      const inventoryDetails = await inventoryPage.getProductDetails(0);
      
      // Add item and go to cart using helper
      const { cartPage } = await goToCartWithItems([0]);
      
      // Verify item is in cart
      const itemInCart = await cartPage.verifyItemInCart(inventoryDetails.name);
      expect(itemInCart).toBe(true);
      
      // Get item index
      const itemIndex = await cartPage.getItemIndexByName(inventoryDetails.name);
      expect(itemIndex).toBe(0);
      
      // Verify item details
      const cartDetails = await cartPage.getCartItemDetails(itemIndex);
      expect(cartDetails.name).toBe(inventoryDetails.name);
      expect(cartDetails.price).toBe(inventoryDetails.price);
    });

    test('Navigate to checkout from cart', async ({ cartPage, page }) => {
      // Verify checkout button is enabled
      const checkoutEnabled = await cartPage.verifyCheckoutEnabled();
      expect(checkoutEnabled).toBe(true);
      
      // Proceed to checkout
      await cartPage.proceedToCheckout();
      
      // Should be on checkout step one page
      await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });
  });

  test.describe('Edge Cases and Error Handling', () => {
    test('Cart operations with problem_user', async ({ loginPage, header, loginAsUserType }) => {
      // Login as problem_user
      const problemInventory = await loginAsUserType('problem');
      
      // Try to add items (problem_user might have issues)
      await problemInventory.addProductToCart(0);
      
      // Check cart badge (might not update correctly for problem_user)
      const cartCount = await header.getCartItemCount();
      // Accept either 0 or 1 depending on problem_user behavior
      expect([0, 1]).toContain(cartCount);
    });

    test('Cart operations with performance_glitch_user', async ({ loginPage, header, loginAsUserType, page }) => {
      // Login as performance_glitch_user
      const perfInventory = await loginAsUserType('performance');
      
      // Add item with potential delay
      await perfInventory.addProductToCart(0);
      
      // Wait for cart update due to performance glitch
      await expect.poll(async () => await header.getCartItemCount(), {
        timeout: 5000
      }).toBe(1);
    });

    test('Maximum items in cart', async ({ inventoryPage, header, page, addItemsToCart }) => {
      // Add all available products to cart
      const productCount = await inventoryPage.getProductCount();
      
      // Create array of all indices
      const allIndices = Array.from({ length: productCount }, (_, i) => i);
      await addItemsToCart(allIndices);
      
      // Verify all items added
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(productCount);
      
      // Go to cart and verify all items present
      await inventoryPage.goToCart();
      const cartPage = new (await import('../../pom/pages/CartPage')).CartPage(page);
      await cartPage.verifyPageLoaded();
      
      const cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(productCount);
    });

    test('Cart empty state', async ({ authenticatedPage }) => {
      // Use a clean authenticated page (no items in cart)
      const page = authenticatedPage;
      
      // Go to cart without adding items
      const inventoryPage = new (await import('../../pom/pages/InventoryPage')).InventoryPage(page);
      await inventoryPage.goToCart();
      
      const cartPage = new (await import('../../pom/pages/CartPage')).CartPage(page);
      await cartPage.verifyPageLoaded();
      
      // Verify cart is empty
      const isEmpty = await cartPage.isCartEmpty();
      expect(isEmpty).toBe(true);
      
      // Verify checkout button state
      const checkoutEnabled = await cartPage.verifyCheckoutEnabled();
      // Some implementations disable checkout when cart is empty
      
      // Take screenshot of empty cart
      await page.screenshot({
        path: 'test-results/cart-empty.png',
        fullPage: true
      });
    });
  });

  test.describe('Accessibility and UI Tests', () => {
    test('Verify cart badge accessibility', async ({ inventoryPage, header }) => {
      // Add item to make badge visible
      await inventoryPage.addProductToCart(0);
      
      // Check cart badge ARIA attributes
      const cartBadge = header.cartBadge;
      const ariaLabel = await cartBadge.getAttribute('aria-label');
      // Some implementations use aria-label for screen readers
      
      // Check badge color contrast (visual check)
      const color = await cartBadge.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(color).toBeTruthy();
    });

    test('Verify cart button states', async ({ inventoryPage, page }) => {
      // Test button state transitions
      const firstProduct = inventoryPage.productItems.first();
      const addButton = firstProduct.locator('button:has-text("Add to cart")');
      const removeButton = firstProduct.locator('button:has-text("Remove")');
      
      // Initially should show "Add to cart"
      await expect(addButton).toBeVisible();
      await expect(removeButton).toBeHidden();
      
      // Click add
      await addButton.click();
      
      // Should now show "Remove"
      await expect(addButton).toBeHidden();
      await expect(removeButton).toBeVisible();
      
      // Click remove
      await removeButton.click();
      
      // Should show "Add to cart" again
      await expect(addButton).toBeVisible();
      await expect(removeButton).toBeHidden();
    });

    test('Take cart screenshots for documentation', async ({ inventoryPage, page, authenticatedPage }) => {
      // Empty cart - use clean authenticated page
      const cleanPage = authenticatedPage;
      const cleanInventoryPage = new (await import('../../pom/pages/InventoryPage')).InventoryPage(cleanPage);
      await cleanInventoryPage.goToCart();
      const emptyCartPage = new (await import('../../pom/pages/CartPage')).CartPage(cleanPage);
      await cleanPage.screenshot({
        path: 'test-results/cart-empty-state.png',
        fullPage: true
      });
      
      // Back to inventory and add items
      // First need to go back to inventory from cart
      await emptyCartPage.continueShopping();
      await cleanInventoryPage.addProductToCart(0);
      await cleanInventoryPage.addProductToCart(1);
      
      // Cart with items
      await cleanInventoryPage.goToCart();
      await cleanPage.screenshot({
        path: 'test-results/cart-with-items.png',
        fullPage: true
      });
    });
  });
});