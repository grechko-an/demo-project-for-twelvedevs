# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Menu Functionality Tests >> Menu keyboard navigation
- Location: tests\e2e\menu-navigation.spec.ts:189:9

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  locator('#inventory_sidebar_link')
Expected: focused
Received: inactive
Timeout:  10000ms

Call log:
  - Expect "toBeFocused" with timeout 10000ms
  - waiting for locator('#inventory_sidebar_link')
    13 × locator resolved to <a href="#" tabindex="-1" class="bm-item menu-item" id="inventory_sidebar_link" data-test="inventory-sidebar-link">All Items</a>
       - unexpected value "inactive"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [active] [ref=e8] [cursor=pointer]
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
  100 |       // Assert
  101 |       expect(functionality.opens).toBe(true);
  102 |       expect(functionality.closes).toBe(true);
  103 |       expect(functionality.allItemsClickable).toBe(true);
  104 |       expect(functionality.aboutClickable).toBe(true);
  105 |       expect(functionality.logoutClickable).toBe(true);
  106 |       expect(functionality.resetClickable).toBe(true);
  107 |     });
  108 | 
  109 |     test('AUTH-05: Logout functionality via menu @P1', async ({ 
  110 |       page, 
  111 |       menu, 
  112 |       loginPage 
  113 |     }) => {
  114 |       // Test ID: AUTH-05 (also covers logout)
  115 |       // Priority: P1
  116 |       // Steps: 1. Login successfully, 2. Open menu, 3. Click Logout
  117 |       // Expected: User is redirected to login page
  118 | 
  119 |       // Act - Logout via menu
  120 |       const logoutSuccessful = await menu.logoutAndVerify();
  121 |       
  122 |       // Assert
  123 |       expect(logoutSuccessful).toBe(true);
  124 |       
  125 |       // Verify login page elements
  126 |       await expect(loginPage.usernameInput).toBeVisible();
  127 |       await expect(loginPage.passwordInput).toBeVisible();
  128 |       await expect(loginPage.loginButton).toBeVisible();
  129 |       
  130 |       // Verify cannot access inventory directly
  131 |       await page.goto('/inventory.html');
  132 |       await expect(page).toHaveURL(/.*index.html/);
  133 |     });
  134 |   });
  135 | 
  136 |   test.describe('Menu Functionality Tests', () => {
  137 |     test('Verify all menu items are present', async ({ 
  138 |       menu 
  139 |     }) => {
  140 |       await menu.open();
  141 |       
  142 |       // Verify all menu items are visible
  143 |       const items = await menu.getMenuItems();
  144 |       expect(items.length).toBe(4);
  145 |       
  146 |       for (const item of items) {
  147 |         expect(item.isVisible).toBe(true);
  148 |       }
  149 |       
  150 |       // Verify specific item texts
  151 |       const allItemsLink = await menu.getMenuItem('All Items');
  152 |       expect(allItemsLink).not.toBeNull();
  153 |       
  154 |       const aboutLink = await menu.getMenuItem('About');
  155 |       expect(aboutLink).not.toBeNull();
  156 |       
  157 |       const logoutLink = await menu.getMenuItem('Logout');
  158 |       expect(logoutLink).not.toBeNull();
  159 |       
  160 |       const resetLink = await menu.getMenuItem('Reset App State');
  161 |       expect(resetLink).not.toBeNull();
  162 |     });
  163 | 
  164 |     test('Menu persists after page navigation', async ({ 
  165 |       page, 
  166 |       inventoryPage, 
  167 |       menu 
  168 |     }) => {
  169 |       // Open menu
  170 |       await menu.open();
  171 |       const isOpenBefore = await menu.isOpen();
  172 |       expect(isOpenBefore).toBe(true);
  173 |       
  174 |       // Navigate to cart (menu should close)
  175 |       await inventoryPage.goToCart();
  176 |       await expect(page).toHaveURL(/.*cart.html/);
  177 |       
  178 |       // Menu should be closed after navigation
  179 |       const isOpenAfterNav = await menu.isOpen();
  180 |       expect(isOpenAfterNav).toBe(false);
  181 |       
  182 |       // Go back to inventory and open menu again
  183 |       await page.goBack();
  184 |       await menu.open();
  185 |       const isOpenAgain = await menu.isOpen();
  186 |       expect(isOpenAgain).toBe(true);
  187 |     });
  188 | 
  189 |     test('Menu keyboard navigation', async ({ 
  190 |       page, 
  191 |       menu 
  192 |     }) => {
  193 |       await menu.open();
  194 |       
  195 |       // Test tab navigation within menu
  196 |       await page.keyboard.press('Tab');
  197 |       
  198 |       // Focus should be on first menu item (All Items)
  199 |       const allItemsLink = page.locator('#inventory_sidebar_link');
> 200 |       await expect(allItemsLink).toBeFocused();
      |                                  ^ Error: expect(locator).toBeFocused() failed
  201 |       
  202 |       // Tab to next item
  203 |       await page.keyboard.press('Tab');
  204 |       const aboutLink = page.locator('#about_sidebar_link');
  205 |       await expect(aboutLink).toBeFocused();
  206 |       
  207 |       // Test Enter key to activate
  208 |       await page.keyboard.press('Enter');
  209 |       // About link should open new tab
  210 |       await page.waitForTimeout(1000);
  211 |     });
  212 | 
  213 |     test('Menu close with Escape key', async ({ 
  214 |       page, 
  215 |       menu 
  216 |     }) => {
  217 |       await menu.open();
  218 |       let isOpen = await menu.isOpen();
  219 |       expect(isOpen).toBe(true);
  220 |       
  221 |       // Press Escape to close menu
  222 |       await page.keyboard.press('Escape');
  223 |       
  224 |       // Wait for menu to close
  225 |       await page.waitForTimeout(500);
  226 |       isOpen = await menu.isOpen();
  227 |       expect(isOpen).toBe(false);
  228 |     });
  229 | 
  230 |     test('Menu close by clicking outside', async ({ 
  231 |       page, 
  232 |       menu 
  233 |     }) => {
  234 |       await menu.open();
  235 |       let isOpen = await menu.isOpen();
  236 |       expect(isOpen).toBe(true);
  237 |       
  238 |       // Click outside menu (on page content)
  239 |       await page.click('.inventory_container');
  240 |       
  241 |       // Wait for menu to close
  242 |       await page.waitForTimeout(500);
  243 |       isOpen = await menu.isOpen();
  244 |       expect(isOpen).toBe(false);
  245 |     });
  246 |   });
  247 | 
  248 |   test.describe('Reset App State Detailed Tests', () => {
  249 |     test('Reset app state with items in cart', async ({ 
  250 |       inventoryPage, 
  251 |       menu, 
  252 |       header, 
  253 |       page 
  254 |     }) => {
  255 |       // Add multiple items
  256 |       const productCount = await inventoryPage.getProductCount();
  257 |       for (let i = 0; i < Math.min(3, productCount); i++) {
  258 |         await inventoryPage.addProductToCart(i);
  259 |       }
  260 |       
  261 |       // Verify items added
  262 |       let cartCount = await header.getCartItemCount();
  263 |       expect(cartCount).toBe(Math.min(3, productCount));
  264 |       
  265 |       // Reset app state
  266 |       await menu.clickResetAppState();
  267 |       
  268 |       // Verify cart empty
  269 |       cartCount = await header.getCartItemCount();
  270 |       expect(cartCount).toBe(0);
  271 |       
  272 |       // Verify all buttons are "Add to cart"
  273 |       const removeButtons = page.locator('button:has-text("Remove")');
  274 |       const removeCount = await removeButtons.count();
  275 |       expect(removeCount).toBe(0);
  276 |     });
  277 | 
  278 |     test('Reset app state preserves login session', async ({ 
  279 |       page, 
  280 |       inventoryPage, 
  281 |       menu, 
  282 |       header 
  283 |     }) => {
  284 |       // Add items and reset
  285 |       await inventoryPage.addProductToCart(0);
  286 |       await menu.clickResetAppState();
  287 |       
  288 |       // Should still be logged in
  289 |       await expect(page).toHaveURL(/.*inventory.html/);
  290 |       await inventoryPage.verifyPageLoaded();
  291 |       
  292 |       // Can still perform actions
  293 |       await inventoryPage.addProductToCart(1);
  294 |       const cartCount = await header.getCartItemCount();
  295 |       expect(cartCount).toBe(1);
  296 |     });
  297 | 
  298 |     test('Reset app state multiple times', async ({ 
  299 |       inventoryPage, 
  300 |       menu, 
```