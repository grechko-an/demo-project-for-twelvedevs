import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

/**
 * Theme Toggle Component Page Object Model
 * Represents the theme toggle switch/button in header/sidebar and settings
 */
export class ThemeToggle extends BasePage {
  // Common selectors for theme toggle elements
  readonly headerToggle: Locator;
  readonly settingsToggle: Locator;
  readonly toggleSwitch: Locator;
  readonly lightIcon: Locator;
  readonly darkIcon: Locator;
  readonly autoOption: Locator;
  readonly themeDropdown: Locator;
  readonly settingsMenu: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with common patterns
    // These selectors should be updated based on actual application implementation
    this.headerToggle = page.getByRole('button', { name: /theme|mode|toggle/i })
      .or(page.locator('[data-testid="theme-toggle"]'))
      .or(page.locator('.theme-toggle'))
      .or(page.locator('button:has(svg)').filter({ hasText: /🌙|☀️|🌞/ }))
      .first();

    this.settingsToggle = page.getByRole('button', { name: /appearance|theme/i })
      .or(page.locator('[data-testid="settings-theme-toggle"]'))
      .or(page.locator('a[href*="settings"], a[href*="appearance"]'))
      .first();

    this.toggleSwitch = page.locator('input[type="checkbox"][role="switch"]')
      .or(page.locator('.switch input'))
      .or(page.locator('[data-testid="theme-switch"]'));

    this.lightIcon = page.locator('.light-icon, [data-theme="light"]')
      .or(page.getByText('Light', { exact: true }))
      .or(page.locator('svg.light-mode'));

    this.darkIcon = page.locator('.dark-icon, [data-theme="dark"]')
      .or(page.getByText('Dark', { exact: true }))
      .or(page.locator('svg.dark-mode'));

    this.autoOption = page.getByText('Auto', { exact: true })
      .or(page.locator('[data-theme="auto"]'))
      .or(page.locator('option[value="auto"]'));

    this.themeDropdown = page.locator('select[name="theme"]')
      .or(page.locator('[data-testid="theme-select"]'))
      .or(page.locator('.theme-select'));

    this.settingsMenu = page.getByRole('link', { name: /settings/i })
      .or(page.locator('[data-testid="settings-menu"]'))
      .or(page.locator('a[href*="settings"]'));
  }

  /**
   * Navigate to settings appearance page
   */
  async navigateToSettings(): Promise<void> {
    await this.settingsMenu.click();
    await this.page.waitForLoadState('networkidle');
    // Wait for settings page to load
    await this.page.waitForSelector('h1:has-text("Settings"), h1:has-text("Appearance")', { timeout: 5000 });
  }

  /**
   * Toggle theme using header toggle
   */
  async toggleThemeViaHeader(): Promise<void> {
    await this.headerToggle.click();
    // Wait for theme transition
    await this.page.waitForTimeout(350); // Slightly more than max transition time
  }

  /**
   * Toggle theme using settings toggle
   */
  async toggleThemeViaSettings(): Promise<void> {
    await this.navigateToSettings();
    await this.toggleSwitch.click();
    await this.page.waitForTimeout(350);
  }

  /**
   * Set theme to specific mode
   */
  async setTheme(mode: 'light' | 'dark' | 'auto'): Promise<void> {
    const currentTheme = await this.getCurrentTheme();
    
    if (currentTheme === mode) {
      return; // Already in desired theme
    }

    // Check which toggle mechanism is available
    if (await this.isElementPresent(this.themeDropdown)) {
      // Use dropdown selector
      await this.themeDropdown.selectOption(mode);
    } else if (await this.isElementPresent(this.toggleSwitch)) {
      // Use toggle switch (binary light/dark)
      if (mode === 'auto') {
        throw new Error('Auto mode not supported with toggle switch');
      }
      
      const isDark = await this.isDarkThemeApplied();
      if ((mode === 'dark' && !isDark) || (mode === 'light' && isDark)) {
        await this.toggleSwitch.click();
      }
    } else {
      // Use header toggle (binary light/dark)
      if (mode === 'auto') {
        throw new Error('Auto mode not supported with header toggle');
      }
      
      const isDark = await this.isDarkThemeApplied();
      if ((mode === 'dark' && !isDark) || (mode === 'light' && isDark)) {
        await this.toggleThemeViaHeader();
      }
    }
    
    await this.page.waitForTimeout(350);
  }

  /**
   * Get current theme from UI indicator
   */
  async getCurrentThemeFromUI(): Promise<'light' | 'dark' | 'auto' | 'unknown'> {
    // Check dropdown if present
    if (await this.isElementPresent(this.themeDropdown)) {
      const selectedValue = await this.themeDropdown.inputValue();
      if (selectedValue === 'light' || selectedValue === 'dark' || selectedValue === 'auto') {
        return selectedValue;
      }
    }

    // Check toggle switch state
    if (await this.isElementPresent(this.toggleSwitch)) {
      const isChecked = await this.toggleSwitch.isChecked();
      return isChecked ? 'dark' : 'light';
    }

    // Check icon visibility
    if (await this.isElementVisible(this.lightIcon)) {
      return 'light';
    }
    if (await this.isElementVisible(this.darkIcon)) {
      return 'dark';
    }

    return 'unknown';
  }

  /**
   * Verify toggle is present in header
   */
  async verifyHeaderTogglePresent(): Promise<boolean> {
    return await this.isElementVisible(this.headerToggle);
  }

  /**
   * Verify toggle is present in settings
   */
  async verifySettingsTogglePresent(): Promise<boolean> {
    await this.navigateToSettings();
    return await this.isElementVisible(this.toggleSwitch) || 
           await this.isElementVisible(this.themeDropdown);
  }

  /**
   * Rapidly toggle theme multiple times (for edge case testing)
   */
  async rapidToggle(count: number = 10): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.headerToggle.click();
      await this.page.waitForTimeout(50); // Small delay between clicks
    }
    // Wait for final transition
    await this.page.waitForTimeout(350);
  }

  /**
   * Get toggle accessibility attributes
   */
  async getToggleAccessibilityInfo(): Promise<{
    role: string | null;
    ariaLabel: string | null;
    ariaChecked: string | null;
    tabIndex: string | null;
  }> {
    return await this.page.evaluate(() => {
      const toggle = document.querySelector('[data-testid="theme-toggle"], .theme-toggle, input[type="checkbox"][role="switch"]');
      if (!toggle) return { role: null, ariaLabel: null, ariaChecked: null, tabIndex: null };
      
      return {
        role: toggle.getAttribute('role'),
        ariaLabel: toggle.getAttribute('aria-label'),
        ariaChecked: toggle.getAttribute('aria-checked'),
        tabIndex: toggle.getAttribute('tabindex')
      };
    });
  }

  /**
   * Check if toggle is keyboard accessible
   */
  async isKeyboardAccessible(): Promise<boolean> {
    const info = await this.getToggleAccessibilityInfo();
    const hasTabIndex = info.tabIndex !== '-1';
    const hasRole = info.role === 'button' || info.role === 'switch' || info.role === 'checkbox';
    
    return hasTabIndex && hasRole;
  }

  /**
   * Get transition duration for theme change
   */
  async getThemeTransitionDuration(): Promise<number> {
    // Measure transition on body element
    return await this.measureTransitionDuration('body');
  }
}