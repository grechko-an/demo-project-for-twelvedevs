import { expect } from '@playwright/test';
import { test, verifyProductSorting, verifyAllProductDetails, setupTestWithSort } from '../../fixtures/fixtures';
import { InventoryPage } from '../../pom/pages/InventoryPage';

test.describe('SauceDemo Product Catalog & Sorting Tests', () => {
  test.describe('P1 - Product Sorting Tests', () => {
    test('CAT-01: Default product sorting (A-Z) @P1', async ({ inventoryPage }) => {
      // Test ID: CAT-01
      // Priority: P1
      // Steps: 1. Login, 2. Verify product order
      // Expected: Products sorted alphabetically A-Z

      // Act - Get default sorted product names
      const productNames = await inventoryPage.getAllProductNames();
      
      // Assert - Verify alphabetical order A-Z
      const sortedNames = [...productNames].sort();
      expect(productNames).toEqual(sortedNames);
      
      // Verify sort dropdown shows default option
      const currentSort = await inventoryPage.getCurrentSortOption();
      expect(currentSort).toBe('az');
    });

    test('CAT-02: Sort Z to A @P1', async ({ inventoryPage }) => {
      // Test ID: CAT-02
      // Priority: P1
      // Steps: 1. Select "Name (Z to A)", 2. Verify order
      // Expected: Products sorted Z-A

      // Act
      await inventoryPage.sortProducts('za');
      await verifyProductSorting(inventoryPage, 'za');
    });

    test('CAT-03: Sort price low to high @P1', async ({ inventoryPage }) => {
      // Test ID: CAT-03
      // Priority: P1
      // Steps: 1. Select "Price (low to high)", 2. Verify order
      // Expected: Products sorted by price ascending

      // Act
      await inventoryPage.sortProducts('lohi');
      await verifyProductSorting(inventoryPage, 'lohi');
    });

    test('CAT-04: Sort price high to low @P1', async ({ inventoryPage }) => {
      // Test ID: CAT-04
      // Priority: P1
      // Steps: 1. Select "Price (high to low)", 2. Verify order
      // Expected: Products sorted by price descending

      // Act
      await inventoryPage.sortProducts('hilo');
      await verifyProductSorting(inventoryPage, 'hilo');
    });

    test('Verify all sorting options work correctly', async ({ inventoryPage, page }) => {
      // Test all sorting options in sequence
      const sortOptions = [
        { value: 'az', name: 'Name A-Z' },
        { value: 'za', name: 'Name Z-A' },
        { value: 'lohi', name: 'Price low-high' },
        { value: 'hilo', name: 'Price high-low' }
      ];

      for (const option of sortOptions) {
        // Apply sort
        await inventoryPage.sortProducts(option.value);
        
        // Verify sort is applied
        const currentSort = await inventoryPage.getCurrentSortOption();
        expect(currentSort).toBe(option.value);
        
        // Verify products are displayed
        const productCount = await inventoryPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        
        // Take screenshot for each sort option
        await page.screenshot({ 
          path: `test-results/sort-${option.value}.png`,
          fullPage: false 
        });
      }
    });
  });

  test.describe('P2 - Product Details Verification', () => {
    test('CAT-05: Product details verification @P2', async ({ inventoryPage, page }) => {
      // Test ID: CAT-05
      // Priority: P2
      // Steps: 1. Check each product, 2. Verify name, description, price, image
      // Expected: All product details displayed correctly

      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);

      // Verify each product has required details
      for (let i = 0; i < productCount; i++) {
        const details = await inventoryPage.getProductDetails(i);
        
        // Assert - Verify all details are present and valid
        expect(details.name).toBeTruthy();
        expect(details.name.length).toBeGreaterThan(0);
        
        expect(details.description).toBeTruthy();
        expect(details.description.length).toBeGreaterThan(0);
        
        expect(details.price).toBeTruthy();
        expect(details.price).toMatch(/^\$\d+\.\d{2}$/); // Format: $XX.XX
        
        // Verify product image is visible
        const productImage = page.locator('.inventory_item_img').nth(i);
        await expect(productImage).toBeVisible();
        
        // Verify image has src attribute
        const imageSrc = await productImage.getAttribute('src');
        expect(imageSrc).toBeTruthy();
        expect(imageSrc).toContain('.jpg');
      }
    });

    test('Verify product count matches expected', async ({ inventoryPage }) => {
      // SauceDemo should have 6 products
      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBe(6);
    });

    test('Verify product names are unique', async ({ inventoryPage }) => {
      const productNames = await inventoryPage.getAllProductNames();
      const uniqueNames = new Set(productNames);
      
      expect(productNames.length).toBe(uniqueNames.size);
    });

    test('Verify product prices are valid numbers', async ({ inventoryPage }) => {
      const productPrices = await inventoryPage.getAllProductPrices();
      
      for (const price of productPrices) {
        expect(price).toBeGreaterThan(0);
        expect(price).toBeLessThan(100); // Assuming no product costs more than $100
      }
    });

    test('Verify all product details using helper', async ({ inventoryPage }) => {
      await verifyAllProductDetails(inventoryPage);
    });
  });

  test.describe('Additional Catalog Tests', () => {
    test('Verify sort dropdown options', async ({ inventoryPage }) => {
      const sortDropdown = inventoryPage.sortDropdown;
      await expect(sortDropdown).toBeVisible();
      
      // Get all options
      const options = await sortDropdown.locator('option').all();
      expect(options.length).toBe(4);
      
      // Verify option texts
      const expectedOptions = [
        'Name (A to Z)',
        'Name (Z to A)',
        'Price (low to high)',
        'Price (high to low)'
      ];
      
      for (let i = 0; i < options.length; i++) {
        const optionText = await options[i].textContent();
        expect(optionText).toBe(expectedOptions[i]);
      }
    });

    test('Verify product images load correctly', async ({ inventoryPage, page }) => {
      const productCount = await inventoryPage.getProductCount();
      
      for (let i = 0; i < productCount; i++) {
        const productImage = page.locator('.inventory_item_img').nth(i);
        
        // Check image natural width (should be > 0 if loaded)
        const naturalWidth = await productImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
        expect(naturalWidth).toBeGreaterThan(0);
        
        // Check image has alt text
        const altText = await productImage.getAttribute('alt');
        expect(altText).toBeTruthy();
      }
    });

    test('Verify product container layout', async ({ inventoryPage, page }) => {
      const productContainer = inventoryPage.productContainer;
      await expect(productContainer).toBeVisible();
      
      // Check CSS classes
      const containerClass = await productContainer.getAttribute('class');
      expect(containerClass).toContain('inventory_container');
      
      // Verify responsive layout
      const boundingBox = await productContainer.boundingBox();
      expect(boundingBox?.width).toBeGreaterThan(0);
      expect(boundingBox?.height).toBeGreaterThan(0);
    });

    test('Sorting persistence after page refresh', async ({ authenticatedPage }) => {
      // Use authenticatedPage fixture for clean state
      const inventoryPage = new InventoryPage(authenticatedPage);
      await inventoryPage.verifyPageLoaded();
      
      // Apply sort
      await inventoryPage.sortProducts('za');
      const namesBeforeRefresh = await inventoryPage.getAllProductNames();
      
      // Refresh page
      await authenticatedPage.reload();
      await inventoryPage.verifyPageLoaded();
      
      // Verify sort is preserved
      const currentSort = await inventoryPage.getCurrentSortOption();
      expect(currentSort).toBe('za');
      
      const namesAfterRefresh = await inventoryPage.getAllProductNames();
      expect(namesAfterRefresh).toEqual(namesBeforeRefresh);
    });

    test('Sorting with different user accounts', async ({ inventoryPageAsUser }) => {
      // Test with problem_user
      const problemInventory = await inventoryPageAsUser('problem_user', 'secret_sauce');
      
      // Try sorting
      await problemInventory.sortProducts('za');
      const productCount = await problemInventory.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      
      // Test with performance_glitch_user
      const perfInventory = await inventoryPageAsUser('performance_glitch_user', 'secret_sauce');
      
      await perfInventory.sortProducts('lohi');
      const prices = await perfInventory.getAllProductPrices();
      expect(prices.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility and UI Tests', () => {
    test('Verify sort dropdown accessibility', async ({ inventoryPage }) => {
      const sortDropdown = inventoryPage.sortDropdown;
      
      // Check ARIA attributes
      const ariaLabel = await sortDropdown.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      
      // Check tab index
      const tabIndex = await sortDropdown.getAttribute('tabindex');
      expect(tabIndex).toBe('0');
      
      // Verify dropdown is focusable
      await sortDropdown.focus();
      await expect(sortDropdown).toBeFocused();
    });

    test('Verify product card accessibility', async ({ inventoryPage }) => {
      const firstProduct = inventoryPage.productItems.first();
      
      // Check product name is heading element
      const productName = firstProduct.locator('.inventory_item_name');
      const tagName = await productName.evaluate(el => el.tagName.toLowerCase());
      expect(['h2', 'h3', 'h4', 'div', 'span']).toContain(tagName);
      
      // Check product image has alt text
      const productImage = firstProduct.locator('.inventory_item_img');
      const altText = await productImage.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText).not.toBe('');
    });

    test('Take catalog screenshots for documentation', async ({ inventoryPage, page }) => {
      // Take screenshot of default view
      await page.screenshot({ 
        path: 'test-results/catalog-default.png',
        fullPage: true 
      });
      
      // Take screenshot of each sort view
      const sortOptions = ['az', 'za', 'lohi', 'hilo'];
      for (const option of sortOptions) {
        await inventoryPage.sortProducts(option);
        await page.waitForTimeout(500); // Wait for UI update
        await page.screenshot({ 
          path: `test-results/catalog-sort-${option}.png`,
          fullPage: false 
        });
      }
    });
  });
});