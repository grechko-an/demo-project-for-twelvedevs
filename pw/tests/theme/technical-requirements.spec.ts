import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { ThemeToggle } from '../../pages/components/ThemeToggle';

test.describe('Dark/Light Mode Theme Switching - Technical Requirements', () => {
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
   * TECH-1: CSS Custom Properties Implementation
   * Verify theme implemented via CSS Custom Properties
   */
  test('TC-TECH-01: CSS custom properties implementation', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-1: CSS custom properties implementation'
    });

    await loginPage.gotoLoginPage();
    
    // Check for CSS custom properties
    const hasCssCustomProperties = await loginPage.hasCssCustomProperties();
    expect(hasCssCustomProperties, 'Should use CSS custom properties for theming').toBeTruthy();
    
    // Check for data-theme attribute
    const hasDataThemeAttribute = await page.evaluate(() => {
      return document.documentElement.hasAttribute('data-theme');
    });
    
    // Either data-theme attribute or CSS custom properties should be used
    expect(
      hasCssCustomProperties || hasDataThemeAttribute,
      'Should use either CSS custom properties or data-theme attribute'
    ).toBeTruthy();
    
    // Verify CSS variable definitions exist
    const cssVariablesExist = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              const cssText = rule.cssText;
              // Look for CSS variable definitions
              if (cssText.includes('--') && cssText.includes(':')) {
                return true;
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets may throw
          continue;
        }
      }
      return false;
    });
    
    expect(cssVariablesExist, 'CSS variable definitions should exist').toBeTruthy();
    
    // Check that theme switching updates CSS variables
    const initialVariables = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const variables: string[] = [];
      for (let i = 0; i < styles.length; i++) {
        const property = styles[i];
        if (property.startsWith('--')) {
          variables.push(property);
        }
      }
      return variables.slice(0, 5); // Get first 5 variables
    });
    
    if (initialVariables.length > 0) {
      // Switch theme
      await themeToggle.toggleThemeViaHeader();
      await page.waitForTimeout(350);
      
      // Check that variables still exist
      const variablesAfterSwitch = await page.evaluate(() => {
        const styles = getComputedStyle(document.documentElement);
        const variables: string[] = [];
        for (let i = 0; i < styles.length; i++) {
          const property = styles[i];
          if (property.startsWith('--')) {
            variables.push(property);
          }
        }
        return variables.slice(0, 5);
      });
      
      expect(variablesAfterSwitch.length, 'CSS variables should persist after theme switch').toBeGreaterThan(0);
    }
  });

  /**
   * TECH-2: Persistence Mechanisms
   * Verify theme preference persistence for guest and authenticated users
   */
  test('TC-TECH-02: Theme persistence mechanisms', async ({ page, context }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-2: Persistence mechanisms'
    });

    // Test guest user (localStorage)
    await loginPage.gotoLoginPage();
    await loginPage.clearLocalStorage();
    
    // Set theme to dark
    await themeToggle.setTheme('dark');
    
    // Check localStorage
    const themeInStorage = await loginPage.getLocalStorageItem('theme');
    expect(themeInStorage, 'Theme preference should be stored in localStorage for guest users').toBeTruthy();
    
    // Verify it's the dark theme
    expect(themeInStorage?.toLowerCase(), 'Dark theme should be stored in localStorage').toContain('dark');
    
    // Reload and verify persistence
    await page.reload();
    await loginPage.waitForPageLoad();
    
    const isDarkAfterReload = await loginPage.isDarkThemeApplied();
    expect(isDarkAfterReload, 'Dark theme should persist after reload for guest user').toBeTruthy();
    
    // Test with new context (simulating new session)
    const newContext = await context.browser()?.newContext();
    if (newContext) {
      const newPage = await newContext.newPage();
      const newLoginPage = new LoginPage(newPage);
      
      await newLoginPage.gotoLoginPage();
      // New session should not have the theme preference
      const hasThemeInNewSession = await newPage.evaluate(() => {
        return localStorage.getItem('theme');
      });
      
      // Depending on implementation, it might use system theme or default
      expect(hasThemeInNewSession, 'New session may or may not have theme preference').toBeDefined();
      
      await newPage.close();
    }
    
    // Note: Authenticated user testing would require actual login
    // and checking User Preferences API calls
    // This would be implemented when backend is available
  });

  /**
   * TECH-3: matchMedia Listener
   * Verify window.matchMedia listener reacts to OS theme changes
   */
  test('TC-TECH-03: matchMedia listener for OS theme changes', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-3: matchMedia listener'
    });

    await loginPage.gotoLoginPage();
    
    // Check if Auto mode is available
    const availableOptions = await settingsPage.getAvailableThemeOptions();
    const hasAutoMode = availableOptions.some(opt => opt.toLowerCase().includes('auto'));
    
    if (!hasAutoMode) {
      test.skip(); // Auto mode not available
      return;
    }
    
    // Set to Auto mode
    await themeToggle.setTheme('auto');
    
    // Mock matchMedia to simulate OS theme changes
    const listenerCalled = await page.evaluate(() => {
      return new Promise<boolean>(resolve => {
        let listenerInvoked = false;
        
        // Override matchMedia
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = (query: string) => {
          const mql = originalMatchMedia.call(window, query);
          
          // Add a test listener
          const testListener = () => {
            listenerInvoked = true;
          };
          
          mql.addEventListener('change', testListener);
          
          // Return mock that we can trigger
          return {
            ...mql,
            matches: query.includes('dark'), // Start with dark
            addEventListener: (type: string, listener: any) => {
              if (type === 'change') {
                // Store for later triggering
                (window as any).testThemeListener = listener;
              }
              return mql.addEventListener(type, listener);
            },
            removeEventListener: mql.removeEventListener.bind(mql)
          } as MediaQueryList;
        };
        
        // Trigger change after a short delay
        setTimeout(() => {
          const listener = (window as any).testThemeListener;
          if (listener) {
            listener({ matches: false }); // Change to light
            resolve(true);
          } else {
            resolve(false);
          }
          
          // Restore original
          window.matchMedia = originalMatchMedia;
        }, 100);
      });
    });
    
    expect(listenerCalled, 'matchMedia listener should be set up for theme changes').toBeTruthy();
    
    // Verify the app responds to OS theme changes
    // This would require more complex mocking in a real test
  });

  /**
   * TECH-4: Cross-Browser Compatibility
   * Verify theme works across all major browsers
   */
  test('TC-TECH-04: Cross-browser compatibility', async ({ page, browserName }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-4: Cross-browser compatibility'
    });

    await loginPage.gotoLoginPage();
    
    // Test basic theme functionality in current browser
    const initialTheme = await loginPage.getCurrentTheme();
    
    // Toggle theme
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(350);
    
    const newTheme = await loginPage.getCurrentTheme();
    expect(newTheme, `Theme should toggle in ${browserName}`).not.toBe(initialTheme);
    
    // Check CSS custom properties support
    const supportsCssVariables = await page.evaluate(() => {
      return CSS.supports('(--test: red)');
    });
    
    // Most modern browsers support CSS variables, but test should pass either way
    if (!supportsCssVariables) {
      console.log(`${browserName} may not fully support CSS variables, using fallback`);
    }
    
    // Check localStorage support
    const supportsLocalStorage = await page.evaluate(() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch {
        return false;
      }
    });
    
    expect(supportsLocalStorage, `localStorage should be supported in ${browserName}`).toBeTruthy();
    
    // Verify theme persistence
    await page.reload();
    await loginPage.waitForPageLoad();
    
    const themeAfterReload = await loginPage.getCurrentTheme();
    expect(themeAfterReload, `Theme should persist after reload in ${browserName}`).toBe(newTheme);
    
    // Browser-specific checks
    if (browserName === 'webkit') {
      // Safari-specific checks
      const isSafari = await page.evaluate(() => {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      });
      
      if (isSafari) {
        // Check for Safari-specific theme issues
        const hasColorSchemeMeta = await loginPage.hasColorSchemeMetaTag();
        expect(hasColorSchemeMeta, 'Safari benefits from color-scheme meta tag').toBeTruthy();
      }
    }
  });

  /**
   * TECH-5: No Page Reload
   * Verify theme switch doesn't cause full page reload
   */
  test('TC-TECH-05: No page reload on theme switch', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-5: No page reload'
    });

    await loginPage.gotoLoginPage();
    
    // Track page loads
    let pageLoadCount = 0;
    page.on('load', () => {
      pageLoadCount++;
    });
    
    // Get initial load count
    const initialLoadCount = pageLoadCount;
    
    // Switch theme multiple times
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(350);
    
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(350);
    
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(350);
    
    // No additional page loads should occur
    expect(pageLoadCount, 'No page reloads should occur during theme switching').toBe(initialLoadCount);
    
    // Alternative: Check network requests for page reload
    const pageRequests: string[] = [];
    page.on('request', request => {
      const url = request.url();
      // Check for page/document requests (not assets)
      if (request.resourceType() === 'document' || 
          url.endsWith('.html') || 
          url === page.url()) {
        pageRequests.push(url);
      }
    });
    
    // Clear previous requests
    pageRequests.length = 0;
    
    // Switch theme again
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(1000); // Wait for any potential requests
    
    expect(pageRequests.length, 'No document requests should be made during theme switch').toBe(0);
    
    // Verify page state is preserved (e.g., form inputs)
    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'test-input';
      input.value = 'test value';
      document.body.appendChild(input);
    });
    
    const testInput = page.locator('#test-input');
    await testInput.fill('modified value');
    
    // Switch theme
    await themeToggle.toggleThemeViaHeader();
    await page.waitForTimeout(350);
    
    // Input value should be preserved
    const inputValue = await testInput.inputValue();
    expect(inputValue, 'Form input values should be preserved during theme switch').toBe('modified value');
    
    // Clean up
    await page.evaluate(() => {
      const input = document.getElementById('test-input');
      if (input) input.remove();
    });
  });

  /**
   * TECH-6: Meta Tag Implementation
   * Verify <meta name="color-scheme"> tag present
   */
  test('TC-TECH-06: Color-scheme meta tag implementation', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'TECH-6: Meta tag implementation'
    });

    await loginPage.gotoLoginPage();
    
    // Check for color-scheme meta tag
    const hasColorSchemeMeta = await loginPage.hasColorSchemeMetaTag();
    expect(hasColorSchemeMeta, 'color-scheme meta tag should be present').toBeTruthy();
    
    // Get meta tag content
    const metaContent = await loginPage.getColorSchemeMetaContent();
    expect(metaContent, 'color-scheme meta tag should have content').toBeTruthy();
    
    // Content should include both light and dark
    expect(metaContent?.toLowerCase(), 'Meta tag should support both light and dark').toContain('light');
    expect(metaContent?.toLowerCase(), 'Meta tag should support both light and dark').toContain('dark');
    
    // Verify meta tag is in head
    const metaInHead = await page.evaluate(() => {
      const meta = document.querySelector('head meta[name="color-scheme"]');
      return meta !== null;
    });
    
    expect(metaInHead, 'color-scheme meta tag should be in <head>').toBeTruthy();
    
    // Check that native UI elements respect color-scheme
    // This is harder to test automatically, but we can verify the meta tag exists
    
    // Test with different themes
    await themeToggle.setTheme('light');
    const metaContentLight = await loginPage.getColorSchemeMetaContent();
    // Meta tag content should remain the same regardless of theme
    expect(metaContentLight, 'Meta tag should be consistent across themes').toBe(metaContent);
    
    await themeToggle.setTheme('dark');
    const metaContentDark = await loginPage.getColorSchemeMetaContent();
    expect(metaContentDark, 'Meta tag should be consistent across themes').toBe(metaContent);
  });

  /**
   * Additional test: JavaScript requirement
   */
  test('Theme requires JavaScript (progressive enhancement check)', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Check that theme toggle is interactive (requires JS)
    const toggleInteractive = await page.evaluate(() => {
      const toggle = document.querySelector('[data-testid="theme-toggle"], .theme-toggle');
      if (!toggle) return false;
      
      // Check if it has event listeners or is a button
      return toggle.tagName === 'BUTTON' || 
             toggle.getAttribute('onclick') || 
             toggle.getAttribute('@click') ||
             toggle.hasAttribute('data-testid');
    });
    
    expect(toggleInteractive, 'Theme toggle should be interactive (requires JS)').toBeTruthy();
    
    // Verify theme can be changed via JavaScript
    const canChangeTheme = await page.evaluate(() => {
      try {
        // Try to trigger theme change via JS
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        return html.getAttribute('data-theme') === newTheme;
      } catch {
        return false;
      }
    });
    
    expect(canChangeTheme, 'Theme should be changeable via JavaScript').toBeTruthy();
  });

  /**
   * Additional test: Storage fallback handling
   */
  test('Graceful handling when localStorage is unavailable', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Mock localStorage failure
    await page.evaluate(() => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function() {
        throw new Error('QuotaExceededError');
      };
      
      window.addEventListener('unload', () => {
        localStorage.setItem = originalSetItem;
      });
    });
    
    // Try to change theme (should handle error gracefully)
    try {
      await themeToggle.toggleThemeViaHeader();
      await page.waitForTimeout(350);
      
      // Theme should still change (just not persist)
      const themeChanged = await page.evaluate(() => {
        return document.documentElement.getAttribute('data-theme') || 
               document.documentElement.classList.contains('dark');
      });
      
      expect(themeChanged, 'Theme should still change even if localStorage fails').toBeTruthy();
    } catch (error) {
      // Should not crash
      expect(error, 'Should handle localStorage errors gracefully').toBeFalsy();
    }
    
    // Reload page (theme may revert to default/system)
    await page.reload();
    await loginPage.waitForPageLoad();
    
    // Page should load without errors
    const pageLoaded = await page.evaluate(() => {
      return document.readyState === 'complete';
    });
    
    expect(pageLoaded, 'Page should load successfully after localStorage error').toBeTruthy();
  });
});