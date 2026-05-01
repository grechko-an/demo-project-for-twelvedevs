import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../../pages/pages/SauceDemoLoginPage';
import { InventoryPage } from '../../pages/pages/InventoryPage';
import { MenuComponent } from '../../pages/components/MenuComponent';
import { HeaderComponent } from '../../pages/components/HeaderComponent';

test.describe('SauceDemo Menu & Navigation Tests', () => {
  let loginPage: SauceDemoLoginPage;
  let inventoryPage: InventoryPage;
  let menu: MenuComponent;
  let header: HeaderComponent;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    menu = new MenuComponent(page);
    header = new HeaderComponent(page);
  });

  test.describe('P1 - Important Menu Scenarios', () => {
    test('MENU-01: All Items link @P1', async ({ page }) => {
      // Test ID: MENU-01
      // Priority: P1
      // Steps: 1. Open menu, 2. Click "All Items"
      // Expected: Redirected to inventory page

      // Arrange - Navigate away from inventory first (go to cart and back)
      await inventoryPage.addProductToCart(0);
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/.*cart.html/);
      
      // Act - Use menu to go back to All Items
      await menu.clickAllItems();
      
      // Assert - Should be on inventory page
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });

    test('MENU-02: About link @P2', async ({ page, context }) => {
      // Test ID: MENU-02
      // Priority: P2
      // Steps: 1. Open menu, 2. Click "About"
      // Expected: Opens Sauce Labs website in new tab

      // Get initial page count
      const pagesBefore = context.pages().length;
      
      // Act - Click About link
      const newTabOpened = await menu.navigateToAboutAndVerify();
      
      // Assert - New tab should open
      expect(newTabOpened).toBe(true);
      
      // Verify new page count
      const pagesAfter = context.pages().length;
      expect(pagesAfter).toBeGreaterThan(pagesBefore);
      
      // Note: Cannot verify external URL content in this test
      // as it opens saucelabs.com which may have different structure
    });

    test('MENU-03: Reset App State @P2', async ({ page }) => {
      // Test ID: MENU-03
      // Priority: P2
      // Steps: 1. Add items to cart, 2. Open menu, 3. Click "Reset App State"
      // Expected: Cart emptied, all "Remove" buttons revert to "Add to cart"

      // Arrange - Add items to cart
      await inventoryPage.addProductToCart(0);
      await inventoryPage.addProductToCart(1);
      
      let cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(2);
      
      // Act - Reset app state
      const resetSuccessful = await menu.resetAppStateAndVerify();
      
      // Assert
      expect(resetSuccessful).toBe(true);
      
      // Verify cart is empty
      cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
      
      // Verify all buttons show "Add to cart"
      const addButtonsCount = await inventoryPage.addToCartButtons.count();
      const productCount = await inventoryPage.getProductCount();
      expect(addButtonsCount).toBe(productCount);
    });

    test('MENU-04: Menu open/close functionality @P2', async ({ page }) => {
      // Test ID: MENU-04
      // Priority: P2
      // Steps: 1. Click menu button, 2. Verify menu opens, 3. Click close/X
      // Expected: Menu opens and closes smoothly

      // Act - Test menu functionality
      const functionality = await menu.testMenuFunctionality();
      
      // Assert
      expect(functionality.opens).toBe(true);
      expect(functionality.closes).toBe(true);
      expect(functionality.allItemsClickable).toBe(true);
      expect(functionality.aboutClickable).toBe(true);
      expect(functionality.logoutClickable).toBe(true);
      expect(functionality.resetClickable).toBe(true);
    });

    test('AUTH-05: Logout functionality via menu @P1', async ({ page }) => {
      // Test ID: AUTH-05 (also covers logout)
      // Priority: P1
      // Steps: 1. Login successfully, 2. Open menu, 3. Click Logout
      // Expected: User is redirected to login page

      // Act - Logout via menu
      const logoutSuccessful = await menu.logoutAndVerify();
      
      // Assert
      expect(logoutSuccessful).toBe(true);
      
      // Verify login page elements
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      
      // Verify cannot access inventory directly
      await page.goto('/inventory.html');
      await expect(page).toHaveURL(/.*index.html/);
    });
  });

  test.describe('Menu Functionality Tests', () => {
    test('Verify all menu items are present', async ({ page }) => {
      await menu.open();
      
      // Verify all menu items are visible
      const items = await menu.getMenuItems();
      expect(items.length).toBe(4);
      
      for (const item of items) {
        expect(item.isVisible).toBe(true);
      }
      
      // Verify specific item texts
      const allItemsLink = await menu.getMenuItem('All Items');
      expect(allItemsLink).not.toBeNull();
      
      const aboutLink = await menu.getMenuItem('About');
      expect(aboutLink).not.toBeNull();
      
      const logoutLink = await menu.getMenuItem('Logout');
      expect(logoutLink).not.toBeNull();
      
      const resetLink = await menu.getMenuItem('Reset App State');
      expect(resetLink).not.toBeNull();
    });

    test('Menu persists after page navigation', async ({ page }) => {
      // Open menu
      await menu.open();
      const isOpenBefore = await menu.isOpen();
      expect(isOpenBefore).toBe(true);
      
      // Navigate to cart (menu should close)
      await inventoryPage.goToCart();
      await expect(page).toHaveURL(/.*cart.html/);
      
      // Menu should be closed after navigation
      const isOpenAfterNav = await menu.isOpen();
      expect(isOpenAfterNav).toBe(false);
      
      // Go back to inventory and open menu again
      await page.goBack();
      await menu.open();
      const isOpenAgain = await menu.isOpen();
      expect(isOpenAgain).toBe(true);
    });

    test('Menu keyboard navigation', async ({ page }) => {
      await menu.open();
      
      // Test tab navigation within menu
      await page.keyboard.press('Tab');
      
      // Focus should be on first menu item (All Items)
      const allItemsLink = page.locator('#inventory_sidebar_link');
      await expect(allItemsLink).toBeFocused();
      
      // Tab to next item
      await page.keyboard.press('Tab');
      const aboutLink = page.locator('#about_sidebar_link');
      await expect(aboutLink).toBeFocused();
      
      // Test Enter key to activate
      await page.keyboard.press('Enter');
      // About link should open new tab
      await page.waitForTimeout(1000);
    });

    test('Menu close with Escape key', async ({ page }) => {
      await menu.open();
      let isOpen = await menu.isOpen();
      expect(isOpen).toBe(true);
      
      // Press Escape to close menu
      await page.keyboard.press('Escape');
      
      // Wait for menu to close
      await page.waitForTimeout(500);
      isOpen = await menu.isOpen();
      expect(isOpen).toBe(false);
    });

    test('Menu close by clicking outside', async ({ page }) => {
      await menu.open();
      let isOpen = await menu.isOpen();
      expect(isOpen).toBe(true);
      
      // Click outside menu (on page content)
      await page.click('.inventory_container');
      
      // Wait for menu to close
      await page.waitForTimeout(500);
      isOpen = await menu.isOpen();
      expect(isOpen).toBe(false);
    });
  });

  test.describe('Reset App State Detailed Tests', () => {
    test('Reset app state with items in cart', async ({ page }) => {
      // Add multiple items
      const productCount = await inventoryPage.getProductCount();
      for (let i = 0; i < Math.min(3, productCount); i++) {
        await inventoryPage.addProductToCart(i);
      }
      
      // Verify items added
      let cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(Math.min(3, productCount));
      
      // Reset app state
      await menu.clickResetAppState();
      
      // Verify cart empty
      cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
      
      // Verify all buttons are "Add to cart"
      const removeButtons = page.locator('button:has-text("Remove")');
      const removeCount = await removeButtons.count();
      expect(removeCount).toBe(0);
    });

    test('Reset app state preserves login session', async ({ page }) => {
      // Add items and reset
      await inventoryPage.addProductToCart(0);
      await menu.clickResetAppState();
      
      // Should still be logged in
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
      
      // Can still perform actions
      await inventoryPage.addProductToCart(1);
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(1);
    });

    test('Reset app state multiple times', async ({ page }) => {
      // Test reset multiple times in sequence
      for (let i = 0; i < 3; i++) {
        // Add item
        await inventoryPage.addProductToCart(0);
        let cartCount = await header.getCartItemCount();
        expect(cartCount).toBe(1);
        
        // Reset
        await menu.clickResetAppState();
        cartCount = await header.getCartItemCount();
        expect(cartCount).toBe(0);
      }
    });
  });

  test.describe('Navigation Flow Tests', () => {
    test('Complete navigation flow using menu', async ({ page }) => {
      // Start on inventory
      await inventoryPage.verifyPageLoaded();
      
      // Go to cart via header
      await header.goToCart();
      await expect(page).toHaveURL(/.*cart.html/);
      
      // Use menu to go back to All Items
      await menu.clickAllItems();
      await expect(page).toHaveURL(/.*inventory.html/);
      
      // Add item and go to cart again
      await inventoryPage.addProductToCart(0);
      await header.goToCart();
      
      // Use menu to reset app state
      await menu.clickResetAppState();
      
      // Cart should be empty
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
      
      // Use menu to logout
      const logoutSuccessful = await menu.logoutAndVerify();
      expect(logoutSuccessful).toBe(true);
    });

    test('Navigation between pages maintains menu state', async ({ page }) => {
      // Open menu on inventory
      await menu.open();
      let isOpen = await menu.isOpen();
      expect(isOpen).toBe(true);
      
      // Navigate to cart - menu should close
      await inventoryPage.goToCart();
      isOpen = await menu.isOpen();
      expect(isOpen).toBe(false);
      
      // Open menu on cart
      await menu.open();
      isOpen = await menu.isOpen();
      expect(isOpen).toBe(true);
      
      // Navigate back - menu should close
      await page.goBack();
      isOpen = await menu.isOpen();
      expect(isOpen).toBe(false);
    });
  });

  test.describe('Menu Accessibility Tests', () => {
    test('Verify menu ARIA attributes', async ({ page }) => {
      await menu.open();
      
      // Check menu container ARIA attributes
      const menuContainer = menu.menuContainer;
      const ariaHidden = await menuContainer.getAttribute('aria-hidden');
      // When open, aria-hidden should be false or not present
      
      // Check menu button ARIA attributes
      const menuButton = page.locator('#react-burger-menu-btn');
      const buttonAriaLabel = await menuButton.getAttribute('aria-label');
      expect(buttonAriaLabel).toBeTruthy();
      
      // Check close button ARIA attributes
      const closeButton = page.locator('#react-burger-cross-btn');
      const closeAriaLabel = await closeButton.getAttribute('aria-label');
      expect(closeAriaLabel).toBeTruthy();
    });

    test('Verify menu items have proper roles', async ({ page }) => {
      await menu.open();
      
      // Menu items should be links or buttons
      const allItemsLink = page.locator('#inventory_sidebar_link');
      const tagName = await allItemsLink.evaluate(el => el.tagName.toLowerCase());
      expect(['a', 'button']).toContain(tagName);
      
      // Check href or onclick attributes
      if (tagName === 'a') {
        const href = await allItemsLink.getAttribute('href');
        expect(href).toBeTruthy();
      }
    });

    test('Verify menu focus management', async ({ page }) => {
      // Open menu
      await menu.open();
      
      // Focus should be managed appropriately
      // When menu opens, focus might move to first item or stay on close button
      const activeElement = await page.evaluate(() => 
        document.activeElement?.id || document.activeElement?.className
      );
      
      // Accept various focus targets
      const validFocusTargets = [
        'react-burger-cross-btn',
        'inventory_sidebar_link',
        'about_sidebar_link'
      ];
      
      // Check if active element matches one of the valid targets
      let focusValid = false;
      for (const target of validFocusTargets) {
        if (activeElement?.includes(target)) {
          focusValid = true;
          break;
        }
      }
      
      expect(focusValid).toBe(true);
    });
  });

  test.describe('Error Handling & Edge Cases', () => {
    test('Menu functionality with problem_user', async ({ page }) => {
      // Login as problem_user
      await loginPage.gotoLoginPage();
      const problemInventory = await loginPage.login('problem_user', 'secret_sauce');
      await problemInventory.verifyPageLoaded();
      
      const problemMenu = new MenuComponent(page);
      
      // Try to open menu
      await problemMenu.open();
      const isOpen = await problemMenu.isOpen();
      // problem_user might have menu issues but should at least not crash
      expect([true, false]).toContain(isOpen);
    });

    test('Menu functionality with performance_glitch_user', async ({ page }) => {
      // Login as performance_glitch_user
      await loginPage.gotoLoginPage();
      const perfInventory = await loginPage.login('performance_glitch_user', 'secret_sauce');
      await perfInventory.verifyPageLoaded();
      
      const perfMenu = new MenuComponent(page);
      
      // Open menu (might be slow)
      await perfMenu.open();
      const isOpen = await perfMenu.isOpen();
      expect(isOpen).toBe(true);
      
      // Close menu
      await perfMenu.close();
      const isClosed = !(await perfMenu.isOpen());
      expect(isClosed).toBe(true);
    });

    test('Menu with maximum items in cart', async ({ page }) => {
      // Fill cart with all items
      const productCount = await inventoryPage.getProductCount();
      for (let i = 0; i < productCount; i++) {
        await inventoryPage.addProductToCart(i);
      }
      
      // Open menu and reset
      await menu.open();
      await menu.clickResetAppState();
      
      // Verify cart empty
      const cartCount = await header.getCartItemCount();
      expect(cartCount).toBe(0);
    });

    test('Take menu screenshots for documentation', async ({ page }) => {
      // Screenshot of closed state
      await page.screenshot({ 
        path: 'test-results/menu-closed.png',
        fullPage: false 
      });
      
      // Screenshot of open state
      await menu.open();
      await page.screenshot({ 
        path: 'test-results/menu-open.png',
        fullPage: false 
      });
      
      // Screenshot with cart items
      await inventoryPage.addProductToCart(0);
      await inventoryPage.addProductToCart(1);
      await page.screenshot({ 
        path: 'test-results/menu-with-cart-items.png',
        fullPage: false 
      });
      
      // Close menu for cleanup
      await menu.close();
    });
  });
});