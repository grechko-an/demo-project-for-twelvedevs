# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\theme-swtcher.spec.ts >> Dark/Light Mode - Example Tests with Fixtures >> Test with clean storage
- Location: tests\e2e\theme-swtcher.spec.ts:75:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.login-container, .auth-form, form').or(locator('[data-testid="login-form"]'))
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('.login-container, .auth-form, form').or(locator('[data-testid="login-form"]'))

```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | 
  4   | /**
  5   |  * Login Page Page Object Model
  6   |  */
  7   | export class LoginPage extends BasePage {
  8   |   // Locators
  9   |   readonly usernameInput: Locator;
  10  |   readonly passwordInput: Locator;
  11  |   readonly loginButton: Locator;
  12  |   readonly errorMessage: Locator;
  13  |   readonly loginContainer: Locator;
  14  |   readonly rememberMeCheckbox: Locator;
  15  |   readonly forgotPasswordLink: Locator;
  16  | 
  17  |   constructor(page: Page) {
  18  |     super(page);
  19  |     
  20  |     // Initialize locators based on common patterns
  21  |     this.usernameInput = page.getByPlaceholder(/username|email|login/i)
  22  |       .or(page.locator('input[name="username"], input[name="email"], input[name="login"]'))
  23  |       .or(page.locator('#username, #email'))
  24  |       .first();
  25  | 
  26  |     this.passwordInput = page.getByPlaceholder(/password/i)
  27  |       .or(page.locator('input[name="password"], input[type="password"]'))
  28  |       .or(page.locator('#password'))
  29  |       .first();
  30  | 
  31  |     this.loginButton = page.getByRole('button', { name: /login|sign in|submit/i })
  32  |       .or(page.locator('button[type="submit"]'))
  33  |       .or(page.locator('.login-button, .submit-button'))
  34  |       .first();
  35  | 
  36  |     this.errorMessage = page.locator('.error-message, .alert-error, [data-testid="error"]')
  37  |       .or(page.getByText(/error|invalid|incorrect/i));
  38  | 
  39  |     this.loginContainer = page.locator('.login-container, .auth-form, form')
  40  |       .or(page.locator('[data-testid="login-form"]'));
  41  | 
  42  |     this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i })
  43  |       .or(page.locator('input[name="remember"]'));
  44  | 
  45  |     this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i })
  46  |       .or(page.locator('a[href*="forgot"]'));
  47  |   }
  48  | 
  49  |   /**
  50  |    * Navigate to login page
  51  |    */
  52  |   async gotoLoginPage(): Promise<void> {
  53  |     await this.goto('/login');
  54  |     await this.waitForPageLoad();
> 55  |     await expect(this.loginContainer).toBeVisible({ timeout: 10000 });
      |                                       ^ Error: expect(locator).toBeVisible() failed
  56  |   }
  57  | 
  58  |   /**
  59  |    * Perform login with credentials
  60  |    */
  61  |   async login(username: string, password: string, rememberMe: boolean = false): Promise<void> {
  62  |     await this.usernameInput.fill(username);
  63  |     await this.passwordInput.fill(password);
  64  |     
  65  |     if (rememberMe && await this.isElementPresent(this.rememberMeCheckbox)) {
  66  |       await this.rememberMeCheckbox.check();
  67  |     }
  68  |     
  69  |     await this.loginButton.click();
  70  |     await this.page.waitForLoadState('networkidle');
  71  |   }
  72  | 
  73  |   /**
  74  |    * Check if login page is displayed
  75  |    */
  76  |   async isLoginPageDisplayed(): Promise<boolean> {
  77  |     return await this.isElementVisible(this.loginContainer);
  78  |   }
  79  | 
  80  |   /**
  81  |    * Check if error message is displayed
  82  |    */
  83  |   async isErrorMessageDisplayed(): Promise<boolean> {
  84  |     return await this.isElementVisible(this.errorMessage);
  85  |   }
  86  | 
  87  |   /**
  88  |    * Get error message text
  89  |    */
  90  |   async getErrorMessage(): Promise<string> {
  91  |     if (await this.isErrorMessageDisplayed()) {
  92  |       return await this.errorMessage.textContent() || '';
  93  |     }
  94  |     return '';
  95  |   }
  96  | 
  97  |   /**
  98  |    * Check visual elements in both themes
  99  |    */
  100 |   async verifyThemeConsistency(): Promise<{
  101 |     inputsVisible: boolean;
  102 |     buttonVisible: boolean;
  103 |     contrastRatios: Record<string, number>;
  104 |   }> {
  105 |     const inputsVisible = await this.isElementVisible(this.usernameInput) && 
  106 |                          await this.isElementVisible(this.passwordInput);
  107 |     const buttonVisible = await this.isElementVisible(this.loginButton);
  108 |     
  109 |     // Simplified contrast check - in real tests use axe-core
  110 |     const contrastRatios = {
  111 |       usernameLabel: await this.getContrastRatio('label[for="username"]', 'body'),
  112 |       buttonText: await this.getContrastRatio('button', 'button')
  113 |     };
  114 | 
  115 |     return { inputsVisible, buttonVisible, contrastRatios };
  116 |   }
  117 | 
  118 |   /**
  119 |    * Take screenshot of login page for visual regression
  120 |    */
  121 |   async captureLoginPageScreenshot(theme: 'light' | 'dark'): Promise<void> {
  122 |     await this.takeScreenshot(`login-page-${theme}`);
  123 |   }
  124 | }
```