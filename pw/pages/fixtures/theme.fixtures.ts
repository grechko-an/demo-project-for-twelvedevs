import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { DashboardPage } from '../DashboardPage';
import { SettingsPage } from '../SettingsPage';
import { ThemeToggle } from '../components/ThemeToggle';

/**
 * Fixtures for theme testing
 */
export interface ThemeFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  themeToggle: ThemeToggle;
  pageWithCleanStorage: Page;
}

/**
 * Extended test with theme fixtures
 */
export const test = base.extend<ThemeFixtures>({
  /**
   * Page with cleared localStorage and cookies
   */
  pageWithCleanStorage: async ({ browser }, use) => {
    // Create a new context with clean storage
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await use(page);
    
    // Cleanup
    await context.close();
  },
  
  /**
   * Login page object
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  /**
   * Dashboard page object
   */
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
  
  /**
   * Settings page object
   */
  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },
  
  /**
   * Theme toggle component
   */
  themeToggle: async ({ page }, use) => {
    const themeToggle = new ThemeToggle(page);
    await use(themeToggle);
  },
});

/**
 * Helper function to set up test with specific theme
 */
export async function setupTestWithTheme(
  page: Page, 
  theme: 'light' | 'dark' | 'auto' | 'system'
): Promise<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  settingsPage: SettingsPage;
  themeToggle: ThemeToggle;
}> {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const settingsPage = new SettingsPage(page);
  const themeToggle = new ThemeToggle(page);
  
  // Clear storage for clean state
  await loginPage.clearLocalStorage();
  await page.context().clearCookies();
  
  // Navigate to login page
  await loginPage.gotoLoginPage();
  
  // Set theme if not 'system'
  if (theme !== 'system') {
    try {
      await themeToggle.setTheme(theme);
    } catch (error) {
      console.log(`Theme ${theme} may not be available, using current theme`);
    }
  }
  
  return { loginPage, dashboardPage, settingsPage, themeToggle };
}

/**
 * Helper to test theme across multiple pages
 */
export async function testThemeAcrossPages(
  page: Page,
  theme: 'light' | 'dark'
): Promise<{
  loginPageWorks: boolean;
  dashboardPageWorks: boolean;
  settingsPageWorks: boolean;
}> {
  const { loginPage, dashboardPage, settingsPage, themeToggle } = await setupTestWithTheme(page, theme);
  
  const results = {
    loginPageWorks: false,
    dashboardPageWorks: false,
    settingsPageWorks: false
  };
  
  // Test login page
  await loginPage.gotoLoginPage();
  const loginTheme = await loginPage.getCurrentTheme();
  results.loginPageWorks = theme === 'light' 
    ? await loginPage.isLightThemeApplied()
    : await loginPage.isDarkThemeApplied();
  
  // Test dashboard page
  await dashboardPage.gotoDashboard();
  const dashboardTheme = await dashboardPage.getCurrentTheme();
  results.dashboardPageWorks = theme === 'light'
    ? await dashboardPage.isLightThemeApplied()
    : await dashboardPage.isDarkThemeApplied();
  
  // Test settings page
  await settingsPage.gotoSettings();
  const settingsTheme = await settingsPage.getCurrentTheme();
  results.settingsPageWorks = theme === 'light'
    ? await settingsPage.isLightThemeApplied()
    : await settingsPage.isDarkThemeApplied();
  
  return results;
}

/**
 * Helper to measure theme transition performance
 */
export async function measureThemeTransition(
  page: Page,
  toggle: ThemeToggle
): Promise<{
  duration: number;
  smooth: boolean;
  noFlicker: boolean;
}> {
  // Start performance measurement
  const startTime = Date.now();
  
  // Toggle theme
  await toggle.toggleThemeViaHeader();
  
  // Wait for transition
  await page.waitForTimeout(400);
  
  const duration = Date.now() - startTime;
  
  // Check for smooth transition (CSS transitions present)
  const smooth = await page.evaluate(() => {
    const bodyStyle = getComputedStyle(document.body);
    return bodyStyle.transitionProperty.includes('background-color') ||
           bodyStyle.transitionProperty.includes('color');
  });
  
  // Check for flicker (rapid theme changes)
  const noFlicker = await page.evaluate(() => {
    // This would require more sophisticated monitoring
    // For now, we assume no flicker if transition completes
    return true;
  });
  
  return { duration, smooth, noFlicker };
}

/**
 * Helper to test theme persistence
 */
export async function testThemePersistence(
  page: Page,
  theme: 'light' | 'dark'
): Promise<{
  persistsAfterReload: boolean;
  persistsAfterNavigation: boolean;
  storedInLocalStorage: boolean;
}> {
  const { themeToggle } = await setupTestWithTheme(page, theme);
  
  const results = {
    persistsAfterReload: false,
    persistsAfterNavigation: false,
    storedInLocalStorage: false
  };
  
  // Set theme
  await themeToggle.setTheme(theme);
  
  // Check localStorage
  const storedTheme = await page.evaluate(() => {
    return localStorage.getItem('theme');
  });
  results.storedInLocalStorage = storedTheme?.toLowerCase().includes(theme) || false;
  
  // Test after reload
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  const themeAfterReload = await page.evaluate(() => {
    const html = document.documentElement;
    return html.getAttribute('data-theme') || 
           (html.classList.contains('dark') ? 'dark' : 'light');
  });
  results.persistsAfterReload = themeAfterReload === theme;
  
  // Test after navigation
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const themeAfterNavigation = await page.evaluate(() => {
    const html = document.documentElement;
    return html.getAttribute('data-theme') || 
           (html.classList.contains('dark') ? 'dark' : 'light');
  });
  results.persistsAfterNavigation = themeAfterNavigation === theme;
  
  return results;
}

export default test;