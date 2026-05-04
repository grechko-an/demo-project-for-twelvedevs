import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Cart Page Page Object Model for SauceDemo
 */
export class CartPage extends BasePage {
  // Locators
  readonly cartContainer: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartEmptyMessage: Locator;

  // Cart item elements
  readonly itemNames: Locator;
  readonly itemDescriptions: Locator;
  readonly itemPrices: Locator;
  readonly itemQuantities: Locator;
  readonly removeButtons: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.cartContainer = page.locator('.cart_contents_container');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.checkoutButton = page.locator('button:has-text("Checkout")');
    this.cartEmptyMessage = page.locator('.removed_cart_item, .empty-cart');

    // Cart item elements
    this.itemNames = page.locator('.inventory_item_name');
    this.itemDescriptions = page.locator('.inventory_item_desc');
    this.itemPrices = page.locator('.inventory_item_price');
    this.itemQuantities = page.locator('.cart_quantity');
    this.removeButtons = page.locator('button:has-text("Remove")');
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    const itemCount = await this.getCartItemCount();
    return itemCount === 0;
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
   * Remove item from cart by index
   */
  async removeItem(index: number): Promise<void> {
    const removeButton = this.cartItems.nth(index).locator('button:has-text("Remove")');
    await removeButton.click();
    // Wait for item removal animation
    await this.page.waitForTimeout(300);
  }

  /**
   * Remove all items from cart
   */
  async removeAllItems(): Promise<void> {
    const count = await this.getCartItemCount();
    for (let i = count - 1; i >= 0; i--) {
      await this.removeItem(i);
    }
  }

  /**
   * Continue shopping (return to inventory)
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Get total price of all items in cart
   */
  async getTotalPrice(): Promise<number> {
    let total = 0;
    const count = await this.getCartItemCount();
    
    for (let i = 0; i < count; i++) {
      const priceText = await this.cartItems.nth(i).locator('.inventory_item_price').textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        if (!isNaN(price)) {
          const quantityText = await this.cartItems.nth(i).locator('.cart_quantity').textContent();
          const quantity = quantityText ? parseInt(quantityText, 10) : 1;
          total += price * quantity;
        }
      }
    }
    
    return total;
  }

  /**
   * Verify cart contains specific item by name
   */
  async verifyItemInCart(itemName: string): Promise<boolean> {
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
   * Get item index by name
   */
  async getItemIndexByName(itemName: string): Promise<number> {
    const count = await this.getCartItemCount();
    
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
      if (name === itemName) {
        return i;
      }
    }
    
    return -1;
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.cartContainer).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  /**
   * Verify checkout button is enabled (cart not empty)
   */
  async verifyCheckoutEnabled(): Promise<boolean> {
    return await this.checkoutButton.isEnabled();
  }
}