import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Complete Page (Order Confirmation) Page Object Model for SauceDemo
 */
export class CheckoutCompletePage extends BasePage {
  // Locators
  readonly checkoutCompleteContainer: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.checkoutCompleteContainer = page.locator('.checkout_complete_container');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('#back-to-products');
  }

  /**
   * Get completion header text
   */
  async getCompletionHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  /**
   * Get completion text
   */
  async getCompletionText(): Promise<string> {
    return await this.completeText.textContent() || '';
  }

  /**
   * Verify order completion message
   */
  async verifyOrderCompletion(): Promise<boolean> {
    const header = await this.getCompletionHeader();
    const text = await this.getCompletionText();
    
    return header.includes('THANK YOU FOR YOUR ORDER') && 
           text.includes('Your order has been dispatched');
  }

  /**
   * Return to inventory page
   */
  async backToHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  /**
   * Verify pony express image is displayed
   */
  async isPonyExpressImageVisible(): Promise<boolean> {
    return await this.ponyExpressImage.isVisible();
  }

  /**
   * Verify cart is empty after purchase
   */
  async verifyCartIsEmpty(): Promise<boolean> {
    // Check if cart badge is not visible (cart is empty)
    const cartBadge = this.page.locator('.shopping_cart_badge');
    return !(await cartBadge.isVisible());
  }

  /**
   * Take screenshot of completion page
   */
  async takeCompletionScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/${filename}.png`,
      fullPage: true 
    });
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.checkoutCompleteContainer).toBeVisible();
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeText).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  /**
   * Verify all elements are displayed
   */
  async verifyAllElementsDisplayed(): Promise<{
    header: boolean;
    text: boolean;
    image: boolean;
    button: boolean;
  }> {
    return {
      header: await this.completeHeader.isVisible(),
      text: await this.completeText.isVisible(),
      image: await this.ponyExpressImage.isVisible(),
      button: await this.backHomeButton.isVisible()
    };
  }

  /**
   * Get page URL for verification
   */
  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify URL contains checkout-complete
   */
  async isCheckoutCompleteUrl(): Promise<boolean> {
    const url = await this.getPageUrl();
    return url.includes('checkout-complete');
  }

  /**
   * Complete post-purchase validation
   */
  async validatePostPurchaseState(): Promise<{
    orderComplete: boolean;
    cartEmpty: boolean;
    correctUrl: boolean;
    allElementsVisible: boolean;
  }> {
    const elements = await this.verifyAllElementsDisplayed();
    
    return {
      orderComplete: await this.verifyOrderCompletion(),
      cartEmpty: await this.verifyCartIsEmpty(),
      correctUrl: await this.isCheckoutCompleteUrl(),
      allElementsVisible: elements.header && elements.text && elements.button
    };
  }
}