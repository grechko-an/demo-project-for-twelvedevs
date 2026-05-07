# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> P1 - Important Menu Scenarios >> MENU-03: Reset App State @P2
- Location: tests\e2e\menu-navigation.spec.ts:56:9

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
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - element is outside of the viewport
  111 × retrying click action
        - waiting 500ms
        - waiting for element to be visible, enabled and stable
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
        - generic [ref=e14]: "2"
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
            - button "Remove" [ref=e48] [cursor=pointer]
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