import { Page, Locator, expect } from '@playwright/test';

/**
 * Header Component Page Object Model for SauceDemo
 * Reusable component for header elements across pages
 */
export class HeaderComponent {
  readonly page: Page;
  
  // Locators
  readonly headerContainer: Locator;
  readonly menuButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly cartBadge: Locator;
  readonly appLogo: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators with SauceDemo-specific selectors
    this.headerContainer = page.locator('.primary_header');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.appLogo = page.locator('.app_logo');
    this.title = page.locator('.title');
  }

  /**
   * Get cart item count from badge
   */
  async getCartItemCount(): Promise<number> {
    const badgeVisible = await this.cartBadge.isVisible();
    if (!badgeVisible) {
      return 0;
    }
    const countText = await this.cartBadge.textContent();
    return parseInt(countText || '0', 10);
  }

  /**
   * Verify cart badge shows specific count
   */
  async verifyCartBadgeCount(expectedCount: number): Promise<boolean> {
    const actualCount = await this.getCartItemCount();
    return actualCount === expectedCount;
  }

  /**
   * Navigate to cart page
   */
  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  /**
   * Open menu
   */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
    // Wait for menu animation
    await this.page.waitForTimeout(300);
  }

  /**
   * Get app logo text
   */
  async getAppLogoText(): Promise<string> {
    return await this.appLogo.textContent() || '';
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.title.textContent() || '';
  }

  /**
   * Verify header is visible
   */
  async isHeaderVisible(): Promise<boolean> {
    return await this.headerContainer.isVisible();
  }

  /**
   * Verify shopping cart link is visible
   */
  async isShoppingCartVisible(): Promise<boolean> {
    return await this.shoppingCartLink.isVisible();
  }

  /**
   * Verify menu button is visible
   */
  async isMenuButtonVisible(): Promise<boolean> {
    return await this.menuButton.isVisible();
  }

  /**
   * Take screenshot of header
   */
  async takeHeaderScreenshot(filename: string): Promise<void> {
    await this.headerContainer.screenshot({ 
      path: `test-results/${filename}.png`
    });
  }

  /**
   * Verify all header elements are displayed
   */
  async verifyAllElementsDisplayed(): Promise<{
    header: boolean;
    menuButton: boolean;
    cartLink: boolean;
    appLogo: boolean;
    title: boolean;
  }> {
    return {
      header: await this.isHeaderVisible(),
      menuButton: await this.isMenuButtonVisible(),
      cartLink: await this.isShoppingCartVisible(),
      appLogo: await this.appLogo.isVisible(),
      title: await this.title.isVisible()
    };
  }

  /**
   * Wait for cart badge to update
   */
  async waitForCartBadgeUpdate(expectedCount: number, timeout: number = 5000): Promise<boolean> {
    try {
      await expect(this.cartBadge).toHaveText(expectedCount.toString(), { timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if cart is empty (no badge visible)
   */
  async isCartEmpty(): Promise<boolean> {
    return !(await this.cartBadge.isVisible());
  }

  /**
   * Reset app state through UI (if available)
   */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    
    // Look for reset app state option in menu
    const resetButton = this.page.locator('#reset_sidebar_link');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      // Wait for reset to complete
      await this.page.waitForTimeout(1000);
    }
  }
}