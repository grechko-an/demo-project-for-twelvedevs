# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\product-catalog.spec.ts >> SauceDemo Product Catalog & Sorting Tests >> Accessibility and UI Tests >> Verify sort dropdown accessibility
- Location: tests\e2e\product-catalog.spec.ts:243:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: null
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
  148 |   });
  149 | 
  150 |   test.describe('Additional Catalog Tests', () => {
  151 |     test('Verify sort dropdown options', async ({ inventoryPage }) => {
  152 |       const sortDropdown = inventoryPage.sortDropdown;
  153 |       await expect(sortDropdown).toBeVisible();
  154 |       
  155 |       // Get all options
  156 |       const options = await sortDropdown.locator('option').all();
  157 |       expect(options.length).toBe(4);
  158 |       
  159 |       // Verify option texts
  160 |       const expectedOptions = [
  161 |         'Name (A to Z)',
  162 |         'Name (Z to A)',
  163 |         'Price (low to high)',
  164 |         'Price (high to low)'
  165 |       ];
  166 |       
  167 |       for (let i = 0; i < options.length; i++) {
  168 |         const optionText = await options[i].textContent();
  169 |         expect(optionText).toBe(expectedOptions[i]);
  170 |       }
  171 |     });
  172 | 
  173 |     test('Verify product images load correctly', async ({ inventoryPage, page }) => {
  174 |       const productCount = await inventoryPage.getProductCount();
  175 |       
  176 |       for (let i = 0; i < productCount; i++) {
  177 |         const productImage = page.locator('.inventory_item_img').nth(i);
  178 |         
  179 |         // Check image natural width (should be > 0 if loaded)
  180 |         const naturalWidth = await productImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
  181 |         expect(naturalWidth).toBeGreaterThan(0);
  182 |         
  183 |         // Check image has alt text
  184 |         const altText = await productImage.getAttribute('alt');
  185 |         expect(altText).toBeTruthy();
  186 |       }
  187 |     });
  188 | 
  189 |     test('Verify product container layout', async ({ inventoryPage, page }) => {
  190 |       const productContainer = inventoryPage.productContainer;
  191 |       await expect(productContainer).toBeVisible();
  192 |       
  193 |       // Check CSS classes
  194 |       const containerClass = await productContainer.getAttribute('class');
  195 |       expect(containerClass).toContain('inventory_container');
  196 |       
  197 |       // Verify responsive layout
  198 |       const boundingBox = await productContainer.boundingBox();
  199 |       expect(boundingBox?.width).toBeGreaterThan(0);
  200 |       expect(boundingBox?.height).toBeGreaterThan(0);
  201 |     });
  202 | 
  203 |     test('Sorting persistence after page refresh', async ({ authenticatedPage }) => {
  204 |       // Use authenticatedPage fixture for clean state
  205 |       const inventoryPage = new InventoryPage(authenticatedPage);
  206 |       await inventoryPage.verifyPageLoaded();
  207 |       
  208 |       // Apply sort
  209 |       await inventoryPage.sortProducts('za');
  210 |       const namesBeforeRefresh = await inventoryPage.getAllProductNames();
  211 |       
  212 |       // Refresh page
  213 |       await authenticatedPage.reload();
  214 |       await inventoryPage.verifyPageLoaded();
  215 |       
  216 |       // Verify sort is preserved
  217 |       const currentSort = await inventoryPage.getCurrentSortOption();
  218 |       expect(currentSort).toBe('za');
  219 |       
  220 |       const namesAfterRefresh = await inventoryPage.getAllProductNames();
  221 |       expect(namesAfterRefresh).toEqual(namesBeforeRefresh);
  222 |     });
  223 | 
  224 |     test('Sorting with different user accounts', async ({ inventoryPageAsUser }) => {
  225 |       // Test with problem_user
  226 |       const problemInventory = await inventoryPageAsUser('problem_user', 'secret_sauce');
  227 |       
  228 |       // Try sorting
  229 |       await problemInventory.sortProducts('za');
  230 |       const productCount = await problemInventory.getProductCount();
  231 |       expect(productCount).toBeGreaterThan(0);
  232 |       
  233 |       // Test with performance_glitch_user
  234 |       const perfInventory = await inventoryPageAsUser('performance_glitch_user', 'secret_sauce');
  235 |       
  236 |       await perfInventory.sortProducts('lohi');
  237 |       const prices = await perfInventory.getAllProductPrices();
  238 |       expect(prices.length).toBeGreaterThan(0);
  239 |     });
  240 |   });
  241 | 
  242 |   test.describe('Accessibility and UI Tests', () => {
  243 |     test('Verify sort dropdown accessibility', async ({ inventoryPage }) => {
  244 |       const sortDropdown = inventoryPage.sortDropdown;
  245 |       
  246 |       // Check ARIA attributes
  247 |       const ariaLabel = await sortDropdown.getAttribute('aria-label');
> 248 |       expect(ariaLabel).toBeTruthy();
      |                         ^ Error: expect(received).toBeTruthy()
  249 |       
  250 |       // Check tab index
  251 |       const tabIndex = await sortDropdown.getAttribute('tabindex');
  252 |       expect(tabIndex).toBe('0');
  253 |       
  254 |       // Verify dropdown is focusable
  255 |       await sortDropdown.focus();
  256 |       await expect(sortDropdown).toBeFocused();
  257 |     });
  258 | 
  259 |     test('Verify product card accessibility', async ({ inventoryPage }) => {
  260 |       const firstProduct = inventoryPage.productItems.first();
  261 |       
  262 |       // Check product name is heading element
  263 |       const productName = firstProduct.locator('.inventory_item_name');
  264 |       const tagName = await productName.evaluate(el => el.tagName.toLowerCase());
  265 |       expect(['h2', 'h3', 'h4', 'div', 'span']).toContain(tagName);
  266 |       
  267 |       // Check product image has alt text
  268 |       const productImage = firstProduct.locator('.inventory_item_img');
  269 |       const altText = await productImage.getAttribute('alt');
  270 |       expect(altText).toBeTruthy();
  271 |       expect(altText).not.toBe('');
  272 |     });
  273 | 
  274 |     test('Take catalog screenshots for documentation', async ({ inventoryPage, page }) => {
  275 |       // Take screenshot of default view
  276 |       await page.screenshot({ 
  277 |         path: 'test-results/catalog-default.png',
  278 |         fullPage: true 
  279 |       });
  280 |       
  281 |       // Take screenshot of each sort view
  282 |       const sortOptions = ['az', 'za', 'lohi', 'hilo'];
  283 |       for (const option of sortOptions) {
  284 |         await inventoryPage.sortProducts(option);
  285 |         await page.waitForTimeout(500); // Wait for UI update
  286 |         await page.screenshot({ 
  287 |           path: `test-results/catalog-sort-${option}.png`,
  288 |           fullPage: false 
  289 |         });
  290 |       }
  291 |     });
  292 |   });
  293 | });
```