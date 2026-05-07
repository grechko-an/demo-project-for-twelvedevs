# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\product-catalog.spec.ts >> SauceDemo Product Catalog & Sorting Tests >> P2 - Product Details Verification >> CAT-05: Product details verification @P2
- Location: tests\e2e\product-catalog.spec.ts:89:9

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
        - link "Sauce Labs Backpack" [ref=e26]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  18  |       expect(productNames).toEqual(sortedNames);
  19  |       
  20  |       // Verify sort dropdown shows default option
  21  |       const currentSort = await inventoryPage.getCurrentSortOption();
  22  |       expect(currentSort).toBe('az');
  23  |     });
  24  | 
  25  |     test('CAT-02: Sort Z to A @P1', async ({ inventoryPage }) => {
  26  |       // Test ID: CAT-02
  27  |       // Priority: P1
  28  |       // Steps: 1. Select "Name (Z to A)", 2. Verify order
  29  |       // Expected: Products sorted Z-A
  30  | 
  31  |       // Act
  32  |       await inventoryPage.sortProducts('za');
  33  |       await verifyProductSorting(inventoryPage, 'za');
  34  |     });
  35  | 
  36  |     test('CAT-03: Sort price low to high @P1', async ({ inventoryPage }) => {
  37  |       // Test ID: CAT-03
  38  |       // Priority: P1
  39  |       // Steps: 1. Select "Price (low to high)", 2. Verify order
  40  |       // Expected: Products sorted by price ascending
  41  | 
  42  |       // Act
  43  |       await inventoryPage.sortProducts('lohi');
  44  |       await verifyProductSorting(inventoryPage, 'lohi');
  45  |     });
  46  | 
  47  |     test('CAT-04: Sort price high to low @P1', async ({ inventoryPage }) => {
  48  |       // Test ID: CAT-04
  49  |       // Priority: P1
  50  |       // Steps: 1. Select "Price (high to low)", 2. Verify order
  51  |       // Expected: Products sorted by price descending
  52  | 
  53  |       // Act
  54  |       await inventoryPage.sortProducts('hilo');
  55  |       await verifyProductSorting(inventoryPage, 'hilo');
  56  |     });
  57  | 
  58  |     test('Verify all sorting options work correctly', async ({ inventoryPage, page }) => {
  59  |       // Test all sorting options in sequence
  60  |       const sortOptions = [
  61  |         { value: 'az', name: 'Name A-Z' },
  62  |         { value: 'za', name: 'Name Z-A' },
  63  |         { value: 'lohi', name: 'Price low-high' },
  64  |         { value: 'hilo', name: 'Price high-low' }
  65  |       ];
  66  | 
  67  |       for (const option of sortOptions) {
  68  |         // Apply sort
  69  |         await inventoryPage.sortProducts(option.value);
  70  |         
  71  |         // Verify sort is applied
  72  |         const currentSort = await inventoryPage.getCurrentSortOption();
  73  |         expect(currentSort).toBe(option.value);
  74  |         
  75  |         // Verify products are displayed
  76  |         const productCount = await inventoryPage.getProductCount();
  77  |         expect(productCount).toBeGreaterThan(0);
  78  |         
  79  |         // Take screenshot for each sort option
  80  |         await page.screenshot({ 
  81  |           path: `test-results/sort-${option.value}.png`,
  82  |           fullPage: false 
  83  |         });
  84  |       }
  85  |     });
  86  |   });
  87  | 
  88  |   test.describe('P2 - Product Details Verification', () => {
  89  |     test('CAT-05: Product details verification @P2', async ({ inventoryPage, page }) => {
  90  |       // Test ID: CAT-05
  91  |       // Priority: P2
  92  |       // Steps: 1. Check each product, 2. Verify name, description, price, image
  93  |       // Expected: All product details displayed correctly
  94  | 
  95  |       const productCount = await inventoryPage.getProductCount();
  96  |       expect(productCount).toBeGreaterThan(0);
  97  | 
  98  |       // Verify each product has required details
  99  |       for (let i = 0; i < productCount; i++) {
  100 |         const details = await inventoryPage.getProductDetails(i);
  101 |         
  102 |         // Assert - Verify all details are present and valid
  103 |         expect(details.name).toBeTruthy();
  104 |         expect(details.name.length).toBeGreaterThan(0);
  105 |         
  106 |         expect(details.description).toBeTruthy();
  107 |         expect(details.description.length).toBeGreaterThan(0);
  108 |         
  109 |         expect(details.price).toBeTruthy();
  110 |         expect(details.price).toMatch(/^\$\d+\.\d{2}$/); // Format: $XX.XX
  111 |         
  112 |         // Verify product image is visible
  113 |         const productImage = page.locator('.inventory_item_img').nth(i);
  114 |         await expect(productImage).toBeVisible();
  115 |         
  116 |         // Verify image has src attribute
  117 |         const imageSrc = await productImage.getAttribute('src');
> 118 |         expect(imageSrc).toBeTruthy();
      |                          ^ Error: expect(received).toBeTruthy()
  119 |         expect(imageSrc).toContain('.jpg');
  120 |       }
  121 |     });
  122 | 
  123 |     test('Verify product count matches expected', async ({ inventoryPage }) => {
  124 |       // SauceDemo should have 6 products
  125 |       const productCount = await inventoryPage.getProductCount();
  126 |       expect(productCount).toBe(6);
  127 |     });
  128 | 
  129 |     test('Verify product names are unique', async ({ inventoryPage }) => {
  130 |       const productNames = await inventoryPage.getAllProductNames();
  131 |       const uniqueNames = new Set(productNames);
  132 |       
  133 |       expect(productNames.length).toBe(uniqueNames.size);
  134 |     });
  135 | 
  136 |     test('Verify product prices are valid numbers', async ({ inventoryPage }) => {
  137 |       const productPrices = await inventoryPage.getAllProductPrices();
  138 |       
  139 |       for (const price of productPrices) {
  140 |         expect(price).toBeGreaterThan(0);
  141 |         expect(price).toBeLessThan(100); // Assuming no product costs more than $100
  142 |       }
  143 |     });
  144 | 
  145 |     test('Verify all product details using helper', async ({ inventoryPage }) => {
  146 |       await verifyAllProductDetails(inventoryPage);
  147 |     });
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
```