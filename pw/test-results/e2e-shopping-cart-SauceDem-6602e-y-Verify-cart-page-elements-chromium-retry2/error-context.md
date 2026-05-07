# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\shopping-cart.spec.ts >> SauceDemo Shopping Cart Tests >> Cart Page Functionality >> Verify cart page elements
- Location: tests\e2e\shopping-cart.spec.ts:226:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.cart_contents_container')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.cart_contents_container')

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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  128 |       await expect(page).toHaveURL(/.*inventory.html/);
  129 |       await inventoryPage.verifyPageLoaded();
  130 |     });
  131 |   });
  132 | 
  133 |   test.describe('P2 - Additional Cart Scenarios', () => {
  134 |     test('CART-06: Cart persists after page refresh @P2', async ({ page, inventoryPage, header, addItemsToCart }) => {
  135 |       // Test ID: CART-06
  136 |       // Priority: P2
  137 |       // Steps: 1. Add items to cart, 2. Refresh page, 3. Verify cart
  138 |       // Expected: Cart items preserved
  139 | 
  140 |       // Arrange - Add multiple items using helper
  141 |       await addItemsToCart([0, 1]);
  142 |       
  143 |       const cartCountBefore = await header.getCartItemCount();
  144 |       expect(cartCountBefore).toBe(2);
  145 |       
  146 |       // Act - Refresh page
  147 |       await page.reload();
  148 |       await inventoryPage.verifyPageLoaded();
  149 |       
  150 |       // Assert - Cart should persist
  151 |       const cartCountAfter = await header.getCartItemCount();
  152 |       expect(cartCountAfter).toBe(2);
  153 |       
  154 |       // Verify "Remove" buttons are still visible
  155 |       const removeButtonsCount = await inventoryPage.removeButtons.count();
  156 |       expect(removeButtonsCount).toBe(2);
  157 |     });
  158 | 
  159 |     test('Add and remove multiple items in sequence', async ({ inventoryPage, header }) => {
  160 |       // Test complex cart operations
  161 |       const operations = [
  162 |         { action: 'add', index: 0 },
  163 |         { action: 'add', index: 1 },
  164 |         { action: 'remove', index: 0 },
  165 |         { action: 'add', index: 2 },
  166 |         { action: 'add', index: 3 },
  167 |         { action: 'remove', index: 1 }
  168 |       ];
  169 |       
  170 |       let expectedCount = 0;
  171 |       
  172 |       for (const op of operations) {
  173 |         if (op.action === 'add') {
  174 |           await inventoryPage.addProductToCart(op.index);
  175 |           expectedCount++;
  176 |         } else {
  177 |           await inventoryPage.removeProductFromCart(op.index);
  178 |           expectedCount--;
  179 |         }
  180 |         
  181 |         // Verify cart count after each operation
  182 |         const cartCount = await header.getCartItemCount();
  183 |         expect(cartCount).toBe(expectedCount);
  184 |       }
  185 |     });
  186 | 
  187 |     test('Verify cart item details match inventory', async ({ page, inventoryPage, goToCartWithItems }) => {
  188 |       // Add specific product and verify details in cart
  189 |       const productIndex = 2;
  190 |       const inventoryDetails = await inventoryPage.getProductDetails(productIndex);
  191 |       
  192 |       // Add to cart and go to cart page using helper
  193 |       const { cartPage } = await goToCartWithItems([productIndex]);
  194 |       
  195 |       // Get cart item details
  196 |       const cartDetails = await cartPage.getCartItemDetails(0);
  197 |       
  198 |       // Assert - Details should match
  199 |       expect(cartDetails.name).toBe(inventoryDetails.name);
  200 |       expect(cartDetails.description).toBe(inventoryDetails.description);
  201 |       expect(cartDetails.price).toBe(inventoryDetails.price);
  202 |       expect(cartDetails.quantity).toBe('1');
  203 |     });
  204 | 
  205 |     test('Verify cart total calculation', async ({ page, inventoryPage, goToCartWithItems }) => {
  206 |       // Add multiple items and verify total
  207 |       const indices = [0, 1, 2]; // Add first 3 products
  208 |       let expectedTotal = 0;
  209 |       
  210 |       // Get prices and calculate expected total
  211 |       for (const index of indices) {
  212 |         const details = await inventoryPage.getProductDetails(index);
  213 |         const price = parseFloat(details.price.replace('$', ''));
  214 |         expectedTotal += price;
  215 |       }
  216 |       
  217 |       // Add items and go to cart using helper
  218 |       const { cartPage } = await goToCartWithItems(indices);
  219 |       
  220 |       const actualTotal = await cartPage.getTotalPrice();
  221 |       expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  222 |     });
  223 |   });
  224 | 
  225 |   test.describe('Cart Page Functionality', () => {
  226 |     test('Verify cart page elements', async ({ cartPage, page }) => {
  227 |       // Verify all cart page elements are visible
> 228 |       await expect(cartPage.cartContainer).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
  229 |       await expect(cartPage.continueShoppingButton).toBeVisible();
  230 |       await expect(cartPage.checkoutButton).toBeVisible();
  231 |       
  232 |       // Verify cart has items (cartPage fixture adds one item by default)
  233 |       const itemCount = await cartPage.getCartItemCount();
  234 |       expect(itemCount).toBe(1);
  235 |       
  236 |       // Verify item details are displayed
  237 |       await expect(cartPage.itemNames.first()).toBeVisible();
  238 |       await expect(cartPage.itemPrices.first()).toBeVisible();
  239 |       await expect(cartPage.removeButtons.first()).toBeVisible();
  240 |     });
  241 | 
  242 |     test('Remove all items from cart page', async ({ cartPage, header, authenticatedPageWithCartItems }) => {
  243 |       // Create a page with multiple items
  244 |       const { cartPage: cartPageWithItems } = await authenticatedPageWithCartItems(2);
  245 |       
  246 |       // Remove all items
  247 |       await cartPageWithItems.removeAllItems();
  248 |       
  249 |       // Verify cart is empty
  250 |       const itemCount = await cartPageWithItems.getCartItemCount();
  251 |       expect(itemCount).toBe(0);
  252 |       
  253 |       // Verify cart badge is empty
  254 |       const cartCount = await header.getCartItemCount();
  255 |       expect(cartCount).toBe(0);
  256 |       
  257 |       // Verify checkout button might be disabled (depends on implementation)
  258 |       const checkoutEnabled = await cartPageWithItems.verifyCheckoutEnabled();
  259 |       // Some implementations disable checkout when cart is empty
  260 |     });
  261 | 
  262 |     test('Verify item verification methods', async ({ inventoryPage, goToCartWithItems }) => {
  263 |       // Get details of first product from inventory
  264 |       const inventoryDetails = await inventoryPage.getProductDetails(0);
  265 |       
  266 |       // Add item and go to cart using helper
  267 |       const { cartPage } = await goToCartWithItems([0]);
  268 |       
  269 |       // Verify item is in cart
  270 |       const itemInCart = await cartPage.verifyItemInCart(inventoryDetails.name);
  271 |       expect(itemInCart).toBe(true);
  272 |       
  273 |       // Get item index
  274 |       const itemIndex = await cartPage.getItemIndexByName(inventoryDetails.name);
  275 |       expect(itemIndex).toBe(0);
  276 |       
  277 |       // Verify item details
  278 |       const cartDetails = await cartPage.getCartItemDetails(itemIndex);
  279 |       expect(cartDetails.name).toBe(inventoryDetails.name);
  280 |       expect(cartDetails.price).toBe(inventoryDetails.price);
  281 |     });
  282 | 
  283 |     test('Navigate to checkout from cart', async ({ cartPage, page }) => {
  284 |       // Verify checkout button is enabled
  285 |       const checkoutEnabled = await cartPage.verifyCheckoutEnabled();
  286 |       expect(checkoutEnabled).toBe(true);
  287 |       
  288 |       // Proceed to checkout
  289 |       await cartPage.proceedToCheckout();
  290 |       
  291 |       // Should be on checkout step one page
  292 |       await expect(page).toHaveURL(/.*checkout-step-one.html/);
  293 |     });
  294 |   });
  295 | 
  296 |   test.describe('Edge Cases and Error Handling', () => {
  297 |     test('Cart operations with problem_user', async ({ loginPage, header, loginAsUserType }) => {
  298 |       // Login as problem_user
  299 |       const problemInventory = await loginAsUserType('problem');
  300 |       
  301 |       // Try to add items (problem_user might have issues)
  302 |       await problemInventory.addProductToCart(0);
  303 |       
  304 |       // Check cart badge (might not update correctly for problem_user)
  305 |       const cartCount = await header.getCartItemCount();
  306 |       // Accept either 0 or 1 depending on problem_user behavior
  307 |       expect([0, 1]).toContain(cartCount);
  308 |     });
  309 | 
  310 |     test('Cart operations with performance_glitch_user', async ({ loginPage, header, loginAsUserType, page }) => {
  311 |       // Login as performance_glitch_user
  312 |       const perfInventory = await loginAsUserType('performance');
  313 |       
  314 |       // Add item with potential delay
  315 |       await perfInventory.addProductToCart(0);
  316 |       
  317 |       // Wait for cart update due to performance glitch
  318 |       await expect.poll(async () => await header.getCartItemCount(), {
  319 |         timeout: 5000
  320 |       }).toBe(1);
  321 |     });
  322 | 
  323 |     test('Maximum items in cart', async ({ inventoryPage, header, page, addItemsToCart }) => {
  324 |       // Add all available products to cart
  325 |       const productCount = await inventoryPage.getProductCount();
  326 |       
  327 |       // Create array of all indices
  328 |       const allIndices = Array.from({ length: productCount }, (_, i) => i);
```