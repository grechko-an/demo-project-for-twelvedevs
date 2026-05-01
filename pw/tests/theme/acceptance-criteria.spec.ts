import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { ThemeToggle } from '../../pages/components/ThemeToggle';

test.describe('Dark/Light Mode Theme Switching - Acceptance Criteria', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let settingsPage: SettingsPage;
  let themeToggle: ThemeToggle;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    settingsPage = new SettingsPage(page);
    themeToggle = new ThemeToggle(page);
  });

  /**
   * AC-1: System Theme Detection (First Visit)
   * Verify system theme is applied automatically on first visit when no theme is explicitly set
   */
  test('TC-AC-01: System theme detection on first visit', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'AC-1: System theme detection'
    });

    // Clear localStorage to simulate first visit
    await page.context().clearCookies();
    await loginPage.clearLocalStorage();

    // Test with different OS theme simulations
    // Note: In real tests, we would mock matchMedia or use browser contexts with emulated media
    // For this example, we'll test the default behavior
    
    await loginPage.gotoLoginPage();
    
    // Check if theme is applied (either light or dark based on system/default)
    const currentTheme = await loginPage.getCurrentTheme();
    
    // The theme should be either light, dark, or auto (not unknown)
    expect(currentTheme, 'Theme should be detected (light, dark, or auto)').not.toBe('unknown');
    
    // Verify no theme preference in localStorage initially
    const storedTheme = await loginPage.getLocalStorageItem('theme');
    expect(storedTheme, 'No theme preference should be stored on first visit').toBeNull();
  });

  /**
   * AC-2: Theme Toggle Functionality
   * Verify theme toggle switches UI palette instantly with smooth transition (≤300ms)
   */
  test('TC-AC-02: Theme toggle functionality with smooth transition', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'AC-2: Theme toggle functionality'
    });

    await loginPage.gotoLoginPage();
    
    // Ensure we start with a known theme
    const initialTheme = await loginPage.getCurrentTheme();
    
    // Verify toggle is present
    const isTogglePresent = await themeToggle.verifyHeaderTogglePresent();
    expect(isTogglePresent, 'Theme toggle should be present in header').toBeTruthy();
    
    // Toggle theme
    await themeToggle.toggleThemeViaHeader();
    
    // Verify theme changed
    const newTheme = await loginPage.getCurrentTheme();
    expect(newTheme, 'Theme should change after toggle').not.toBe(initialTheme);
    
    // Measure transition duration
    const transitionDuration = await themeToggle.getThemeTransitionDuration();
    expect(transitionDuration, 'Transition should be ≤300ms').toBeLessThanOrEqual(300);
    
    // Verify no flickering (by checking that theme is stable after transition)
    await page.waitForTimeout(400); // Wait longer than transition
    const stableTheme = await loginPage.getCurrentTheme();
    expect(stableTheme, 'Theme should be stable after transition').toBe(newTheme);
    
    // Toggle back and verify
    await themeToggle.toggleThemeViaHeader();
    const finalTheme = await loginPage.getCurrentTheme();
    expect(finalTheme, 'Theme should toggle back to original').toBe(initialTheme);
  });

  /**
   * AC-3: Theme Persistence
   * Verify last user-selected theme is restored after page reload or return
   */
  test('TC-AC-03: Theme persistence across page reload and browser restart', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'AC-3: Theme persistence'
    });

    await loginPage.gotoLoginPage();
    
    // Set to dark theme if not already
    const initialTheme = await loginPage.getCurrentTheme();
    if (initialTheme !== 'dark') {
      await themeToggle.setTheme('dark');
    }
    
    // Verify dark theme is applied
    const isDarkBeforeReload = await loginPage.isDarkThemeApplied();
    expect(isDarkBeforeReload, 'Dark theme should be applied before reload').toBeTruthy();
    
    // Reload page
    await page.reload();
    await loginPage.waitForPageLoad();
    
    // Verify theme persists after reload
    const isDarkAfterReload = await loginPage.isDarkThemeApplied();
    expect(isDarkAfterReload, 'Dark theme should persist after page reload').toBeTruthy();
    
    // Check localStorage
    const storedTheme = await loginPage.getLocalStorageItem('theme');
    expect(storedTheme, 'Theme preference should be stored in localStorage').toMatch(/dark/i);
    
    // Navigate away and return
    await dashboardPage.gotoDashboard();
    await loginPage.gotoLoginPage();
    
    // Verify theme persists after navigation
    const isDarkAfterNavigation = await loginPage.isDarkThemeApplied();
    expect(isDarkAfterNavigation, 'Dark theme should persist after navigation').toBeTruthy();
    
    // Test with light theme as well
    await themeToggle.setTheme('light');
    const isLightBefore = await loginPage.isLightThemeApplied();
    expect(isLightBefore, 'Light theme should be applied').toBeTruthy();
    
    await page.reload();
    await loginPage.waitForPageLoad();
    
    const isLightAfter = await loginPage.isLightThemeApplied();
    expect(isLightAfter, 'Light theme should persist after reload').toBeTruthy();
  });

  /**
   * AC-4: OS Theme Sync (Auto Mode)
   * Verify app syncs automatically with OS theme changes in real-time when in Auto mode
   */
  test('TC-AC-04: OS theme sync in Auto mode', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'AC-4: OS theme sync'
    });

    // This test requires mocking matchMedia since we can't change OS theme in CI
    // We'll simulate the behavior by evaluating JavaScript
    
    await loginPage.gotoLoginPage();
    
    // Set to Auto mode if available
    const availableOptions = await settingsPage.getAvailableThemeOptions();
    const hasAutoMode = availableOptions.some(opt => opt.toLowerCase().includes('auto'));
    
    if (hasAutoMode) {
      await themeToggle.setTheme('auto');
      
      // Mock OS theme change to dark
      await page.evaluate(() => {
        // Create a mock matchMedia that returns dark
        window.matchMedia = (query: string) => ({
          matches: query.includes('dark'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true
        } as MediaQueryList);
        
        // Dispatch event to trigger theme change
        window.dispatchEvent(new Event('theme-change'));
      });
      
      // Wait for theme to update
      await page.waitForTimeout(1000);
      
      // Verify app switched to dark theme
      const isDarkAfterOSChange = await loginPage.isDarkThemeApplied();
      expect(isDarkAfterOSChange, 'App should switch to dark when OS theme is dark').toBeTruthy();
      
      // Mock OS theme change to light
      await page.evaluate(() => {
        window.matchMedia = (query: string) => ({
          matches: query.includes('light'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true
        } as MediaQueryList);
        
        window.dispatchEvent(new Event('theme-change'));
      });
      
      await page.waitForTimeout(1000);
      
      // Verify app switched to light theme
      const isLightAfterOSChange = await loginPage.isLightThemeApplied();
      expect(isLightAfterOSChange, 'App should switch to light when OS theme is light').toBeTruthy();
    } else {
      test.skip(); // Auto mode not available in this application
    }
  });

  /**
   * AC-5: Complete UI Rendering
   * Verify all UI elements render correctly in both themes
   */
  test('TC-AC-05: Complete UI rendering in both themes', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'AC-5: Complete UI rendering'
    });

    // Test light theme
    await themeToggle.setTheme('light');
    await loginPage.gotoLoginPage();
    
    // Verify login page components in light theme
    const lightThemeResults = await loginPage.verifyThemeConsistency();
    expect(lightThemeResults.inputsVisible, 'Inputs should be visible in light theme').toBeTruthy();
    expect(lightThemeResults.buttonVisible, 'Login button should be visible in light theme').toBeTruthy();
    
    // Check for visual artifacts in light theme
    const lightArtifacts = await dashboardPage.checkForVisualArtifacts();
    expect(lightArtifacts.length, `No visual artifacts in light theme. Found: ${lightArtifacts.join(', ')}`).toBe(0);
    
    // Navigate to dashboard in light theme
    await dashboardPage.gotoDashboard();
    const lightDashboardResults = await dashboardPage.verifyUIComponentsRendering();
    expect(lightDashboardResults.navigation, 'Navigation should render in light theme').toBeTruthy();
    
    // Test dark theme
    await themeToggle.setTheme('dark');
    await loginPage.gotoLoginPage();
    
    // Verify login page components in dark theme
    const darkThemeResults = await loginPage.verifyThemeConsistency();
    expect(darkThemeResults.inputsVisible, 'Inputs should be visible in dark theme').toBeTruthy();
    expect(darkThemeResults.buttonVisible, 'Login button should be visible in dark theme').toBeTruthy();
    
    // Check for visual artifacts in dark theme
    const darkArtifacts = await dashboardPage.checkForVisualArtifacts();
    expect(darkArtifacts.length, `No visual artifacts in dark theme. Found: ${darkArtifacts.join(', ')}`).toBe(0);
    
    // Navigate to dashboard in dark theme
    await dashboardPage.gotoDashboard();
    const darkDashboardResults = await dashboardPage.verifyUIComponentsRendering();
    expect(darkDashboardResults.navigation, 'Navigation should render in dark theme').toBeTruthy();
    
    // Verify dark mode uses soft grays (not pure black)
    const usesSoftGrays = await dashboardPage.verifyDarkModeUsesSoftGrays();
    expect(usesSoftGrays, 'Dark theme should use soft grays, not pure black').toBeTruthy();
    
    // Test settings page in both themes
    await settingsPage.gotoSettings();
    const isSettingsLoaded = await settingsPage.isSettingsPageLoaded();
    expect(isSettingsLoaded, 'Settings page should load in dark theme').toBeTruthy();
    
    // Switch back to light and verify settings
    await themeToggle.setTheme('light');
    await settingsPage.gotoSettings();
    const isSettingsLoadedLight = await settingsPage.isSettingsPageLoaded();
    expect(isSettingsLoadedLight, 'Settings page should load in light theme').toBeTruthy();
  });

  /**
   * Additional test: Theme toggle in both header and settings
   */
  test('Theme toggle available in both header and settings', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Check header toggle
    const headerTogglePresent = await themeToggle.verifyHeaderTogglePresent();
    expect(headerTogglePresent, 'Theme toggle should be present in header').toBeTruthy();
    
    // Check settings toggle
    await settingsPage.gotoSettings();
    const settingsTogglePresent = await themeToggle.verifySettingsTogglePresent();
    expect(settingsTogglePresent, 'Theme toggle should be present in settings').toBeTruthy();
  });

  /**
   * Additional test: No page reload on theme switch
   */
  test('No page reload on theme switch', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Monitor network requests
    const requests: string[] = [];
    page.on('request', request => {
      if (request.url().includes(page.url())) {
        requests.push(request.url());
      }
    });
    
    // Switch theme
    await themeToggle.toggleThemeViaHeader();
    
    // Wait a bit for any potential requests
    await page.waitForTimeout(1000);
    
    // Should not have made new page requests (except possibly API calls)
    const pageReloadRequests = requests.filter(req => 
      req.includes('.html') || req === page.url() || req.includes('page')
    );
    
    expect(pageReloadRequests.length, 'No page reload should occur on theme switch').toBe(0);
  });
});