# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\theme-swtcher.spec.ts >> Dark/Light Mode - Example Tests with Fixtures >> Theme toggle using fixtures
- Location: tests\e2e\theme-swtcher.spec.ts:14:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /theme|mode|toggle/i }).or(locator('[data-testid="theme-toggle"]')).or(locator('.theme-toggle')).or(locator('button:has(svg)').filter({ hasText: /🌙|☀️|🌞/ })).first()

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
  1   | import { Locator, Page } from '@playwright/test';
  2   | import { BasePage } from '../pages/BasePage';
  3   | 
  4   | /**
  5   |  * Theme Toggle Component Page Object Model
  6   |  * Represents the theme toggle switch/button in header/sidebar and settings
  7   |  */
  8   | export class ThemeToggle extends BasePage {
  9   |   // Common selectors for theme toggle elements
  10  |   readonly headerToggle: Locator;
  11  |   readonly settingsToggle: Locator;
  12  |   readonly toggleSwitch: Locator;
  13  |   readonly lightIcon: Locator;
  14  |   readonly darkIcon: Locator;
  15  |   readonly autoOption: Locator;
  16  |   readonly themeDropdown: Locator;
  17  |   readonly settingsMenu: Locator;
  18  | 
  19  |   constructor(page: Page) {
  20  |     super(page);
  21  |     
  22  |     // Initialize locators with common patterns
  23  |     // These selectors should be updated based on actual application implementation
  24  |     this.headerToggle = page.getByRole('button', { name: /theme|mode|toggle/i })
  25  |       .or(page.locator('[data-testid="theme-toggle"]'))
  26  |       .or(page.locator('.theme-toggle'))
  27  |       .or(page.locator('button:has(svg)').filter({ hasText: /🌙|☀️|🌞/ }))
  28  |       .first();
  29  | 
  30  |     this.settingsToggle = page.getByRole('button', { name: /appearance|theme/i })
  31  |       .or(page.locator('[data-testid="settings-theme-toggle"]'))
  32  |       .or(page.locator('a[href*="settings"], a[href*="appearance"]'))
  33  |       .first();
  34  | 
  35  |     this.toggleSwitch = page.locator('input[type="checkbox"][role="switch"]')
  36  |       .or(page.locator('.switch input'))
  37  |       .or(page.locator('[data-testid="theme-switch"]'));
  38  | 
  39  |     this.lightIcon = page.locator('.light-icon, [data-theme="light"]')
  40  |       .or(page.getByText('Light', { exact: true }))
  41  |       .or(page.locator('svg.light-mode'));
  42  | 
  43  |     this.darkIcon = page.locator('.dark-icon, [data-theme="dark"]')
  44  |       .or(page.getByText('Dark', { exact: true }))
  45  |       .or(page.locator('svg.dark-mode'));
  46  | 
  47  |     this.autoOption = page.getByText('Auto', { exact: true })
  48  |       .or(page.locator('[data-theme="auto"]'))
  49  |       .or(page.locator('option[value="auto"]'));
  50  | 
  51  |     this.themeDropdown = page.locator('select[name="theme"]')
  52  |       .or(page.locator('[data-testid="theme-select"]'))
  53  |       .or(page.locator('.theme-select'));
  54  | 
  55  |     this.settingsMenu = page.getByRole('link', { name: /settings/i })
  56  |       .or(page.locator('[data-testid="settings-menu"]'))
  57  |       .or(page.locator('a[href*="settings"]'));
  58  |   }
  59  | 
  60  |   /**
  61  |    * Navigate to settings appearance page
  62  |    */
  63  |   async navigateToSettings(): Promise<void> {
  64  |     await this.settingsMenu.click();
  65  |     await this.page.waitForLoadState('networkidle');
  66  |     // Wait for settings page to load
  67  |     await this.page.waitForSelector('h1:has-text("Settings"), h1:has-text("Appearance")', { timeout: 5000 });
  68  |   }
  69  | 
  70  |   /**
  71  |    * Toggle theme using header toggle
  72  |    */
  73  |   async toggleThemeViaHeader(): Promise<void> {
> 74  |     await this.headerToggle.click();
      |                             ^ Error: locator.click: Test timeout of 60000ms exceeded.
  75  |     // Wait for theme transition
  76  |     await this.page.waitForTimeout(350); // Slightly more than max transition time
  77  |   }
  78  | 
  79  |   /**
  80  |    * Toggle theme using settings toggle
  81  |    */
  82  |   async toggleThemeViaSettings(): Promise<void> {
  83  |     await this.navigateToSettings();
  84  |     await this.toggleSwitch.click();
  85  |     await this.page.waitForTimeout(350);
  86  |   }
  87  | 
  88  |   /**
  89  |    * Set theme to specific mode
  90  |    */
  91  |   async setTheme(mode: 'light' | 'dark' | 'auto'): Promise<void> {
  92  |     const currentTheme = await this.getCurrentTheme();
  93  |     
  94  |     if (currentTheme === mode) {
  95  |       return; // Already in desired theme
  96  |     }
  97  | 
  98  |     // Check which toggle mechanism is available
  99  |     if (await this.isElementPresent(this.themeDropdown)) {
  100 |       // Use dropdown selector
  101 |       await this.themeDropdown.selectOption(mode);
  102 |     } else if (await this.isElementPresent(this.toggleSwitch)) {
  103 |       // Use toggle switch (binary light/dark)
  104 |       if (mode === 'auto') {
  105 |         throw new Error('Auto mode not supported with toggle switch');
  106 |       }
  107 |       
  108 |       const isDark = await this.isDarkThemeApplied();
  109 |       if ((mode === 'dark' && !isDark) || (mode === 'light' && isDark)) {
  110 |         await this.toggleSwitch.click();
  111 |       }
  112 |     } else {
  113 |       // Use header toggle (binary light/dark)
  114 |       if (mode === 'auto') {
  115 |         throw new Error('Auto mode not supported with header toggle');
  116 |       }
  117 |       
  118 |       const isDark = await this.isDarkThemeApplied();
  119 |       if ((mode === 'dark' && !isDark) || (mode === 'light' && isDark)) {
  120 |         await this.toggleThemeViaHeader();
  121 |       }
  122 |     }
  123 |     
  124 |     await this.page.waitForTimeout(350);
  125 |   }
  126 | 
  127 |   /**
  128 |    * Get current theme from UI indicator
  129 |    */
  130 |   async getCurrentThemeFromUI(): Promise<'light' | 'dark' | 'auto' | 'unknown'> {
  131 |     // Check dropdown if present
  132 |     if (await this.isElementPresent(this.themeDropdown)) {
  133 |       const selectedValue = await this.themeDropdown.inputValue();
  134 |       if (selectedValue === 'light' || selectedValue === 'dark' || selectedValue === 'auto') {
  135 |         return selectedValue;
  136 |       }
  137 |     }
  138 | 
  139 |     // Check toggle switch state
  140 |     if (await this.isElementPresent(this.toggleSwitch)) {
  141 |       const isChecked = await this.toggleSwitch.isChecked();
  142 |       return isChecked ? 'dark' : 'light';
  143 |     }
  144 | 
  145 |     // Check icon visibility
  146 |     if (await this.isElementVisible(this.lightIcon)) {
  147 |       return 'light';
  148 |     }
  149 |     if (await this.isElementVisible(this.darkIcon)) {
  150 |       return 'dark';
  151 |     }
  152 | 
  153 |     return 'unknown';
  154 |   }
  155 | 
  156 |   /**
  157 |    * Verify toggle is present in header
  158 |    */
  159 |   async verifyHeaderTogglePresent(): Promise<boolean> {
  160 |     return await this.isElementVisible(this.headerToggle);
  161 |   }
  162 | 
  163 |   /**
  164 |    * Verify toggle is present in settings
  165 |    */
  166 |   async verifySettingsTogglePresent(): Promise<boolean> {
  167 |     await this.navigateToSettings();
  168 |     return await this.isElementVisible(this.toggleSwitch) || 
  169 |            await this.isElementVisible(this.themeDropdown);
  170 |   }
  171 | 
  172 |   /**
  173 |    * Rapidly toggle theme multiple times (for edge case testing)
  174 |    */
```