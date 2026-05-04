import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Inventory Page (Product Catalog) Page Object Model for SauceDemo
 */
export class InventoryPage extends BasePage {
  // Locators
  readonly productContainer: Locator;
  readonly productItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly shoppingCartLink: Locator;

  // Product actions
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;

  // Sorting options
  readonly sortOptions = {
    nameAZ: 'az',
    nameZA: 'za',
    priceLowHigh: 'lohi',
    priceHighLow: 'hilo'
  };

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.productContainer = page.locator('.inventory_container');
    this.productItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('.product_sort_container');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.shoppingCartLink = page.locator('.shopping_cart_link');

    // Product action buttons
    this.addToCartButtons = page.locator('button:has-text("Add to cart")');
    this.removeButtons = page.locator('button:has-text("Remove")');
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Get product details by index
   */
  async getProductDetails(index: number): Promise<{
    name: string;
    description: string;
    price: string;
  }> {
    const product = this.productItems.nth(index);
    
    return {
      name: await product.locator('.inventory_item_name').textContent() || '',
      description: await product.locator('.inventory_item_desc').textContent() || '',
      price: await product.locator('.inventory_item_price').textContent() || ''
    };
  }

  /**
   * Add product to cart by index
   */
  async addProductToCart(index: number): Promise<void> {
    const addButton = this.productItems.nth(index).locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  /**
   * Remove product from cart by index
   */
  async removeProductFromCart(index: number): Promise<void> {
    const removeButton = this.productItems.nth(index).locator('button:has-text("Remove")');
    await removeButton.click();
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
   * Sort products by option
   */
  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
    // Wait for products to re-sort
    await this.page.waitForTimeout(500); // Small delay for UI update
  }

  /**
   * Get current sort option
   */
  async getCurrentSortOption(): Promise<string> {
    return await this.sortDropdown.inputValue();
  }

  /**
   * Get all product names in current order
   */
  async getAllProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.getProductCount();
    
    for (let i = 0; i < count; i++) {
      const name = await this.productItems.nth(i).locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  /**
   * Get all product prices in current order
   */
  async getAllProductPrices(): Promise<number[]> {
    const prices: number[] = [];
    const count = await this.getProductCount();
    
    for (let i = 0; i < count; i++) {
      const priceText = await this.productItems.nth(i).locator('.inventory_item_price').textContent();
      if (priceText) {
        // Remove $ sign and convert to number
        const price = parseFloat(priceText.replace('$', ''));
        if (!isNaN(price)) prices.push(price);
      }
    }
    
    return prices;
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
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.productContainer).toBeVisible();
    await expect(this.sortDropdown).toBeVisible();
  }
}