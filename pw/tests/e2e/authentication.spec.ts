import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../../pages/pages/SauceDemoLoginPage';
import { InventoryPage } from '../../pages/pages/InventoryPage';

test.describe('SauceDemo Authentication Tests', () => {
  let loginPage: SauceDemoLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
  });

  test.describe('P0 - Critical Authentication Scenarios', () => {
    test('AUTH-01: Successful login with valid credentials @P0', async ({ page }) => {
      // Test ID: AUTH-01
      // Priority: P0
      // Steps: 1. Navigate to login page, 2. Enter valid username/password, 3. Click Login
      // Expected: User is redirected to inventory page

      // Act
      const inventoryPage = await loginPage.loginAsStandardUser();

      // Assert
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
      
      // Verify inventory page elements
      await expect(inventoryPage.productContainer).toBeVisible();
      await expect(inventoryPage.sortDropdown).toBeVisible();
      
      // Take screenshot for evidence
      await page.screenshot({ path: 'test-results/auth-successful.png', fullPage: true });
    });

    test('AUTH-04: Login with locked_out_user @P0', async ({ page }) => {
      // Test ID: AUTH-04
      // Priority: P0
      // Steps: 1. Enter locked_out_user, 2. Enter secret_sauce, 3. Click Login
      // Expected: Error "Sorry, this user has been locked out." appears

      // Act
      await loginPage.loginAsLockedOutUser();

      // Assert
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText = await loginPage.getErrorMessageText();
      expect(errorText).toContain('Sorry, this user has been locked out.');
      
      // Verify still on login page
      await expect(page).toHaveURL(/.*index.html/);
      await loginPage.verifyPageLoaded();
    });
  });

  test.describe('P1 - Important Authentication Scenarios', () => {
    test('AUTH-02: Login with invalid username @P1', async ({ page }) => {
      // Test ID: AUTH-02
      // Priority: P1
      // Steps: 1. Enter invalid username, 2. Enter valid password, 3. Click Login
      // Expected: Error message displayed, user stays on login page

      // Arrange
      const invalidUsername = 'invalid_user';
      const validPassword = 'secret_sauce';

      // Act
      const errorText = await loginPage.attemptInvalidLogin(invalidUsername, validPassword);

      // Assert
      expect(errorText).toContain('Username and password do not match');
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(/.*index.html/);
    });

    test('AUTH-03: Login with invalid password @P1', async ({ page }) => {
      // Test ID: AUTH-03
      // Priority: P1
      // Steps: 1. Enter valid username, 2. Enter invalid password, 3. Click Login
      // Expected: Error message displayed, user stays on login page

      // Arrange
      const validUsername = 'standard_user';
      const invalidPassword = 'wrong_password';

      // Act
      const errorText = await loginPage.attemptInvalidLogin(validUsername, invalidPassword);

      // Assert
      expect(errorText).toContain('Username and password do not match');
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(/.*index.html/);
    });

    test('AUTH-05: Logout functionality @P1', async ({ page }) => {
      // Test ID: AUTH-05
      // Priority: P1
      // Steps: 1. Login successfully, 2. Open menu, 3. Click Logout
      // Expected: User is redirected to login page

      // Arrange
      const inventoryPage = await loginPage.loginAsStandardUser();
      await inventoryPage.verifyPageLoaded();

      // Act - Logout via menu
      await inventoryPage.openMenu();
      const menuButton = page.locator('#logout_sidebar_link');
      await expect(menuButton).toBeVisible();
      await menuButton.click();

      // Assert
      await expect(page).toHaveURL(/.*index.html/);
      await loginPage.verifyPageLoaded();
      
      // Verify cannot access inventory directly
      await page.goto('/inventory.html');
      await expect(page).toHaveURL(/.*index.html/);
    });

    test('AUTH-06: Access protected page without login @P1', async ({ page }) => {
      // Test ID: AUTH-06
      // Priority: P1
      // Steps: 1. Navigate directly to /inventory.html, 2. Verify page
      // Expected: Redirected to login with error message

      // Act
      const redirected = await loginPage.testDirectAccessToProtectedPage('/inventory.html');

      // Assert
      expect(redirected).toBe(true);
      await loginPage.verifyPageLoaded();
      
      // Verify error message about authentication
      if (await loginPage.isErrorMessageDisplayed()) {
        const errorText = await loginPage.getErrorMessageText();
        expect(errorText).toContain('You can only access');
      }
    });
  });

  test.describe('Additional Authentication Tests', () => {
    test('Login with empty credentials', async ({ page }) => {
      // Test empty username
      await loginPage.attemptInvalidLogin('', 'secret_sauce');
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText1 = await loginPage.getErrorMessageText();
      expect(errorText1).toContain('Username is required');

      // Clear and test empty password
      await loginPage.clearForm();
      await loginPage.attemptInvalidLogin('standard_user', '');
      await expect(loginPage.errorMessage).toBeVisible();
      const errorText2 = await loginPage.getErrorMessageText();
      expect(errorText2).toContain('Password is required');
    });

    test('Login with problem_user account', async ({ page }) => {
      // This user has known issues but should still login
      const inventoryPage = await loginPage.login(
        'problem_user',
        'secret_sauce'
      );
      
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
      
      // Verify at least some products are displayed
      const productCount = await inventoryPage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    test('Login with performance_glitch_user', async ({ page }) => {
      // This user has performance delays but should still login
      const inventoryPage = await loginPage.login(
        'performance_glitch_user',
        'secret_sauce'
      );
      
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });

    test('Verify login form elements', async ({ page }) => {
      // Verify all form elements are present
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      
      // Verify placeholders
      const placeholders = await loginPage.getPlaceholderTexts();
      expect(placeholders.username).toBe('Username');
      expect(placeholders.password).toBe('Password');
      
      // Verify login button is enabled by default
      const isEnabled = await loginPage.isLoginButtonEnabled();
      expect(isEnabled).toBe(true);
      
      // Verify credentials hint is displayed
      await expect(loginPage.loginCredentials).toBeVisible();
      await expect(loginPage.passwordCredentials).toBeVisible();
    });

    test('Verify available credentials from page', async ({ page }) => {
      const credentials = await loginPage.getAvailableCredentialsFromPage();
      
      // Verify we got the expected usernames
      expect(credentials.usernames).toContain('standard_user');
      expect(credentials.usernames).toContain('locked_out_user');
      expect(credentials.usernames).toContain('problem_user');
      expect(credentials.usernames).toContain('performance_glitch_user');
      
      // Verify password
      expect(credentials.password).toBe('secret_sauce');
    });
  });

  test.describe('Session and Security Tests', () => {
    test('Session persistence after refresh', async ({ page }) => {
      // Login
      const inventoryPage = await loginPage.loginAsStandardUser();
      await inventoryPage.verifyPageLoaded();
      
      // Refresh page
      await page.reload();
      
      // Should still be logged in
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });

    test('Multiple failed login attempts', async ({ page }) => {
      // Attempt multiple failed logins
      for (let i = 0; i < 3; i++) {
        await loginPage.attemptInvalidLogin('wrong_user', 'wrong_pass');
        await expect(loginPage.errorMessage).toBeVisible();
        await loginPage.clearForm();
      }
      
      // Should still be able to login successfully after failures
      const inventoryPage = await loginPage.loginAsStandardUser();
      await expect(page).toHaveURL(/.*inventory.html/);
      await inventoryPage.verifyPageLoaded();
    });
  });
});