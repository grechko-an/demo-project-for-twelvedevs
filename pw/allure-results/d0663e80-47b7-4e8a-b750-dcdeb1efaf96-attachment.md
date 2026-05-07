# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\theme-swtcher.spec.ts >> Dark/Light Mode - Example Tests with Fixtures >> Theme toggle accessibility
- Location: tests\e2e\theme-swtcher.spec.ts:130:7

# Error details

```
TypeError: expect(received).toMatch(expected)

Matcher error: received value must be a string

Received has value: null
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
  36  |     // Setup test with dark theme
  37  |     const { loginPage, themeToggle } = await setupTestWithTheme(page, 'dark');
  38  |     
  39  |     // Verify dark theme is applied
  40  |     const isDark = await loginPage.isDarkThemeApplied();
  41  |     expect(isDark).toBeTruthy();
  42  |     
  43  |     // Verify toggle is present
  44  |     const togglePresent = await themeToggle.verifyHeaderTogglePresent();
  45  |     expect(togglePresent).toBeTruthy();
  46  |   });
  47  |   
  48  |   /**
  49  |    * Example testing theme across multiple pages
  50  |    */
  51  |   test('Test theme consistency across pages', async ({ page }) => {
  52  |     const results = await testThemeAcrossPages(page, 'light');
  53  |     
  54  |     // All pages should work with light theme
  55  |     expect(results.loginPageWorks).toBeTruthy();
  56  |     expect(results.dashboardPageWorks).toBeTruthy();
  57  |     expect(results.settingsPageWorks).toBeTruthy();
  58  |   });
  59  |   
  60  |   /**
  61  |    * Example testing theme persistence
  62  |    */
  63  |   test('Test theme persistence', async ({ page }) => {
  64  |     const results = await testThemePersistence(page, 'dark');
  65  |     
  66  |     // Theme should persist
  67  |     expect(results.storedInLocalStorage).toBeTruthy();
  68  |     expect(results.persistsAfterReload).toBeTruthy();
  69  |     expect(results.persistsAfterNavigation).toBeTruthy();
  70  |   });
  71  |   
  72  |   /**
  73  |    * Example with clean storage context
  74  |    */
  75  |   test('Test with clean storage', async ({ pageWithCleanStorage }) => {
  76  |     const loginPage = new LoginPage(pageWithCleanStorage);
  77  |     await loginPage.gotoLoginPage();
  78  |     
  79  |     // Should have no theme preference in clean storage
  80  |     const storedTheme = await loginPage.getLocalStorageItem('theme');
  81  |     expect(storedTheme).toBeNull();
  82  |     
  83  |     // Should use system/default theme
  84  |     const currentTheme = await loginPage.getCurrentTheme();
  85  |     expect(['light', 'dark', 'auto']).toContain(currentTheme);
  86  |   });
  87  |   
  88  |   /**
  89  |    * Example: Test all UI components in both themes
  90  |    */
  91  |   test('Comprehensive theme test', async ({ loginPage, dashboardPage, settingsPage, themeToggle }) => {
  92  |     // Test light theme
  93  |     await loginPage.gotoLoginPage();
  94  |     await themeToggle.setTheme('light');
  95  |     
  96  |     // Verify light theme
  97  |     const isLight = await loginPage.isLightThemeApplied();
  98  |     expect(isLight).toBeTruthy();
  99  |     
  100 |     // Test dashboard in light theme
  101 |     await dashboardPage.gotoDashboard();
  102 |     const lightDashboardResults = await dashboardPage.verifyUIComponentsRendering();
  103 |     expect(lightDashboardResults.navigation).toBeTruthy();
  104 |     
  105 |     // Test settings in light theme
  106 |     await settingsPage.gotoSettings();
  107 |     const isSettingsLoadedLight = await settingsPage.isSettingsPageLoaded();
  108 |     expect(isSettingsLoadedLight).toBeTruthy();
  109 |     
  110 |     // Switch to dark theme
  111 |     await themeToggle.setTheme('dark');
  112 |     
  113 |     // Verify dark theme
  114 |     const isDark = await loginPage.isDarkThemeApplied();
  115 |     expect(isDark).toBeTruthy();
  116 |     
  117 |     // Test dashboard in dark theme
  118 |     await dashboardPage.gotoDashboard();
  119 |     const darkDashboardResults = await dashboardPage.verifyUIComponentsRendering();
  120 |     expect(darkDashboardResults.navigation).toBeTruthy();
  121 |     
  122 |     // Verify dark mode uses soft grays
  123 |     const usesSoftGrays = await dashboardPage.verifyDarkModeUsesSoftGrays();
  124 |     expect(usesSoftGrays).toBeTruthy();
  125 |   });
  126 |   
  127 |   /**
  128 |    * Example: Accessibility testing
  129 |    */
  130 |   test('Theme toggle accessibility', async ({ themeToggle, page }) => {
  131 |     await page.goto('/');
  132 |     
  133 |     // Check toggle accessibility attributes
  134 |     const accessibilityInfo = await themeToggle.getToggleAccessibilityInfo();
  135 |     
> 136 |     expect(accessibilityInfo.role).toMatch(/button|switch|checkbox/);
      |                                    ^ TypeError: expect(received).toMatch(expected)
  137 |     expect(accessibilityInfo.ariaLabel).toBeTruthy();
  138 |     
  139 |     // Check keyboard accessibility
  140 |     const isKeyboardAccessible = await themeToggle.isKeyboardAccessible();
  141 |     expect(isKeyboardAccessible).toBeTruthy();
  142 |     
  143 |     // Test keyboard navigation
  144 |     await page.keyboard.press('Tab');
  145 |     
  146 |     // Check focus visibility
  147 |     const hasFocus = await page.evaluate(() => {
  148 |       const activeElement = document.activeElement;
  149 |       const style = getComputedStyle(activeElement as Element);
  150 |       return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
  151 |     });
  152 |     
  153 |     expect(hasFocus).toBeTruthy();
  154 |   });
  155 | });
```