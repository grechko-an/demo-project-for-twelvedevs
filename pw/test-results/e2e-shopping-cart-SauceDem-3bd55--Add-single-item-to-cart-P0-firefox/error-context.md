# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\shopping-cart.spec.ts >> SauceDemo Shopping Cart Tests >> P0 - Critical Cart Scenarios >> CART-01: Add single item to cart @P0
- Location: tests\e2e\shopping-cart.spec.ts:6:9

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('button:has-text("Add to cart")').first()
Expected: hidden
Received: visible
Timeout:  10000ms

Call log:
  - Expect "toBeHidden" with timeout 10000ms
  - waiting for locator('button:has-text("Add to cart")').first()
    13 × locator resolved to <button id="add-to-cart-sauce-labs-bike-light" name="add-to-cart-sauce-labs-bike-light" data-test="add-to-cart-sauce-labs-bike-light" class="btn btn_primary btn_small btn_inventory ">Add to cart</button>
       - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "1"
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - generic [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: Name (A to Z)
          - combobox [ref=e20]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - link "Sauce Labs Backpack" [ref=e27] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e28]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - link "Sauce Labs Backpack" [ref=e31] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e32]: Sauce Labs Backpack
            - generic [ref=e33]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e34]:
            - generic [ref=e35]: $29.99
            - button "Remove" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - link "Sauce Labs Bike Light" [ref=e39] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e40]
        - generic [ref=e41]:
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bike Light
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e46]:
            - generic [ref=e47]: $9.99
            - button "Add to cart" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e51] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e55] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e56]: Sauce Labs Bolt T-Shirt
            - generic [ref=e57]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e58]:
            - generic [ref=e59]: $15.99
            - button "Add to cart" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - link "Sauce Labs Fleece Jacket" [ref=e63] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - link "Sauce Labs Fleece Jacket" [ref=e67] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e68]: Sauce Labs Fleece Jacket
            - generic [ref=e69]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e70]:
            - generic [ref=e71]: $49.99
            - button "Add to cart" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - link "Sauce Labs Onesie" [ref=e75] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - link "Sauce Labs Onesie" [ref=e79] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e80]: Sauce Labs Onesie
            - generic [ref=e81]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e82]:
            - generic [ref=e83]: $7.99
            - button "Add to cart" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e87] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e88]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e91] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e92]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e93]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e94]:
            - generic [ref=e95]: $15.99
            - button "Add to cart" [ref=e96] [cursor=pointer]
  - contentinfo [ref=e97]:
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "Twitter" [ref=e100] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e101]:
        - link "Facebook" [ref=e102] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e103]:
        - link "LinkedIn" [ref=e104] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e105]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { test } from '../../fixtures/fixtures';
  3   | 
  4   | test.describe('SauceDemo Shopping Cart Tests', () => {
  5   |   test.describe('P0 - Critical Cart Scenarios', () => {
  6   |     test('CART-01: Add single item to cart @P0', async ({ page, inventoryPage, header }) => {
  7   |       // Test ID: CART-01
  8   |       // Priority: P0
  9   |       // Steps: 1. Click "Add to cart" on any product, 2. Verify cart badge updates
  10  |       // Expected: Cart badge shows "1", button changes to "Remove"
  11  | 
  12  |       // Arrange - Get initial cart state
  13  |       const initialCartCount = await header.getCartItemCount();
  14  |       expect(initialCartCount).toBe(0);
  15  | 
  16  |       // Act - Add first product to cart
  17  |       await inventoryPage.addProductToCart(0);
  18  |       
  19  |       // Assert - Verify cart badge updated
  20  |       const cartCount = await header.getCartItemCount();
  21  |       expect(cartCount).toBe(1);
  22  |       
  23  |       // Verify button changed to "Remove"
  24  |       const removeButton = inventoryPage.removeButtons.first();
  25  |       await expect(removeButton).toBeVisible();
  26  |       await expect(removeButton).toHaveText('Remove');
  27  |       
  28  |       // Verify "Add to cart" button is gone for this product
  29  |       const addButton = inventoryPage.addToCartButtons.first();
> 30  |       await expect(addButton).toBeHidden();
      |                               ^ Error: expect(locator).toBeHidden() failed
  31  |       
  32  |       // Take screenshot
  33  |       await page.screenshot({ 
  34  |         path: 'test-results/cart-add-single.png',
  35  |         fullPage: false 
  36  |       });
  37  |     });
  38  |   });
  39  | 
  40  |   test.describe('P1 - Important Cart Scenarios', () => {
  41  |     test('CART-02: Add multiple items to cart @P1', async ({ inventoryPage, header, addItemsToCart }) => {
  42  |       // Test ID: CART-02
  43  |       // Priority: P1
  44  |       // Steps: 1. Add 3 different products, 2. Verify cart badge
  45  |       // Expected: Cart badge shows "3"
  46  | 
  47  |       // Arrange
  48  |       const itemsToAdd = 3;
  49  |       const indices = [0, 1, 2];
  50  |       
  51  |       // Act - Add multiple products using helper
  52  |       await addItemsToCart(indices);
  53  |       
  54  |       // Assert
  55  |       const cartCount = await header.getCartItemCount();
  56  |       expect(cartCount).toBe(itemsToAdd);
  57  |       
  58  |       // Verify all added items show "Remove" button
  59  |       const removeButtonsCount = await inventoryPage.removeButtons.count();
  60  |       expect(removeButtonsCount).toBe(itemsToAdd);
  61  |     });
  62  | 
  63  |     test('CART-03: Remove item from cart (inventory page) @P1', async ({ inventoryPage, header }) => {
  64  |       // Test ID: CART-03
  65  |       // Priority: P1
  66  |       // Steps: 1. Add item to cart, 2. Click "Remove", 3. Verify cart badge
  67  |       // Expected: Cart badge decrements, button changes to "Add to cart"
  68  | 
  69  |       // Arrange - Add item first
  70  |       await inventoryPage.addProductToCart(0);
  71  |       let cartCount = await header.getCartItemCount();
  72  |       expect(cartCount).toBe(1);
  73  |       
  74  |       // Act - Remove the item
  75  |       await inventoryPage.removeProductFromCart(0);
  76  |       
  77  |       // Assert
  78  |       cartCount = await header.getCartItemCount();
  79  |       expect(cartCount).toBe(0);
  80  |       
  81  |       // Verify button changed back to "Add to cart"
  82  |       const addButton = inventoryPage.addToCartButtons.first();
  83  |       await expect(addButton).toBeVisible();
  84  |       await expect(addButton).toHaveText('Add to cart');
  85  |     });
  86  | 
  87  |     test('CART-04: Remove item from cart (cart page) @P1', async ({ page, inventoryPage, header, goToCartWithItems }) => {
  88  |       // Test ID: CART-04
  89  |       // Priority: P1
  90  |       // Steps: 1. Add item, 2. Go to cart page, 3. Click "Remove"
  91  |       // Expected: Item removed from cart, cart empty message shown
  92  | 
  93  |       // Arrange - Add item and go to cart using helper
  94  |       const { cartPage } = await goToCartWithItems([0]);
  95  |       
  96  |       let itemCount = await cartPage.getCartItemCount();
  97  |       expect(itemCount).toBe(1);
  98  |       
  99  |       // Act - Remove item from cart page
  100 |       await cartPage.removeItem(0);
  101 |       
  102 |       // Assert
  103 |       itemCount = await cartPage.getCartItemCount();
  104 |       expect(itemCount).toBe(0);
  105 |       
  106 |       // Verify cart is empty
  107 |       const isEmpty = await cartPage.isCartEmpty();
  108 |       expect(isEmpty).toBe(true);
  109 |       
  110 |       // Verify cart badge is empty
  111 |       const cartCount = await header.getCartItemCount();
  112 |       expect(cartCount).toBe(0);
  113 |     });
  114 | 
  115 |     test('CART-05: Continue Shopping button @P1', async ({ page, inventoryPage, goToCartWithItems }) => {
  116 |       // Test ID: CART-05
  117 |       // Priority: P1
  118 |       // Steps: 1. Go to cart page, 2. Click "Continue Shopping"
  119 |       // Expected: Redirected to inventory page
  120 | 
  121 |       // Arrange - Add item and go to cart using helper
  122 |       const { cartPage } = await goToCartWithItems([0]);
  123 |       
  124 |       // Act - Click Continue Shopping
  125 |       await cartPage.continueShopping();
  126 |       
  127 |       // Assert - Should be back on inventory page
  128 |       await expect(page).toHaveURL(/.*inventory.html/);
  129 |       await inventoryPage.verifyPageLoaded();
  130 |     });
```