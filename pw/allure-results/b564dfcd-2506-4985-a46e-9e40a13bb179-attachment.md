# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> P1 - Important Menu Scenarios >> MENU-04: Menu open/close functionality @P2
- Location: tests\e2e\menu-navigation.spec.ts:89:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
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
  - retrying click action
    - waiting 500ms

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
      |                              ^ Error: locator.click: Target page, context or browser has been closed
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