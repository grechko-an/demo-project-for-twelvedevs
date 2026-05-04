import { expect } from '@playwright/test';
import { test, setupTestWithTheme, testThemeAcrossPages, testThemePersistence } from '../../fixtures/fixtures';
import { LoginPage } from '../../pom/pages/LoginPage';

/**
 * Example tests using the theme fixtures
 * Demonstrates how to use the custom fixtures and helpers
 */
test.describe('Dark/Light Mode - Example Tests with Fixtures', () => {
  
  /**
   * Example using custom fixtures
   */
  test('Theme toggle using fixtures', async ({ loginPage, themeToggle }) => {
    await loginPage.gotoLoginPage();
    
    // Get initial theme
    const initialTheme = await loginPage.getCurrentTheme();
    
    // Toggle theme
    await themeToggle.toggleThemeViaHeader();
    
    // Verify theme changed
    const newTheme = await loginPage.getCurrentTheme();
    expect(newTheme).not.toBe(initialTheme);
    
    // Verify transition duration
    const transitionDuration = await themeToggle.getThemeTransitionDuration();
    expect(transitionDuration).toBeLessThanOrEqual(300);
  });
  
  /**
   * Example using setup helper
   */
  test('Setup test with specific theme', async ({ page }) => {
    // Setup test with dark theme
    const { loginPage, themeToggle } = await setupTestWithTheme(page, 'dark');
    
    // Verify dark theme is applied
    const isDark = await loginPage.isDarkThemeApplied();
    expect(isDark).toBeTruthy();
    
    // Verify toggle is present
    const togglePresent = await themeToggle.verifyHeaderTogglePresent();
    expect(togglePresent).toBeTruthy();
  });
  
  /**
   * Example testing theme across multiple pages
   */
  test('Test theme consistency across pages', async ({ page }) => {
    const results = await testThemeAcrossPages(page, 'light');
    
    // All pages should work with light theme
    expect(results.loginPageWorks).toBeTruthy();
    expect(results.dashboardPageWorks).toBeTruthy();
    expect(results.settingsPageWorks).toBeTruthy();
  });
  
  /**
   * Example testing theme persistence
   */
  test('Test theme persistence', async ({ page }) => {
    const results = await testThemePersistence(page, 'dark');
    
    // Theme should persist
    expect(results.storedInLocalStorage).toBeTruthy();
    expect(results.persistsAfterReload).toBeTruthy();
    expect(results.persistsAfterNavigation).toBeTruthy();
  });
  
  /**
   * Example with clean storage context
   */
  test('Test with clean storage', async ({ pageWithCleanStorage }) => {
    const loginPage = new LoginPage(pageWithCleanStorage);
    await loginPage.gotoLoginPage();
    
    // Should have no theme preference in clean storage
    const storedTheme = await loginPage.getLocalStorageItem('theme');
    expect(storedTheme).toBeNull();
    
    // Should use system/default theme
    const currentTheme = await loginPage.getCurrentTheme();
    expect(['light', 'dark', 'auto']).toContain(currentTheme);
  });
  
  /**
   * Example: Test all UI components in both themes
   */
  test('Comprehensive theme test', async ({ loginPage, dashboardPage, settingsPage, themeToggle }) => {
    // Test light theme
    await loginPage.gotoLoginPage();
    await themeToggle.setTheme('light');
    
    // Verify light theme
    const isLight = await loginPage.isLightThemeApplied();
    expect(isLight).toBeTruthy();
    
    // Test dashboard in light theme
    await dashboardPage.gotoDashboard();
    const lightDashboardResults = await dashboardPage.verifyUIComponentsRendering();
    expect(lightDashboardResults.navigation).toBeTruthy();
    
    // Test settings in light theme
    await settingsPage.gotoSettings();
    const isSettingsLoadedLight = await settingsPage.isSettingsPageLoaded();
    expect(isSettingsLoadedLight).toBeTruthy();
    
    // Switch to dark theme
    await themeToggle.setTheme('dark');
    
    // Verify dark theme
    const isDark = await loginPage.isDarkThemeApplied();
    expect(isDark).toBeTruthy();
    
    // Test dashboard in dark theme
    await dashboardPage.gotoDashboard();
    const darkDashboardResults = await dashboardPage.verifyUIComponentsRendering();
    expect(darkDashboardResults.navigation).toBeTruthy();
    
    // Verify dark mode uses soft grays
    const usesSoftGrays = await dashboardPage.verifyDarkModeUsesSoftGrays();
    expect(usesSoftGrays).toBeTruthy();
  });
  
  /**
   * Example: Accessibility testing
   */
  test('Theme toggle accessibility', async ({ themeToggle, page }) => {
    await page.goto('/');
    
    // Check toggle accessibility attributes
    const accessibilityInfo = await themeToggle.getToggleAccessibilityInfo();
    
    expect(accessibilityInfo.role).toMatch(/button|switch|checkbox/);
    expect(accessibilityInfo.ariaLabel).toBeTruthy();
    
    // Check keyboard accessibility
    const isKeyboardAccessible = await themeToggle.isKeyboardAccessible();
    expect(isKeyboardAccessible).toBeTruthy();
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    
    // Check focus visibility
    const hasFocus = await page.evaluate(() => {
      const activeElement = document.activeElement;
      const style = getComputedStyle(activeElement as Element);
      return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
    });
    
    expect(hasFocus).toBeTruthy();
  });
});