import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ThemeToggle } from '../components/ThemeToggle';

/**
 * Settings Page Page Object Model
 */
export class SettingsPage extends BasePage {
  // Locators
  readonly settingsHeader: Locator;
  readonly appearanceTab: Locator;
  readonly themeSection: Locator;
  readonly themeOptions: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly resetButton: Locator;
  readonly previewArea: Locator;
  
  // Components
  readonly themeToggle: ThemeToggle;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.settingsHeader = page.getByRole('heading', { name: /settings/i })
      .or(page.locator('h1').filter({ hasText: /settings/i }));

    this.appearanceTab = page.getByRole('tab', { name: /appearance/i })
      .or(page.getByRole('link', { name: /appearance/i }))
      .or(page.locator('a[href*="appearance"]'));

    this.themeSection = page.getByRole('heading', { name: /theme/i })
      .or(page.locator('section').filter({ hasText: /theme/i }))
      .or(page.locator('[data-testid="theme-section"]'));

    this.themeOptions = page.locator('.theme-option, [data-theme-option]')
      .or(page.locator('input[name="theme"]'));

    this.saveButton = page.getByRole('button', { name: /save/i })
      .or(page.locator('button[type="submit"]'));

    this.cancelButton = page.getByRole('button', { name: /cancel/i });

    this.resetButton = page.getByRole('button', { name: /reset/i })
      .or(page.locator('button').filter({ hasText: /reset/i }));

    this.previewArea = page.locator('.preview, [data-testid="preview"]')
      .or(page.locator('.theme-preview'));

