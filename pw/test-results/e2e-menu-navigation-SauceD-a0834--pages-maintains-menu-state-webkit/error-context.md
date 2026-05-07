# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Navigation Flow Tests >> Navigation between pages maintains menu state
- Location: tests\e2e\menu-navigation.spec.ts:352:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
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
      - generic [ref=e15]: Your Cart
    - generic [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: QTY
        - generic [ref=e20]: Description
      - generic [ref=e21]:
        - button "Go back Continue Shopping" [ref=e22] [cursor=pointer]:
          - img "Go back" [ref=e23]
          - text: Continue Shopping
        - button "Checkout" [ref=e24] [cursor=pointer]
  - contentinfo [ref=e25]:
    - list [ref=e26]:
      - listitem [ref=e27]:
        - link "Twitter" [ref=e28]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e29]:
        - link "Facebook" [ref=e30]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e31]:
        - link "LinkedIn" [ref=e32]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e33]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
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
  301 |       header 
  302 |     }) => {
  303 |       // Test reset multiple times in sequence
  304 |       for (let i = 0; i < 3; i++) {
  305 |         // Add item
  306 |         await inventoryPage.addProductToCart(0);
  307 |         let cartCount = await header.getCartItemCount();
  308 |         expect(cartCount).toBe(1);
  309 |         
  310 |         // Reset
  311 |         await menu.clickResetAppState();
  312 |         cartCount = await header.getCartItemCount();
  313 |         expect(cartCount).toBe(0);
  314 |       }
  315 |     });
  316 |   });
  317 | 
  318 |   test.describe('Navigation Flow Tests', () => {
  319 |     test('Complete navigation flow using menu', async ({ 
  320 |       page, 
  321 |       inventoryPage, 
  322 |       menu, 
  323 |       header 
  324 |     }) => {
  325 |       // Start on inventory
  326 |       await inventoryPage.verifyPageLoaded();
  327 |       
  328 |       // Go to cart via header
  329 |       await header.goToCart();
  330 |       await expect(page).toHaveURL(/.*cart.html/);
  331 |       
  332 |       // Use menu to go back to All Items
  333 |       await menu.clickAllItems();
  334 |       await expect(page).toHaveURL(/.*inventory.html/);
  335 |       
  336 |       // Add item and go to cart again
  337 |       await inventoryPage.addProductToCart(0);
  338 |       await header.goToCart();
  339 |       
  340 |       // Use menu to reset app state
  341 |       await menu.clickResetAppState();
  342 |       
  343 |       // Cart should be empty
  344 |       const cartCount = await header.getCartItemCount();
  345 |       expect(cartCount).toBe(0);
  346 |       
  347 |       // Use menu to logout
  348 |       const logoutSuccessful = await menu.logoutAndVerify();
  349 |       expect(logoutSuccessful).toBe(true);
  350 |     });
  351 | 
  352 |     test('Navigation between pages maintains menu state', async ({ 
  353 |       page, 
  354 |       inventoryPage, 
  355 |       menu 
  356 |     }) => {
  357 |       // Open menu on inventory
  358 |       await menu.open();
  359 |       let isOpen = await menu.isOpen();
  360 |       expect(isOpen).toBe(true);
  361 |       
  362 |       // Navigate to cart - menu should close
  363 |       await inventoryPage.goToCart();
  364 |       isOpen = await menu.isOpen();
> 365 |       expect(isOpen).toBe(false);
      |                      ^ Error: expect(received).toBe(expected) // Object.is equality
  366 |       
  367 |       // Open menu on cart
  368 |       await menu.open();
  369 |       isOpen = await menu.isOpen();
  370 |       expect(isOpen).toBe(true);
  371 |       
  372 |       // Navigate back - menu should close
  373 |       await page.goBack();
  374 |       isOpen = await menu.isOpen();
  375 |       expect(isOpen).toBe(false);
  376 |     });
  377 |   });
  378 | 
  379 |   test.describe('Menu Accessibility Tests', () => {
  380 |     test('Verify menu ARIA attributes', async ({ 
  381 |       page, 
  382 |       menu 
  383 |     }) => {
  384 |       await menu.open();
  385 |       
  386 |       // Check menu container ARIA attributes
  387 |       const menuContainer = menu.menuContainer;
  388 |       const ariaHidden = await menuContainer.getAttribute('aria-hidden');
  389 |       // When open, aria-hidden should be false or not present
  390 |       
  391 |       // Check menu button ARIA attributes
  392 |       const menuButton = page.locator('#react-burger-menu-btn');
  393 |       const buttonAriaLabel = await menuButton.getAttribute('aria-label');
  394 |       expect(buttonAriaLabel).toBeTruthy();
  395 |       
  396 |       // Check close button ARIA attributes
  397 |       const closeButton = page.locator('#react-burger-cross-btn');
  398 |       const closeAriaLabel = await closeButton.getAttribute('aria-label');
  399 |       expect(closeAriaLabel).toBeTruthy();
  400 |     });
  401 | 
  402 |     test('Verify menu items have proper roles', async ({ 
  403 |       page, 
  404 |       menu 
  405 |     }) => {
  406 |       await menu.open();
  407 |       
  408 |       // Menu items should be links or buttons
  409 |       const allItemsLink = page.locator('#inventory_sidebar_link');
  410 |       const tagName = await allItemsLink.evaluate(el => el.tagName.toLowerCase());
  411 |       expect(['a', 'button']).toContain(tagName);
  412 |       
  413 |       // Check href or onclick attributes
  414 |       if (tagName === 'a') {
  415 |         const href = await allItemsLink.getAttribute('href');
  416 |         expect(href).toBeTruthy();
  417 |       }
  418 |     });
  419 | 
  420 |     test('Verify menu focus management', async ({ 
  421 |       page, 
  422 |       menu 
  423 |     }) => {
  424 |       // Open menu
  425 |       await menu.open();
  426 |       
  427 |       // Focus should be managed appropriately
  428 |       // When menu opens, focus might move to first item or stay on close button
  429 |       const activeElement = await page.evaluate(() => 
  430 |         document.activeElement?.id || document.activeElement?.className
  431 |       );
  432 |       
  433 |       // Accept various focus targets
  434 |       const validFocusTargets = [
  435 |         'react-burger-cross-btn',
  436 |         'inventory_sidebar_link',
  437 |         'about_sidebar_link'
  438 |       ];
  439 |       
  440 |       // Check if active element matches one of the valid targets
  441 |       let focusValid = false;
  442 |       for (const target of validFocusTargets) {
  443 |         if (activeElement?.includes(target)) {
  444 |           focusValid = true;
  445 |           break;
  446 |         }
  447 |       }
  448 |       
  449 |       expect(focusValid).toBe(true);
  450 |     });
  451 |   });
  452 | 
  453 |   test.describe('Error Handling & Edge Cases', () => {
  454 |     test('Menu functionality with problem_user', async ({ 
  455 |       page, 
  456 |       loginPage, 
  457 |       loginAsUser, 
  458 |       testCredentials 
  459 |     }) => {
  460 |       // Login as problem_user
  461 |       const problemInventory = await loginAsUser(
  462 |         testCredentials.problemUser.username,
  463 |         testCredentials.problemUser.password
  464 |       );
  465 |       await problemInventory.verifyPageLoaded();
```