# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Navigation Flow Tests >> Complete navigation flow using menu
- Location: tests\e2e\menu-navigation.spec.ts:319:9

# Error details

```
TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/index.html" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  136 |         locator: this.resetAppStateLink,
  137 |         isVisible: await this.resetAppStateLink.isVisible()
  138 |       }
  139 |     ];
  140 |   }
  141 | 
  142 |   /**
  143 |    * Verify all menu items are present
  144 |    */
  145 |   async verifyAllMenuItemsPresent(): Promise<boolean> {
  146 |     const items = await this.getMenuItems();
  147 |     return items.every(item => item.isVisible);
  148 |   }
  149 | 
  150 |   /**
  151 |    * Get menu item by name
  152 |    */
  153 |   async getMenuItem(name: string): Promise<Locator | null> {
  154 |     const items = await this.getMenuItems();
  155 |     const item = items.find(i => i.name === name);
  156 |     return item ? item.locator : null;
  157 |   }
  158 | 
  159 |   /**
  160 |    * Take screenshot of menu
  161 |    */
  162 |   async takeMenuScreenshot(filename: string): Promise<void> {
  163 |     await this.open();
  164 |     await this.menuContainer.screenshot({ 
  165 |       path: `test-results/${filename}.png`
  166 |     });
  167 |     await this.close();
  168 |   }
  169 | 
  170 |   /**
  171 |    * Verify menu opens and closes correctly
  172 |    */
  173 |   async testMenuFunctionality(): Promise<{
  174 |     opens: boolean;
  175 |     closes: boolean;
  176 |     allItemsClickable: boolean;
  177 |     aboutClickable: boolean;
  178 |     logoutClickable: boolean;
  179 |     resetClickable: boolean;
  180 |   }> {
  181 |     // Test opening
  182 |     await this.open();
  183 |     const opens = await this.isOpen();
  184 |     
  185 |     // Test closing
  186 |     await this.close();
  187 |     const closes = !(await this.isOpen());
  188 |     
  189 |     // Test item clickability
  190 |     await this.open();
  191 |     const allItemsClickable = await this.allItemsLink.isEnabled();
  192 |     const aboutClickable = await this.aboutLink.isEnabled();
  193 |     const logoutClickable = await this.logoutLink.isEnabled();
  194 |     const resetClickable = await this.resetAppStateLink.isEnabled();
  195 |     
  196 |     await this.close();
  197 |     
  198 |     return {
  199 |       opens,
  200 |       closes,
  201 |       allItemsClickable,
  202 |       aboutClickable,
  203 |       logoutClickable,
  204 |       resetClickable
  205 |     };
  206 |   }
  207 | 
  208 |   /**
  209 |    * Reset app state and verify cart is empty
  210 |    */
  211 |   async resetAppStateAndVerify(): Promise<boolean> {
  212 |     // Get initial cart state
  213 |     const cartBadge = this.page.locator('.shopping_cart_badge');
  214 |     const hadItems = await cartBadge.isVisible();
  215 |     
  216 |     // Reset app state
  217 |     await this.clickResetAppState();
  218 |     
  219 |     // Verify cart is empty
  220 |     const cartEmpty = !(await cartBadge.isVisible());
  221 |     
  222 |     // Verify all "Add to cart" buttons are present (not "Remove")
  223 |     const removeButtons = this.page.locator('button:has-text("Remove")');
  224 |     const removeButtonsCount = await removeButtons.count();
  225 |     
  226 |     return cartEmpty && removeButtonsCount === 0;
  227 |   }
  228 | 
  229 |   /**
  230 |    * Logout and verify redirected to login page
  231 |    */
  232 |   async logoutAndVerify(): Promise<boolean> {
  233 |     await this.clickLogout();
  234 |     
  235 |     // Wait for navigation to login page
> 236 |     await this.page.waitForURL('**/index.html', { timeout: 5000 });
      |                     ^ TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
  237 |     
  238 |     // Check if on login page
  239 |     const loginButton = this.page.locator('#login-button');
  240 |     return await loginButton.isVisible();
  241 |   }
  242 | 
  243 |   /**
  244 |    * Navigate to About page and verify new tab opens
  245 |    */
  246 |   async navigateToAboutAndVerify(): Promise<boolean> {
  247 |     // Get current page count
  248 |     const context = this.page.context();
  249 |     const pagesBefore = context.pages().length;
  250 |     
  251 |     // Click About link
  252 |     await this.clickAbout();
  253 |     
  254 |     // Wait for new tab to open
  255 |     await this.page.waitForTimeout(2000);
  256 |     
  257 |     // Check if new page was opened
  258 |     const pagesAfter = context.pages().length;
  259 |     
  260 |     return pagesAfter > pagesBefore;
  261 |   }
  262 | }
```