import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Page Object Model
 */
export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginContainer: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators based on common patterns
    this.usernameInput = page.getByPlaceholder(/username|email|login/i)
      .or(page.locator('input[name="username"], input[name="email"], input[name="login"]'))
      .or(page.locator('#username, #email'))
      .first();

    this.passwordInput = page.getByPlaceholder(/password/i)
      .or(page.locator('input[name="password"], input[type="password"]'))
      .or(page.locator('#password'))
      .first();

    this.loginButton = page.getByRole('button', { name: /login|sign in|submit/i })
      .or(page.locator('button[type="submit"]'))
      .or(page.locator('.login-button, .submit-button'))
      .first();

    this.errorMessage = page.locator('.error-message, .alert-error, [data-testid="error"]')
      .or(page.getByText(/error|invalid|incorrect/i));

    this.loginContainer = page.locator('.login-container, .auth-form, form')
      .or(page.locator('[data-testid="login-form"]'));

    this.rememberMeCheckbox = page.getByRole('checkbox', { name: /remember me/i })
      .or(page.locator('input[name="remember"]'));

    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i })
      .or(page.locator('a[href*="forgot"]'));
  }

  /**
   * Navigate to login page
   */
  async gotoLoginPage(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
    await expect(this.loginContainer).toBeVisible({ timeout: 10000 });
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string, rememberMe: boolean = false): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    
    if (rememberMe && await this.isElementPresent(this.rememberMeCheckbox)) {
      await this.rememberMeCheckbox.check();
    }
    
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.loginContainer);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isErrorMessageDisplayed()) {
      return await this.errorMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Check visual elements in both themes
   */
  async verifyThemeConsistency(): Promise<{
    inputsVisible: boolean;
    buttonVisible: boolean;
    contrastRatios: Record<string, number>;
  }> {
    const inputsVisible = await this.isElementVisible(this.usernameInput) && 
                         await this.isElementVisible(this.passwordInput);
    const buttonVisible = await this.isElementVisible(this.loginButton);
    
    // Simplified contrast check - in real tests use axe-core
    const contrastRatios = {
      usernameLabel: await this.getContrastRatio('label[for="username"]', 'body'),
      buttonText: await this.getContrastRatio('button', 'button')
    };

    return { inputsVisible, buttonVisible, contrastRatios };
  }

  /**
   * Take screenshot of login page for visual regression
   */
  async captureLoginPageScreenshot(theme: 'light' | 'dark'): Promise<void> {
    await this.takeScreenshot(`login-page-${theme}`);
  }
}