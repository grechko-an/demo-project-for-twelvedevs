# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Navigation Flow Tests >> Complete navigation flow using menu
- Location: tests\e2e\menu-navigation.spec.ts:319:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#reset_sidebar_link')
    - locator resolved to <a href="#" tabindex="-1" id="reset_sidebar_link" class="bm-item menu-item" data-test="reset-sidebar-link">Reset App State</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is not visible
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    118 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms

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
      - generic [ref=e16]: Your Cart
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e28]:
              - generic [ref=e29]: $29.99
              - button "Remove" [ref=e30] [cursor=pointer]
      - generic [ref=e31]:
        - button "Go back Continue Shopping" [ref=e32] [cursor=pointer]:
          - img "Go back" [ref=e33]
          - text: Continue Shopping
        - button "Checkout" [ref=e34] [cursor=pointer]
  - contentinfo [ref=e35]:
    - list [ref=e36]:
      - listitem [ref=e37]:
        - link "Twitter" [ref=e38] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e39]:
        - link "Facebook" [ref=e40] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e41]:
        - link "LinkedIn" [ref=e42] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e43]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  3   | /**
  4   |  * Menu Component Page Object Model for SauceDemo
  5   |  * Handles sidebar menu interactions
  6   |  */
  7   | export class MenuComponent {
  8   |   readonly page: Page;
  9   |   
  10  |   // Locators
  11  |   readonly menuContainer: Locator;
  12  |   readonly closeButton: Locator;
  13  |   readonly allItemsLink: Locator;
  14  |   readonly aboutLink: Locator;
  15  |   readonly logoutLink: Locator;
  16  |   readonly resetAppStateLink: Locator;
  17  | 
  18  |   constructor(page: Page) {
  19  |     this.page = page;
  20  |     
  21  |     // Initialize locators with SauceDemo-specific selectors
  22  |     this.menuContainer = page.locator('.bm-menu');
  23  |     this.closeButton = page.locator('#react-burger-cross-btn');
  24  |     this.allItemsLink = page.locator('#inventory_sidebar_link');
  25  |     this.aboutLink = page.locator('#about_sidebar_link');
  26  |     this.logoutLink = page.locator('#logout_sidebar_link');
  27  |     this.resetAppStateLink = page.locator('#reset_sidebar_link');
  28  |   }
  29  | 
  30  |   /**
  31  |    * Open menu (if not already open)
  32  |    */
  33  |   async open(): Promise<void> {
  34  |     const isOpen = await this.isOpen();
  35  |     if (!isOpen) {
  36  |       const menuButton = this.page.locator('#react-burger-menu-btn');
  37  |       await menuButton.click();
  38  |       await this.waitForMenuOpen();
  39  |     }
  40  |   }
  41  | 
  42  |   /**
  43  |    * Close menu (if open)
  44  |    */
  45  |   async close(): Promise<void> {
  46  |     const isOpen = await this.isOpen();
  47  |     if (isOpen) {
  48  |       await this.closeButton.click();
  49  |       await this.waitForMenuClose();
  50  |     }
  51  |   }
  52  | 
  53  |   /**
  54  |    * Check if menu is open
  55  |    */
  56  |   async isOpen(): Promise<boolean> {
  57  |     return await this.menuContainer.isVisible();
  58  |   }
  59  | 
  60  |   /**
  61  |    * Wait for menu to open
  62  |    */
  63  |   async waitForMenuOpen(timeout: number = 3000): Promise<void> {
  64  |     await expect(this.menuContainer).toBeVisible({ timeout });
  65  |   }
  66  | 
  67  |   /**
  68  |    * Wait for menu to close
  69  |    */
  70  |   async waitForMenuClose(timeout: number = 3000): Promise<void> {
  71  |     await expect(this.menuContainer).toBeHidden({ timeout });
  72  |   }
  73  | 
  74  |   /**
  75  |    * Click All Items link
  76  |    */
  77  |   async clickAllItems(): Promise<void> {
  78  |     await this.open();
  79  |     await this.allItemsLink.click();
  80  |   }
  81  | 
  82  |   /**
  83  |    * Click About link
  84  |    */
  85  |   async clickAbout(): Promise<void> {
  86  |     await this.open();
  87  |     await this.aboutLink.click();
  88  |   }
  89  | 
  90  |   /**
  91  |    * Click Logout link
  92  |    */
  93  |   async clickLogout(): Promise<void> {
  94  |     await this.open();
  95  |     await this.logoutLink.click();
  96  |   }
  97  | 
  98  |   /**
  99  |    * Click Reset App State link
  100 |    */
  101 |   async clickResetAppState(): Promise<void> {
  102 |     await this.open();
> 103 |     await this.resetAppStateLink.click();
      |                                  ^ Error: locator.click: Test timeout of 60000ms exceeded.
  104 |     // Wait for reset to complete
  105 |     await this.page.waitForTimeout(1000);
  106 |   }
  107 | 
  108 |   /**
  109 |    * Get all menu items
  110 |    */
  111 |   async getMenuItems(): Promise<Array<{
  112 |     name: string;
  113 |     locator: Locator;
  114 |     isVisible: boolean;
  115 |   }>> {
  116 |     await this.open();
  117 |     
  118 |     return [
  119 |       {
  120 |         name: 'All Items',
  121 |         locator: this.allItemsLink,
  122 |         isVisible: await this.allItemsLink.isVisible()
  123 |       },
  124 |       {
  125 |         name: 'About',
  126 |         locator: this.aboutLink,
  127 |         isVisible: await this.aboutLink.isVisible()
  128 |       },
  129 |       {
  130 |         name: 'Logout',
  131 |         locator: this.logoutLink,
  132 |         isVisible: await this.logoutLink.isVisible()
  133 |       },
  134 |       {
  135 |         name: 'Reset App State',
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
```