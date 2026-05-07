# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\theme-swtcher.spec.ts >> Dark/Light Mode - Example Tests with Fixtures >> Setup test with specific theme
- Location: tests\e2e\theme-swtcher.spec.ts:35:7

# Error details

```
Error: page.evaluate: SecurityError: The operation is insecure.
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | 
  3   | /**
  4   |  * Base page class providing common functionality for all page objects
  5   |  */
  6   | export abstract class BasePage {
  7   |   readonly page: Page;
  8   | 
  9   |   constructor(page: Page) {
  10  |     this.page = page;
  11  |   }
  12  | 
  13  |   /**
  14  |    * Navigate to a specific URL
  15  |    */
  16  |   async goto(url: string): Promise<void> {
  17  |     await this.page.goto(url);
  18  |   }
  19  | 
  20  |   /**
  21  |    * Get current page URL
  22  |    */
  23  |   async getCurrentUrl(): Promise<string> {
  24  |     return this.page.url();
  25  |   }
  26  | 
  27  |   /**
  28  |    * Wait for page to be fully loaded
  29  |    */
  30  |   async waitForPageLoad(): Promise<void> {
  31  |     await this.page.waitForLoadState('networkidle');
  32  |   }
  33  | 
  34  |   /**
  35  |    * Take a screenshot of the current page
  36  |    */
  37  |   async takeScreenshot(name: string): Promise<void> {
  38  |     await this.page.screenshot({ 
  39  |       path: `test-results/screenshots/${name}-${Date.now()}.png`,
  40  |       fullPage: true 
  41  |     });
  42  |   }
  43  | 
  44  |   /**
  45  |    * Get page title
  46  |    */
  47  |   async getTitle(): Promise<string> {
  48  |     return await this.page.title();
  49  |   }
  50  | 
  51  |   /**
  52  |    * Check if element is visible
  53  |    */
  54  |   async isElementVisible(locator: Locator): Promise<boolean> {
  55  |     try {
  56  |       await expect(locator).toBeVisible({ timeout: 5000 });
  57  |       return true;
  58  |     } catch {
  59  |       return false;
  60  |     }
  61  |   }
  62  | 
  63  |   /**
  64  |    * Check if element exists in DOM (not necessarily visible)
  65  |    */
  66  |   async isElementPresent(locator: Locator): Promise<boolean> {
  67  |     return (await locator.count()) > 0;
  68  |   }
  69  | 
  70  |   /**
  71  |    * Clear browser localStorage
  72  |    */
  73  |   async clearLocalStorage(): Promise<void> {
> 74  |     await this.page.evaluate(() => {
      |                     ^ Error: page.evaluate: SecurityError: The operation is insecure.
  75  |       localStorage.clear();
  76  |     });
  77  |   }
  78  | 
  79  |   /**
  80  |    * Get value from localStorage
  81  |    */
  82  |   async getLocalStorageItem(key: string): Promise<string | null> {
  83  |     return await this.page.evaluate((k) => {
  84  |       return localStorage.getItem(k);
  85  |     }, key);
  86  |   }
  87  | 
  88  |   /**
  89  |    * Set value in localStorage
  90  |    */
  91  |   async setLocalStorageItem(key: string, value: string): Promise<void> {
  92  |     await this.page.evaluate(([k, v]) => {
  93  |       localStorage.setItem(k, v);
  94  |     }, [key, value]);
  95  |   }
  96  | 
  97  |   /**
  98  |    * Check if dark theme is applied by inspecting data-theme attribute or CSS class
  99  |    */
  100 |   async isDarkThemeApplied(): Promise<boolean> {
  101 |     // Check for common dark theme indicators
  102 |     const hasDataThemeDark = await this.page.evaluate(() => {
  103 |       return document.documentElement.getAttribute('data-theme') === 'dark' ||
  104 |              document.documentElement.classList.contains('dark') ||
  105 |              document.documentElement.classList.contains('dark-mode');
  106 |     });
  107 | 
  108 |     if (hasDataThemeDark) {
  109 |       return true;
  110 |     }
  111 | 
  112 |     // Check background color for dark theme
  113 |     const backgroundColor = await this.page.evaluate(() => {
  114 |       return getComputedStyle(document.body).backgroundColor;
  115 |     });
  116 | 
  117 |     // Dark theme backgrounds are typically dark colors
  118 |     const darkColors = ['rgb(18, 18, 18)', 'rgb(30, 30, 30)', 'rgb(33, 33, 33)', '#121212', '#1e1e1e', '#212121'];
  119 |     return darkColors.some(color => backgroundColor.includes(color));
  120 |   }
  121 | 
  122 |   /**
  123 |    * Check if light theme is applied
  124 |    */
  125 |   async isLightThemeApplied(): Promise<boolean> {
  126 |     return !(await this.isDarkThemeApplied());
  127 |   }
  128 | 
  129 |   /**
  130 |    * Get current theme from data-theme attribute
  131 |    */
  132 |   async getCurrentTheme(): Promise<'light' | 'dark' | 'auto' | 'unknown'> {
  133 |     const themeAttr = await this.page.evaluate(() => {
  134 |       return document.documentElement.getAttribute('data-theme');
  135 |     });
  136 | 
  137 |     if (themeAttr === 'light' || themeAttr === 'dark' || themeAttr === 'auto') {
  138 |       return themeAttr;
  139 |     }
  140 | 
  141 |     // Fallback to checking classes
  142 |     const hasDarkClass = await this.page.evaluate(() => {
  143 |       return document.documentElement.classList.contains('dark') ||
  144 |              document.documentElement.classList.contains('dark-mode');
  145 |     });
  146 | 
  147 |     if (hasDarkClass) {
  148 |       return 'dark';
  149 |     }
  150 | 
  151 |     const hasLightClass = await this.page.evaluate(() => {
  152 |       return document.documentElement.classList.contains('light') ||
  153 |              document.documentElement.classList.contains('light-mode');
  154 |     });
  155 | 
  156 |     if (hasLightClass) {
  157 |       return 'light';
  158 |     }
  159 | 
  160 |     return 'unknown';
  161 |   }
  162 | 
  163 |   /**
  164 |    * Check if meta color-scheme tag is present
  165 |    */
  166 |   async hasColorSchemeMetaTag(): Promise<boolean> {
  167 |     return await this.page.evaluate(() => {
  168 |       const meta = document.querySelector('meta[name="color-scheme"]');
  169 |       return meta !== null;
  170 |     });
  171 |   }
  172 | 
  173 |   /**
  174 |    * Get color-scheme meta tag content
```