    // Initialize components
    this.themeToggle = new ThemeToggle(page);
  }

  /**
   * Navigate to settings page
   */
  async gotoSettings(): Promise<void> {
    await this.goto('/settings');
    await this.waitForPageLoad();
    await this.page.waitForSelector('body', { timeout: 10000 });
  }

  /**
   * Navigate to appearance tab
   */
  async gotoAppearanceTab(): Promise<void> {
    if (await this.isElementPresent(this.appearanceTab)) {
      await this.appearanceTab.click();
      await this.page.waitForLoadState('networkidle');
    }
    // Wait for theme section to be visible
    await this.page.waitForTimeout(1000);
  }

  /**
   * Check if settings page is loaded
   */
  async isSettingsPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.settingsHeader);
  }

  /**
   * Check if appearance tab is available
   */
  async isAppearanceTabAvailable(): Promise<boolean> {
    return await this.isElementPresent(this.appearanceTab);
  }

  /**
   * Get available theme options
   */
  async getAvailableThemeOptions(): Promise<string[]> {
    await this.gotoAppearanceTab();
    
    const options = await this.page.evaluate(() => {
      const themeOptions: string[] = [];
      
      // Check radio buttons
      const radios = document.querySelectorAll('input[name="theme"][type="radio"]');
      radios.forEach(radio => {
        const value = radio.getAttribute('value');
        const label = radio.nextElementSibling?.textContent;
        if (value) themeOptions.push(value);
        else if (label) themeOptions.push(label.toLowerCase());
      });

      // Check select dropdown
      const select = document.querySelector('select[name="theme"]');
      if (select) {
        const selectOptions = Array.from(select.querySelectorAll('option'))
          .map(opt => opt.value || opt.textContent?.toLowerCase() || '')
          .filter(opt => opt);
        themeOptions.push(...selectOptions);
      }

      // Check toggle labels
      const toggleLabels = document.querySelectorAll('label');
      toggleLabels.forEach(label => {
        if (label.textContent?.match(/light|dark|auto/i)) {
          themeOptions.push(label.textContent.toLowerCase());
        }
      });

      return [...new Set(themeOptions)]; // Remove duplicates
    });

    return options;
  }

  /**
   * Select theme option
   */
  async selectThemeOption(option: 'light' | 'dark' | 'auto'): Promise<void> {
    await this.gotoAppearanceTab();

    // Try different selection methods
    const optionLower = option.toLowerCase();
    
    // Method 1: Radio buttons
    const radio = this.page.locator(`input[name="theme"][value="${optionLower}"]`);
    if (await this.isElementPresent(radio)) {
      await radio.check();
      return;
    }

    // Method 2: Select dropdown
    const select = this.page.locator('select[name="theme"]');
    if (await this.isElementPresent(select)) {
      await select.selectOption(optionLower);
      return;
    }

    // Method 3: Click on option card/label
    const optionElement = this.page.locator(`[data-theme-option="${optionLower}"], .theme-option`)
      .filter({ hasText: new RegExp(option, 'i') });
    
    if (await this.isElementPresent(optionElement)) {
      await optionElement.click();
      return;
    }

    // Method 4: Use toggle component
    await this.themeToggle.setTheme(option);
  }

  /**
   * Save settings
   */
  async saveSettings(): Promise<void> {
    if (await this.isElementPresent(this.saveButton)) {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
      
      // Check for success message
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Reset to default settings
   */
  async resetToDefault(): Promise<void> {
    if (await this.isElementPresent(this.resetButton)) {
      await this.resetButton.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Check if theme preference is saved
   */
  async isThemePreferenceSaved(): Promise<boolean> {
    // Check localStorage
    const themeInStorage = await this.getLocalStorageItem('theme');
    if (themeInStorage) {
      return true;
    }

    // Check if save was successful (look for success message)
    const successMessage = await this.page.evaluate(() => {
      const messages = document.querySelectorAll('.success, .alert-success, [role="status"]');
      for (const msg of messages) {
        if (msg.textContent?.toLowerCase().includes('saved') || 
            msg.textContent?.toLowerCase().includes('success')) {
          return true;
        }
      }
      return false;
    });

    return successMessage;
  }

  /**
   * Get current selected theme from settings UI
   */
  async getSelectedThemeFromSettings(): Promise<string> {
    await this.gotoAppearanceTab();

    // Check radio buttons
    const selectedRadio = await this.page.evaluate(() => {
      const radio = document.querySelector('input[name="theme"][type="radio"]:checked');
      return radio?.getAttribute('value') || '';
    });

    if (selectedRadio) return selectedRadio;

    // Check select dropdown
    const selectedOption = await this.page.evaluate(() => {
      const select = document.querySelector('select[name="theme"]');
      return (select as HTMLSelectElement)?.value || '';
    });

    if (selectedOption) return selectedOption;

    // Check active toggle/option
    const activeOption = await this.page.evaluate(() => {
      const active = document.querySelector('.theme-option.active, [data-theme-option].active');
      return active?.getAttribute('data-theme-option') || active?.textContent?.toLowerCase() || '';
    });

    return activeOption || 'unknown';
  }

  /**
   * Verify theme preview updates
   */
  async verifyThemePreviewUpdates(): Promise<boolean> {
    if (!(await this.isElementPresent(this.previewArea))) {
      return false; // No preview area
    }

    // Get initial preview state
    const initialBgColor = await this.page.evaluate(() => {
      const preview = document.querySelector('.preview, [data-testid="preview"]');
      return preview ? getComputedStyle(preview).backgroundColor : '';
    });

    // Change theme
    const currentTheme = await this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    await this.selectThemeOption(newTheme as 'light' | 'dark');

    // Get new preview state
    const newBgColor = await this.page.evaluate(() => {
      const preview = document.querySelector('.preview, [data-testid="preview"]');
      return preview ? getComputedStyle(preview).backgroundColor : '';
    });

    // Colors should be different
    return initialBgColor !== newBgColor && initialBgColor !== '' && newBgColor !== '';
  }

  /**
   * Capture settings page screenshot
   */
  async captureSettingsScreenshot(theme: 'light' | 'dark'): Promise<void> {
    await this.gotoAppearanceTab();
    await this.takeScreenshot(`settings-appearance-${theme}`);
  }

  /**
   * Test theme persistence in settings
   */
  async testThemePersistence(): Promise<boolean> {
    const initialTheme = await this.getCurrentTheme();
    
    // Change theme
    const newTheme = initialTheme === 'light' ? 'dark' : 'light';
    await this.selectThemeOption(newTheme as 'light' | 'dark');
    await this.saveSettings();
    
    // Reload page
    await this.page.reload();
    await this.waitForPageLoad();
    await this.gotoAppearanceTab();
    
    // Check if theme persisted
    const persistedTheme = await this.getSelectedThemeFromSettings();
    const currentTheme = await this.getCurrentTheme();
    
    return persistedTheme.includes(newTheme) || currentTheme === newTheme;
  }
}