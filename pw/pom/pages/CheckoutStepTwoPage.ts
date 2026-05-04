import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Step Two Page (Order Summary) Page Object Model for SauceDemo
 */
export class CheckoutStepTwoPage extends BasePage {
  // Locators
  readonly checkoutContainer: Locator;
  readonly cartItems: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.checkoutContainer = page.locator('.checkout_summary_container');
    this.cartItems = page.locator('.cart_item');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.paymentInfo = page.locator('.summary_value_label:has-text("SauceCard")');
    this.shippingInfo = page.locator('.summary_value_label:has-text("FREE PONY EXPRESS DELIVERY!")');
  }

  /**
   * Get cart item count in summary
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get cart item details by index
   */
  async getCartItemDetails(index: number): Promise<{
    name: string;
    description: string;
    price: string;
    quantity: string;
  }> {
    const item = this.cartItems.nth(index);
    
    return {
      name: await item.locator('.inventory_item_name').textContent() || '',
      description: await item.locator('.inventory_item_desc').textContent() || '',
      price: await item.locator('.inventory_item_price').textContent() || '',
      quantity: await item.locator('.cart_quantity').textContent() || '1'
    };
  }

  /**
   * Get all cart item details
   */
  async getAllCartItemDetails(): Promise<Array<{
    name: string;
    description: string;
    price: string;
    quantity: string;
  }>> {
    const details: Array<{
      name: string;
      description: string;
      price: string;
      quantity: string;
    }> = [];
    
    const count = await this.getCartItemCount();
    for (let i = 0; i < count; i++) {
      details.push(await this.getCartItemDetails(i));
    }
    
    return details;
  }

  /**
   * Get item total (subtotal)
   */
  async getItemTotal(): Promise<number> {
    const text = await this.itemTotal.textContent();
    if (!text) return 0;
    
    // Extract number from text like "Item total: $29.99"
    const match = text.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get tax amount
   */
  async getTaxAmount(): Promise<number> {
    const text = await this.tax.textContent();
    if (!text) return 0;
    
    // Extract number from text like "Tax: $2.40"
    const match = text.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get total amount
   */
  async getTotalAmount(): Promise<number> {
    const text = await this.total.textContent();
    if (!text) return 0;
    
    // Extract number from text like "Total: $32.39"
    const match = text.match(/\$([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Verify calculation correctness
   */
  async verifyCalculations(): Promise<boolean> {
    const itemTotal = await this.getItemTotal();
    const tax = await this.getTaxAmount();
    const total = await this.getTotalAmount();
    
    // Calculate expected total
    const expectedTotal = Math.round((itemTotal + tax) * 100) / 100;
    const actualTotal = Math.round(total * 100) / 100;
    
    return Math.abs(expectedTotal - actualTotal) < 0.01;
  }

  /**
   * Get payment information
   */
  async getPaymentInfo(): Promise<string> {
    return await this.paymentInfo.textContent() || '';
  }

  /**
   * Get shipping information
   */
  async getShippingInfo(): Promise<string> {
    return await this.shippingInfo.textContent() || '';
  }

  /**
   * Complete purchase
   */
  async completePurchase(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Cancel purchase and return to inventory
   */
  async cancelPurchase(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Verify summary contains specific item
   */
  async verifyItemInSummary(itemName: string): Promise<boolean> {
    const count = await this.getCartItemCount();
    
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      if (name === itemName) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Calculate expected tax (8% of item total)
   */
  calculateExpectedTax(itemTotal: number): number {
    return Math.round(itemTotal * 0.08 * 100) / 100;
  }

  /**
   * Verify tax calculation
   */
  async verifyTaxCalculation(): Promise<boolean> {
    const itemTotal = await this.getItemTotal();
    const actualTax = await this.getTaxAmount();
    const expectedTax = this.calculateExpectedTax(itemTotal);
    
    return Math.abs(actualTax - expectedTax) < 0.01;
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.checkoutContainer).toBeVisible();
    await expect(this.itemTotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
    await expect(this.finishButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  /**
   * Verify all information is displayed correctly
   */
  async verifyInformationDisplayed(): Promise<{
    items: boolean;
    payment: boolean;
    shipping: boolean;
    totals: boolean;
  }> {
    return {
      items: await this.cartItems.first().isVisible(),
      payment: await this.paymentInfo.isVisible(),
      shipping: await this.shippingInfo.isVisible(),
      totals: await this.itemTotal.isVisible() && 
              await this.tax.isVisible() && 
              await this.total.isVisible()
    };
  }
}