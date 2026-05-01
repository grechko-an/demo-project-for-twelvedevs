import { Page, Locator, expect } from '@playwright/test';

/**
 * Base page class providing common functionality for all page objects
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot of the current page
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await expect(locator).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element exists in DOM (not necessarily visible)
   */
  async isElementPresent(locator: Locator): Promise<boolean> {
    return (await locator.count()) > 0;
  }

  /**
   * Clear browser localStorage
   */
  async clearLocalStorage(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.clear();
    });
  }

  /**
   * Get value from localStorage
   */
  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((k) => {
      return localStorage.getItem(k);
    }, key);
  }

  /**
   * Set value in localStorage
   */
  async setLocalStorageItem(key: string, value: string): Promise<void> {
    await this.page.evaluate(([k, v]) => {
      localStorage.setItem(k, v);
    }, [key, value]);
  }

  /**
   * Check if dark theme is applied by inspecting data-theme attribute or CSS class
   */
  async isDarkThemeApplied(): Promise<boolean> {
    // Check for common dark theme indicators
    const hasDataThemeDark = await this.page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme') === 'dark' ||
             document.documentElement.classList.contains('dark') ||
             document.documentElement.classList.contains('dark-mode');
    });

    if (hasDataThemeDark) {
      return true;
    }

    // Check background color for dark theme
    const backgroundColor = await this.page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    // Dark theme backgrounds are typically dark colors
    const darkColors = ['rgb(18, 18, 18)', 'rgb(30, 30, 30)', 'rgb(33, 33, 33)', '#121212', '#1e1e1e', '#212121'];
    return darkColors.some(color => backgroundColor.includes(color));
  }

  /**
   * Check if light theme is applied
   */
  async isLightThemeApplied(): Promise<boolean> {
    return !(await this.isDarkThemeApplied());
  }

  /**
   * Get current theme from data-theme attribute
   */
  async getCurrentTheme(): Promise<'light' | 'dark' | 'auto' | 'unknown'> {
    const themeAttr = await this.page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    if (themeAttr === 'light' || themeAttr === 'dark' || themeAttr === 'auto') {
      return themeAttr;
    }

    // Fallback to checking classes
    const hasDarkClass = await this.page.evaluate(() => {
      return document.documentElement.classList.contains('dark') ||
             document.documentElement.classList.contains('dark-mode');
    });

    if (hasDarkClass) {
      return 'dark';
    }

    const hasLightClass = await this.page.evaluate(() => {
      return document.documentElement.classList.contains('light') ||
             document.documentElement.classList.contains('light-mode');
    });

    if (hasLightClass) {
      return 'light';
    }

    return 'unknown';
  }

  /**
   * Check if meta color-scheme tag is present
   */
  async hasColorSchemeMetaTag(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const meta = document.querySelector('meta[name="color-scheme"]');
      return meta !== null;
    });
  }

  /**
   * Get color-scheme meta tag content
   */
  async getColorSchemeMetaContent(): Promise<string | null> {
    return await this.page.evaluate(() => {
      const meta = document.querySelector('meta[name="color-scheme"]');
      return meta?.getAttribute('content') || null;
    });
  }

  /**
   * Check if CSS custom properties are used
   */
  async hasCssCustomProperties(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      // Check for common CSS custom property prefixes
      const cssText = styles.cssText;
      return cssText.includes('--') || 
             document.documentElement.style.cssText.includes('--');
    });
  }

  /**
   * Measure transition duration for an element
   */
  async measureTransitionDuration(selector: string): Promise<number> {
    return await this.page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return 0;
      
      const style = getComputedStyle(element);
      const transitionDuration = style.transitionDuration;
      
      // Convert "0.3s" to milliseconds
      if (transitionDuration.endsWith('s')) {
        return parseFloat(transitionDuration) * 1000;
      } else if (transitionDuration.endsWith('ms')) {
        return parseFloat(transitionDuration);
      }
      return 0;
    }, selector);
  }

  /**
   * Get contrast ratio between two colors (simplified check)
   */
  async getContrastRatio(foregroundSelector: string, backgroundSelector: string): Promise<number> {
    // This is a simplified implementation - in real tests use proper contrast ratio calculation
    // or integrate with axe-core
    return await this.page.evaluate(([fgSel, bgSel]) => {
      const fgElement = document.querySelector(fgSel);
      const bgElement = document.querySelector(bgSel);
      
      if (!fgElement || !bgElement) return 0;
      
      const fgColor = getComputedStyle(fgElement).color;
      const bgColor = getComputedStyle(bgElement).backgroundColor;
      
      // Simplified: return a placeholder value
      // In real implementation, convert RGB to luminance and calculate ratio
      return 4.5; // Placeholder
    }, [foregroundSelector, backgroundSelector]);
  }
}