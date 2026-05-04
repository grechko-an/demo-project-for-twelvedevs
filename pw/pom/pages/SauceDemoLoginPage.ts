import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryPage } from './InventoryPage';

/**
 * SauceDemo-specific Login Page Page Object Model
 */
export class SauceDemoLoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginContainer: Locator;
  readonly loginCredentials: Locator;
  readonly passwordCredentials: Locator;

  // Test credentials
  readonly credentials = {
    standardUser: {
      username: 'standard_user',
      password: 'secret_sauce'
    },
    lockedOutUser: {
      username: 'locked_out_user',
      password: 'secret_sauce'
    },
    problemUser: {
      username: 'problem_user',
      password: 'secret_sauce'
    },
    performanceGlitchUser: {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    },
    errorUser: {
      username: 'error_user',
      password: 'secret_sauce'
    },
    visualUser: {
      username: 'visual_user',
      password: 'secret_sauce'
    }
  };

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginContainer = page.locator('.login_container');
    this.loginCredentials = page.locator('.login_credentials');
    this.passwordCredentials = page.locator('.login_password');
  }

  /**
   * Navigate to login page
   */
  async gotoLoginPage(): Promise<void> {
    await this.page.goto('/');
    await this.verifyPageLoaded();
  }

  /**
   * Login with credentials
   */
  async login(username: string, password: string): Promise<InventoryPage> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    // Return inventory page object
    return new InventoryPage(this.page);
  }

  /**
   * Login as standard user
   */
  async loginAsStandardUser(): Promise<InventoryPage> {
    return await this.login(
      this.credentials.standardUser.username,
      this.credentials.standardUser.password
    );
  }

  /**
   * Login as locked out user
   */
  async loginAsLockedOutUser(): Promise<void> {
    await this.login(
      this.credentials.lockedOutUser.username,
      this.credentials.lockedOutUser.password
    );
  }

  /**
   * Get error message text
   */
  async getErrorMessageText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Verify error message contains specific text
   */
  async verifyErrorMessageContains(text: string): Promise<boolean> {
    const errorText = await this.getErrorMessageText();
    return errorText.includes(text);
  }

  /**
   * Attempt login with invalid credentials
   */
  async attemptInvalidLogin(username: string, password: string): Promise<string> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    // Wait for error message
    await this.page.waitForTimeout(500);
    
    return await this.getErrorMessageText();
  }

  /**
   * Clear login form
   */
  async clearForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.loginContainer).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /**
   * Verify login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  /**
   * Get placeholder texts
   */
  async getPlaceholderTexts(): Promise<{
    username: string;
    password: string;
  }> {
    return {
      username: await this.usernameInput.getAttribute('placeholder') || '',
      password: await this.passwordInput.getAttribute('placeholder') || ''
    };
  }

  /**
   * Test direct access to protected page
   */
  async testDirectAccessToProtectedPage(url: string): Promise<boolean> {
    // Navigate directly to protected page
    await this.page.goto(url);
    
    // Wait for potential redirect
    await this.page.waitForTimeout(1000);
    
    // Check if we're still on login page
    const currentUrl = this.page.url();
    return currentUrl.includes('index.html') || await this.loginContainer.isVisible();
  }

  /**
   * Get available credentials from page
   */
  async getAvailableCredentialsFromPage(): Promise<{
    usernames: string[];
    password: string;
  }> {
    const credentialsText = await this.loginCredentials.textContent() || '';
    const passwordText = await this.passwordCredentials.textContent() || '';
    
    // Extract usernames from text (format: "Accepted usernames are:\nstandard_user\nlocked_out_user\n...")
    const lines = credentialsText.split('\n');
    const usernames = lines
      .filter(line => line.trim() && !line.includes('Accepted usernames'))
      .map(line => line.trim());
    
    // Extract password (format: "Password for all users:\nsecret_sauce")
    const passwordLines = passwordText.split('\n');
    const password = passwordLines
      .find(line => line.trim() && !line.includes('Password for all users'))
      ?.trim() || 'secret_sauce';
    
    return { usernames, password };
  }
}