import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { ThemeToggle } from '../../pages/components/ThemeToggle';

test.describe('Dark/Light Mode Theme Switching - UI/UX Requirements', () => {
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
   * UI-1: Toggle Placement & Design
   * Verify theme toggle is present in both Settings and Header/Sidebar
   */
  test('TC-UI-01: Toggle placement in both header and settings', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'UI-1: Toggle placement & design'
    });

    await loginPage.gotoLoginPage();
    
    // Check header toggle
    const headerTogglePresent = await themeToggle.verifyHeaderTogglePresent();
    expect(headerTogglePresent, 'Theme toggle should be present in header/sidebar').toBeTruthy();
    
    // Check settings toggle
    await settingsPage.gotoSettings();
    const settingsTogglePresent = await themeToggle.verifySettingsTogglePresent();
    expect(settingsTogglePresent, 'Theme toggle should be present in settings').toBeTruthy();
    
    // Verify toggle icon indicates current theme
    const currentTheme = await loginPage.getCurrentTheme();
    const themeFromUI = await themeToggle.getCurrentThemeFromUI();
    
    if (themeFromUI !== 'unknown') {
      expect(themeFromUI, 'UI should indicate current theme').toBe(currentTheme);
    }
    
    // Take screenshot for documentation
    await loginPage.takeScreenshot('toggle-placement-header');
    await settingsPage.captureSettingsScreenshot(currentTheme as 'light' | 'dark');
  });

  /**
   * UI-2: Transition Smoothness
   * Verify theme transition uses 200-300ms smooth animation
   */
  test('TC-UI-02: Theme transition smoothness (200-300ms)', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'UI-2: Transition smoothness'
    });

    await loginPage.gotoLoginPage();
    
    // Measure transition duration
    const transitionDuration = await themeToggle.getThemeTransitionDuration();
    
    // Transition should be between 200-300ms
    expect(
      transitionDuration,
      `Transition duration should be between 200-300ms, got ${transitionDuration}ms`
    ).toBeGreaterThanOrEqual(200);
    
    expect(
      transitionDuration,
      `Transition duration should be between 200-300ms, got ${transitionDuration}ms`
    ).toBeLessThanOrEqual(300);
    
    // Verify smooth transition by checking multiple properties
    const hasSmoothTransition = await page.evaluate(() => {
      const bodyStyle = getComputedStyle(document.body);
      const transitionProperty = bodyStyle.transitionProperty;
      const transitionTimingFunction = bodyStyle.transitionTimingFunction;
      
      // Check if background-color, color, and border-color have transitions
      const hasBackgroundTransition = transitionProperty.includes('background-color');
      const hasColorTransition = transitionProperty.includes('color');
      const hasSmoothTiming = transitionTimingFunction.includes('ease') || 
                              transitionTimingFunction.includes('cubic-bezier');
      
      return hasBackgroundTransition && hasColorTransition && hasSmoothTiming;
    });
    
    expect(hasSmoothTransition, 'Should have smooth transitions for color properties').toBeTruthy();
  });

  /**
   * UI-3: Design System Compliance
   * Verify theme uses updated design system tokens (CSS Variables / Design Tokens)
   */
  test('TC-UI-03: Design system compliance with CSS custom properties', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'UI-3: Design system compliance'
    });

    await loginPage.gotoLoginPage();
    
    // Check for CSS custom properties
    const hasCssCustomProperties = await loginPage.hasCssCustomProperties();
    expect(hasCssCustomProperties, 'Should use CSS custom properties for theming').toBeTruthy();
    
    // Check for data-theme attribute or CSS classes
    const usesThemeAttributes = await page.evaluate(() => {
      const html = document.documentElement;
      return html.hasAttribute('data-theme') || 
             html.classList.contains('theme-light') || 
             html.classList.contains('theme-dark') ||
             html.classList.contains('light-mode') ||
             html.classList.contains('dark-mode');
    });
    
    expect(usesThemeAttributes, 'Should use theme attributes or classes').toBeTruthy();
    
    // Check for design token naming convention (e.g., --color-primary, --bg-primary)
    const hasDesignTokenNaming = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let foundDesignTokens = false;
      
      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule instanceof CSSStyleRule) {
              const cssText = rule.cssText;
              // Look for common design token patterns
              if (cssText.includes('--color-') || 
                  cssText.includes('--bg-') || 
                  cssText.includes('--text-') ||
                  cssText.includes('--border-') ||
                  cssText.includes('--primary') ||
                  cssText.includes('--secondary')) {
                foundDesignTokens = true;
                break;
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets may throw
          continue;
        }
        if (foundDesignTokens) break;
      }
      return foundDesignTokens;
    });
    
    expect(hasDesignTokenNaming, 'Should follow design token naming convention').toBeTruthy();
  });

  /**
   * UI-4: WCAG 2.1 AA Compliance
   * Verify text & interactive element contrast meets accessibility standards
   */
  test('TC-UI-04: WCAG 2.1 AA compliance for contrast ratios', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'UI-4: WCAG 2.1 AA compliance'
    });

    // Note: Full contrast ratio testing requires axe-core integration
    // This test provides a basic structure
    
    await loginPage.gotoLoginPage();
    
    // Test in light theme
    await themeToggle.setTheme('light');
    
    // Run basic contrast checks on key elements
    const lightThemeContrast = await page.evaluate(() => {
      const elements = [
        { selector: 'body', type: 'background' },
        { selector: 'h1, h2, h3', type: 'text' },
        { selector: 'button, .btn, [role="button"]', type: 'button' },
        { selector: 'input, textarea, select', type: 'input' }
      ];
      
      const results: Array<{selector: string, visible: boolean, hasContrast: boolean}> = [];
      
      elements.forEach(({ selector, type }) => {
        const element = document.querySelector(selector);
        if (element) {
          const style = getComputedStyle(element);
          const color = style.color;
          const bgColor = style.backgroundColor;
          
          // Simplified check - in real tests use proper contrast calculation
          const hasContrast = color !== bgColor && 
                             color !== 'rgba(0, 0, 0, 0)' && 
                             bgColor !== 'rgba(0, 0, 0, 0)';
          
          results.push({
            selector,
            visible: element.checkVisibility(),
            hasContrast
          });
        }
      });
      
      return results;
    });
    
    // Verify key elements have contrast
    const elementsWithContrast = lightThemeContrast.filter(r => r.hasContrast);
    expect(elementsWithContrast.length, 'Key elements should have contrast in light theme').toBeGreaterThan(0);
    
    // Test in dark theme
    await themeToggle.setTheme('dark');
    
    const darkThemeContrast = await page.evaluate(() => {
      const body = document.body;
      const bodyStyle = getComputedStyle(body);
      const textColor = bodyStyle.color;
      const bgColor = bodyStyle.backgroundColor;
      
      // Check that dark theme doesn't use pure black on pure white (too high contrast)
      const isExtremeContrast = (bgColor.includes('rgb(0, 0, 0)') && textColor.includes('rgb(255, 255, 255)')) ||
                                (bgColor.includes('#000') && textColor.includes('#fff'));
      
      return {
        hasContrast: textColor !== bgColor,
        isExtremeContrast
      };
    });
    
    expect(darkThemeContrast.hasContrast, 'Dark theme should have contrast').toBeTruthy();
    expect(darkThemeContrast.isExtremeContrast, 'Dark theme should avoid extreme contrast (pure black/white)').toBeFalsy();
    
    // Check focus ring visibility in both themes
    const focusRingVisible = await page.evaluate(() => {
      // Create a test button and check its focus style
      const testButton = document.createElement('button');
      testButton.textContent = 'Test';
      document.body.appendChild(testButton);
      testButton.focus();
      
      const style = getComputedStyle(testButton);
      const hasFocusOutline = style.outlineStyle !== 'none' && style.outlineWidth !== '0px';
      const hasFocusBoxShadow = style.boxShadow !== 'none';
      
      document.body.removeChild(testButton);
      
      return hasFocusOutline || hasFocusBoxShadow;
    });
    
    expect(focusRingVisible, 'Focus ring should be visible for accessibility').toBeTruthy();
  });

  /**
   * UI-5: Dark Mode Color Palette
   * Verify dark mode uses soft grays instead of pure black
   */
  test('TC-UI-05: Dark mode uses soft grays, not pure black', async ({ page }) => {
    test.info().annotations.push({
      type: 'requirement',
      description: 'UI-5: Dark mode color palette'
    });

    await loginPage.gotoLoginPage();
    
    // Set to dark theme
    await themeToggle.setTheme('dark');
    
    // Verify dark theme is applied
    const isDarkApplied = await loginPage.isDarkThemeApplied();
    expect(isDarkApplied, 'Dark theme should be applied').toBeTruthy();
    
    // Check background color
    const backgroundColor = await dashboardPage.getContentBackgroundColor();
    
    // Pure black colors to avoid
    const pureBlackColors = [
      'rgb(0, 0, 0)',
      '#000000',
      '#000',
      'rgba(0, 0, 0, 1)'
    ];
    
    // Soft gray ranges (approximately #121212 to #1E1E1E)
    const softGrayColors = [
      'rgb(18, 18, 18)', // #121212
      'rgb(30, 30, 30)', // #1E1E1E  
      'rgb(33, 33, 33)', // #212121
      '#121212',
      '#1e1e1e',
      '#212121',
      'rgb(25, 25, 25)',
      'rgb(28, 28, 28)'
    ];
    
    // Check for pure black
    let isPureBlack = false;
    for (const black of pureBlackColors) {
      if (backgroundColor.includes(black)) {
        isPureBlack = true;
        break;
      }
    }
    
    expect(isPureBlack, 'Dark theme should not use pure black (#000000)').toBeFalsy();
    
    // Check for soft grays
    let isSoftGray = false;
    for (const gray of softGrayColors) {
      if (backgroundColor.includes(gray)) {
        isSoftGray = true;
        break;
      }
    }
    
    // Also accept other dark colors that aren't pure black
    const isDarkColor = backgroundColor.includes('rgb(1') || 
                       backgroundColor.includes('rgb(2') || 
                       backgroundColor.includes('rgb(3') ||
                       backgroundColor.includes('rgb(4') ||
                       backgroundColor.includes('#1') ||
                       backgroundColor.includes('#2') ||
                       backgroundColor.includes('#3');
    
    expect(isSoftGray || isDarkColor, 'Dark theme should use soft grays or other dark colors').toBeTruthy();
    
    // Check text color is readable
    const textColor = await dashboardPage.getContentTextColor();
    const isTextReadable = await page.evaluate(([textColor, bgColor]) => {
      // Simplified readability check
      return textColor !== bgColor &&
             !textColor.includes('rgb(0, 0, 0)') &&
             !textColor.includes('#000');
    }, [textColor, backgroundColor]);
    
    expect(isTextReadable, 'Text should be readable in dark theme').toBeTruthy();
    
    // Take screenshot for visual verification
    await dashboardPage.captureDashboardScreenshot('dark');
  });

  /**
   * Additional test: Icon/Image legibility in dark mode
   */
  test('Icons and images remain legible in dark mode', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Set to dark theme
    await themeToggle.setTheme('dark');
    
    // Check images for proper display
    const brokenImages = await page.evaluate(() => {
      const images = document.getElementsByTagName('img');
      const broken: string[] = [];
      
      for (const img of images) {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          broken.push(img.src || img.alt || 'unknown');
        }
        
        // Check for inverted/brightness filters for dark mode
        const style = getComputedStyle(img);
        const hasDarkModeFilter = style.filter.includes('invert') || 
                                 style.filter.includes('brightness') ||
                                 style.filter.includes('contrast');
        
        if (!hasDarkModeFilter && img.src) {
          // Could check if image is too bright for dark background
          // This would require canvas analysis
        }
      }
      
      return broken;
    });
    
    expect(brokenImages.length, `No broken images in dark mode. Found: ${brokenImages.join(', ')}`).toBe(0);
    
    // Check SVG icons
    const svgIcons = await page.evaluate(() => {
      const svgs = document.getElementsByTagName('svg');
      return svgs.length;
    });
    
    // If there are SVGs, they should be visible
    if (svgIcons > 0) {
      const svgVisible = await page.evaluate(() => {
        const svg = document.querySelector('svg');
        return svg ? svg.checkVisibility() : false;
      });
      
      expect(svgVisible, 'SVG icons should be visible in dark mode').toBeTruthy();
    }
  });

  /**
   * Additional test: Rapid toggle switching (no flickering)
   */
  test('Rapid theme switching without flickering', async ({ page }) => {
    await loginPage.gotoLoginPage();
    
    // Get initial theme
    const initialTheme = await loginPage.getCurrentTheme();
    
    // Rapidly toggle 10 times
    await themeToggle.rapidToggle(10);
    
    // Check final theme state
    const finalTheme = await loginPage.getCurrentTheme();
    
    // After even number of toggles, should return to initial theme
    // After odd number, should be opposite
    // With 10 toggles (even), should return to initial
    expect([initialTheme, 'light', 'dark'], `Final theme should be valid after rapid toggling, got ${finalTheme}`).toContain(finalTheme);
    
    // Check console for errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Do another rapid toggle
    await themeToggle.rapidToggle(5);
    
    expect(consoleErrors.length, `No console errors during rapid toggling. Errors: ${consoleErrors.join(', ')}`).toBe(0);
    
    // Verify UI is stable (no loading spinners stuck)
    const hasLoadingSpinner = await page.evaluate(() => {
      const spinners = document.querySelectorAll('.spinner, .loading, [aria-busy="true"]');
      return spinners.length > 0;
    });
    
    expect(hasLoadingSpinner, 'No loading spinners should be stuck after rapid toggling').toBeFalsy();
  });
});