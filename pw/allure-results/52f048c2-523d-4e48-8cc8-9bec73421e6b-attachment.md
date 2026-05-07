# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> Error Handling & Edge Cases >> Menu functionality with performance_glitch_user
- Location: tests\e2e\menu-navigation.spec.ts:476:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#react-burger-cross-btn')
    - locator resolved to <button type="button" tabindex="-1" id="react-burger-cross-btn">Close Menu</button>
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
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | 
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
> 48  |       await this.closeButton.click();
      |                              ^ Error: locator.click: Test timeout of 60000ms exceeded.
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
  103 |     await this.resetAppStateLink.click();
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
```