# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Menu Accessibility Tests >> Verify menu focus management
- Location: tests\e2e\menu-navigation.spec.ts:420:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
  365 |       expect(isOpen).toBe(false);
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
> 449 |       expect(focusValid).toBe(true);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
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
  466 |       
  467 |       const problemMenu = new (await import('../../pom/components/MenuComponent')).MenuComponent(page);
  468 |       
  469 |       // Try to open menu
  470 |       await problemMenu.open();
  471 |       const isOpen = await problemMenu.isOpen();
  472 |       // problem_user might have menu issues but should at least not crash
  473 |       expect([true, false]).toContain(isOpen);
  474 |     });
  475 | 
  476 |     test('Menu functionality with performance_glitch_user', async ({ 
  477 |       page, 
  478 |       loginPage, 
  479 |       loginAsUser, 
  480 |       testCredentials 
  481 |     }) => {
  482 |       // Login as performance_glitch_user
  483 |       const perfInventory = await loginAsUser(
  484 |         testCredentials.performanceGlitchUser.username,
  485 |         testCredentials.performanceGlitchUser.password
  486 |       );
  487 |       await perfInventory.verifyPageLoaded();
  488 |       
  489 |       const perfMenu = new (await import('../../pom/components/MenuComponent')).MenuComponent(page);
  490 |       
  491 |       // Open menu (might be slow)
  492 |       await perfMenu.open();
  493 |       const isOpen = await perfMenu.isOpen();
  494 |       expect(isOpen).toBe(true);
  495 |       
  496 |       // Close menu
  497 |       await perfMenu.close();
  498 |       const isClosed = !(await perfMenu.isOpen());
  499 |       expect(isClosed).toBe(true);
  500 |     });
  501 | 
  502 |     test('Menu with maximum items in cart', async ({ 
  503 |       inventoryPage, 
  504 |       menu, 
  505 |       header 
  506 |     }) => {
  507 |       // Fill cart with all items
  508 |       const productCount = await inventoryPage.getProductCount();
  509 |       for (let i = 0; i < productCount; i++) {
  510 |         await inventoryPage.addProductToCart(i);
  511 |       }
  512 |       
  513 |       // Open menu and reset
  514 |       await menu.open();
  515 |       await menu.clickResetAppState();
  516 |       
  517 |       // Verify cart empty
  518 |       const cartCount = await header.getCartItemCount();
  519 |       expect(cartCount).toBe(0);
  520 |     });
  521 | 
  522 |     test('Take menu screenshots for documentation', async ({ 
  523 |       page, 
  524 |       inventoryPage, 
  525 |       menu 
  526 |     }) => {
  527 |       // Screenshot of closed state
  528 |       await page.screenshot({ 
  529 |         path: 'test-results/menu-closed.png',
  530 |         fullPage: false 
  531 |       });
  532 |       
  533 |       // Screenshot of open state
  534 |       await menu.open();
  535 |       await page.screenshot({ 
  536 |         path: 'test-results/menu-open.png',
  537 |         fullPage: false 
  538 |       });
  539 |       
  540 |       // Screenshot with cart items
  541 |       await inventoryPage.addProductToCart(0);
  542 |       await inventoryPage.addProductToCart(1);
  543 |       await page.screenshot({ 
  544 |         path: 'test-results/menu-with-cart-items.png',
  545 |         fullPage: false 
  546 |       });
  547 |       
  548 |       // Close menu for cleanup
  549 |       await menu.close();
```