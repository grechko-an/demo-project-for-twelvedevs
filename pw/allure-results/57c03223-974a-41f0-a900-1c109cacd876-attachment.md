# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\menu-navigation.spec.ts >> SauceDemo Menu & Navigation Tests >> P1 - Important Menu Scenarios >> MENU-03: Reset App State @P2
- Location: tests\e2e\menu-navigation.spec.ts:56:9

# Error details

```
Error: locator.isVisible: Target page, context or browser has been closed
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Header Component Page Object Model for SauceDemo
  5   |  * Reusable component for header elements across pages
  6   |  */
  7   | export class HeaderComponent {
  8   |   readonly page: Page;
  9   |   
  10  |   // Locators
  11  |   readonly headerContainer: Locator;
  12  |   readonly menuButton: Locator;
  13  |   readonly shoppingCartLink: Locator;
  14  |   readonly cartBadge: Locator;
  15  |   readonly appLogo: Locator;
  16  |   readonly title: Locator;
  17  | 
  18  |   constructor(page: Page) {
  19  |     this.page = page;
  20  |     
  21  |     // Initialize locators with SauceDemo-specific selectors
  22  |     this.headerContainer = page.locator('.primary_header');
  23  |     this.menuButton = page.locator('#react-burger-menu-btn');
  24  |     this.shoppingCartLink = page.locator('.shopping_cart_link');
  25  |     this.cartBadge = page.locator('.shopping_cart_badge');
  26  |     this.appLogo = page.locator('.app_logo');
  27  |     this.title = page.locator('.title');
  28  |   }
  29  | 
  30  |   /**
  31  |    * Get cart item count from badge
  32  |    */
  33  |   async getCartItemCount(): Promise<number> {
> 34  |     const badgeVisible = await this.cartBadge.isVisible();
      |                                               ^ Error: locator.isVisible: Target page, context or browser has been closed
  35  |     if (!badgeVisible) {
  36  |       return 0;
  37  |     }
  38  |     const countText = await this.cartBadge.textContent();
  39  |     return parseInt(countText || '0', 10);
  40  |   }
  41  | 
  42  |   /**
  43  |    * Verify cart badge shows specific count
  44  |    */
  45  |   async verifyCartBadgeCount(expectedCount: number): Promise<boolean> {
  46  |     const actualCount = await this.getCartItemCount();
  47  |     return actualCount === expectedCount;
  48  |   }
  49  | 
  50  |   /**
  51  |    * Navigate to cart page
  52  |    */
  53  |   async goToCart(): Promise<void> {
  54  |     await this.shoppingCartLink.click();
  55  |   }
  56  | 
  57  |   /**
  58  |    * Open menu
  59  |    */
  60  |   async openMenu(): Promise<void> {
  61  |     await this.menuButton.click();
  62  |     // Wait for menu animation
  63  |     await this.page.waitForTimeout(300);
  64  |   }
  65  | 
  66  |   /**
  67  |    * Get app logo text
  68  |    */
  69  |   async getAppLogoText(): Promise<string> {
  70  |     return await this.appLogo.textContent() || '';
  71  |   }
  72  | 
  73  |   /**
  74  |    * Get page title text
  75  |    */
  76  |   async getPageTitle(): Promise<string> {
  77  |     return await this.title.textContent() || '';
  78  |   }
  79  | 
  80  |   /**
  81  |    * Verify header is visible
  82  |    */
  83  |   async isHeaderVisible(): Promise<boolean> {
  84  |     return await this.headerContainer.isVisible();
  85  |   }
  86  | 
  87  |   /**
  88  |    * Verify shopping cart link is visible
  89  |    */
  90  |   async isShoppingCartVisible(): Promise<boolean> {
  91  |     return await this.shoppingCartLink.isVisible();
  92  |   }
  93  | 
  94  |   /**
  95  |    * Verify menu button is visible
  96  |    */
  97  |   async isMenuButtonVisible(): Promise<boolean> {
  98  |     return await this.menuButton.isVisible();
  99  |   }
  100 | 
  101 |   /**
  102 |    * Take screenshot of header
  103 |    */
  104 |   async takeHeaderScreenshot(filename: string): Promise<void> {
  105 |     await this.headerContainer.screenshot({ 
  106 |       path: `test-results/${filename}.png`
  107 |     });
  108 |   }
  109 | 
  110 |   /**
  111 |    * Verify all header elements are displayed
  112 |    */
  113 |   async verifyAllElementsDisplayed(): Promise<{
  114 |     header: boolean;
  115 |     menuButton: boolean;
  116 |     cartLink: boolean;
  117 |     appLogo: boolean;
  118 |     title: boolean;
  119 |   }> {
  120 |     return {
  121 |       header: await this.isHeaderVisible(),
  122 |       menuButton: await this.isMenuButtonVisible(),
  123 |       cartLink: await this.isShoppingCartVisible(),
  124 |       appLogo: await this.appLogo.isVisible(),
  125 |       title: await this.title.isVisible()
  126 |     };
  127 |   }
  128 | 
  129 |   /**
  130 |    * Wait for cart badge to update
  131 |    */
  132 |   async waitForCartBadgeUpdate(expectedCount: number, timeout: number = 5000): Promise<boolean> {
  133 |     try {
  134 |       await expect(this.cartBadge).toHaveText(expectedCount.toString(), { timeout });
```