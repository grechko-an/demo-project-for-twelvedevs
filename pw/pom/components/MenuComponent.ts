import { Page, Locator, expect } from '@playwright/test';

/**
 * Menu Component Page Object Model for SauceDemo
 * Handles sidebar menu interactions
 */
export class MenuComponent {
  readonly page: Page;
  
  // Locators
  readonly menuContainer: Locator;
  readonly closeButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators with SauceDemo-specific selectors
    this.menuContainer = page.locator('.bm-menu');
    this.closeButton = page.locator('#react-burger-cross-btn');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  /**
   * Open menu (if not already open)
   */
  async open(): Promise<void> {
    const isOpen = await this.isOpen();
    if (!isOpen) {
      const menuButton = this.page.locator('#react-burger-menu-btn');
      await menuButton.click();
      await this.waitForMenuOpen();
    }
  }

  /**
   * Close menu (if open)
   */
  async close(): Promise<void> {
    const isOpen = await this.isOpen();
    if (isOpen) {
      await this.closeButton.click();
      await this.waitForMenuClose();
    }
  }

  /**
   * Check if menu is open
   */
  async isOpen(): Promise<boolean> {
    return await this.menuContainer.isVisible();
  }

  /**
   * Wait for menu to open
   */
  async waitForMenuOpen(timeout: number = 3000): Promise<void> {
    await expect(this.menuContainer).toBeVisible({ timeout });
  }

  /**
   * Wait for menu to close
   */
  async waitForMenuClose(timeout: number = 3000): Promise<void> {
    await expect(this.menuContainer).toBeHidden({ timeout });
  }

  /**
   * Click All Items link
   */
  async clickAllItems(): Promise<void> {
    await this.open();
    await this.allItemsLink.click();
  }

  /**
   * Click About link
   */
  async clickAbout(): Promise<void> {
    await this.open();
    await this.aboutLink.click();
  }

  /**
   * Click Logout link
   */
  async clickLogout(): Promise<void> {
    await this.open();
    await this.logoutLink.click();
  }

  /**
   * Click Reset App State link
   */
  async clickResetAppState(): Promise<void> {
    await this.open();
    await this.resetAppStateLink.click();
    // Wait for reset to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all menu items
   */
  async getMenuItems(): Promise<Array<{
    name: string;
    locator: Locator;
    isVisible: boolean;
  }>> {
    await this.open();
    
    return [
      {
        name: 'All Items',
        locator: this.allItemsLink,
        isVisible: await this.allItemsLink.isVisible()
      },
      {
        name: 'About',
        locator: this.aboutLink,
        isVisible: await this.aboutLink.isVisible()
      },
      {
        name: 'Logout',
        locator: this.logoutLink,
        isVisible: await this.logoutLink.isVisible()
      },
      {
        name: 'Reset App State',
        locator: this.resetAppStateLink,
        isVisible: await this.resetAppStateLink.isVisible()
      }
    ];
  }

  /**
   * Verify all menu items are present
   */
  async verifyAllMenuItemsPresent(): Promise<boolean> {
    const items = await this.getMenuItems();
    return items.every(item => item.isVisible);
  }

  /**
   * Get menu item by name
   */
  async getMenuItem(name: string): Promise<Locator | null> {
    const items = await this.getMenuItems();
    const item = items.find(i => i.name === name);
    return item ? item.locator : null;
  }

  /**
   * Take screenshot of menu
   */
  async takeMenuScreenshot(filename: string): Promise<void> {
    await this.open();
    await this.menuContainer.screenshot({ 
      path: `test-results/${filename}.png`
    });
    await this.close();
  }

  /**
   * Verify menu opens and closes correctly
   */
  async testMenuFunctionality(): Promise<{
    opens: boolean;
    closes: boolean;
    allItemsClickable: boolean;
    aboutClickable: boolean;
    logoutClickable: boolean;
    resetClickable: boolean;
  }> {
    // Test opening
    await this.open();
    const opens = await this.isOpen();
    
    // Test closing
    await this.close();
    const closes = !(await this.isOpen());
    
    // Test item clickability
    await this.open();
    const allItemsClickable = await this.allItemsLink.isEnabled();
    const aboutClickable = await this.aboutLink.isEnabled();
    const logoutClickable = await this.logoutLink.isEnabled();
    const resetClickable = await this.resetAppStateLink.isEnabled();
    
    await this.close();
    
    return {
      opens,
      closes,
      allItemsClickable,
      aboutClickable,
      logoutClickable,
      resetClickable
    };
  }

  /**
   * Reset app state and verify cart is empty
   */
  async resetAppStateAndVerify(): Promise<boolean> {
    // Get initial cart state
    const cartBadge = this.page.locator('.shopping_cart_badge');
    const hadItems = await cartBadge.isVisible();
    
    // Reset app state
    await this.clickResetAppState();
    
    // Verify cart is empty
    const cartEmpty = !(await cartBadge.isVisible());
    
    // Verify all "Add to cart" buttons are present (not "Remove")
    const removeButtons = this.page.locator('button:has-text("Remove")');
    const removeButtonsCount = await removeButtons.count();
    
    return cartEmpty && removeButtonsCount === 0;
  }

  /**
   * Logout and verify redirected to login page
   */
  async logoutAndVerify(): Promise<boolean> {
    await this.clickLogout();
    
    // Wait for navigation to login page
    await this.page.waitForURL('**/index.html', { timeout: 5000 });
    
    // Check if on login page
    const loginButton = this.page.locator('#login-button');
    return await loginButton.isVisible();
  }

  /**
   * Navigate to About page and verify new tab opens
   */
  async navigateToAboutAndVerify(): Promise<boolean> {
    // Get current page count
    const context = this.page.context();
    const pagesBefore = context.pages().length;
    
    // Click About link
    await this.clickAbout();
    
    // Wait for new tab to open
    await this.page.waitForTimeout(2000);
    
    // Check if new page was opened
    const pagesAfter = context.pages().length;
    
    return pagesAfter > pagesBefore;
  }
}