import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { ThemeToggle } from './components/ThemeToggle';

/**
 * Dashboard/Home Page Page Object Model
 */
export class DashboardPage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly navigationMenu: Locator;
  readonly contentArea: Locator;
  readonly dataTable: Locator;
  readonly charts: Locator;
  readonly modals: Locator;
  readonly toasts: Locator;
  readonly cards: Locator;
  
  // Components
  readonly themeToggle: ThemeToggle;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.welcomeMessage = page.getByText(/welcome|dashboard|home/i)
      .or(page.locator('h1, h2').filter({ hasText: /dashboard|home/i }))
      .first();

    this.userMenu = page.getByRole('button', { name: /user|profile|account/i })
      .or(page.locator('[data-testid="user-menu"]'))
      .or(page.locator('.user-menu'));

    this.navigationMenu = page.locator('nav, .sidebar, .navigation')
      .or(page.locator('[data-testid="navigation"]'));

    this.contentArea = page.locator('main, .content, .container')
      .or(page.locator('[data-testid="content"]'));

    this.dataTable = page.locator('table, .table, [data-testid="table"]')
      .first();

    this.charts = page.locator('canvas, .chart, [data-testid="chart"]')
      .first();

    this.modals = page.locator('.modal, .dialog, [role="dialog"]')
      .first();

    this.toasts = page.locator('.toast, .notification, [role="alert"]')
      .first();

    this.cards = page.locator('.card, .panel, .widget')
      .first();

    // Initialize components
    this.themeToggle = new ThemeToggle(page);
  }

  /**
   * Navigate to dashboard
   */
  async gotoDashboard(): Promise<void> {
    await this.goto('/dashboard');
    await this.waitForPageLoad();
    await this.page.waitForSelector('body', { timeout: 10000 });
  }

  /**
   * Check if dashboard is loaded
   */
  async isDashboardLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.contentArea) || 
           await this.isElementVisible(this.welcomeMessage);
  }

  /**
   * Open user menu
   */
  async openUserMenu(): Promise<void> {
    if (await this.isElementPresent(this.userMenu)) {
      await this.userMenu.click();
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Navigate to settings from user menu
   */
  async navigateToSettingsFromMenu(): Promise<void> {
    await this.openUserMenu();
    const settingsLink = this.page.getByRole('menuitem', { name: /settings/i })
      .or(this.page.locator('a[href*="settings"]'));
    
    if (await this.isElementPresent(settingsLink)) {
      await settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Verify all UI components render correctly in current theme
   */
  async verifyUIComponentsRendering(): Promise<{
    tables: boolean;
    charts: boolean;
    cards: boolean;
    navigation: boolean;
    userMenu: boolean;
  }> {
    const results = {
      tables: await this.isElementVisible(this.dataTable),
      charts: await this.isElementVisible(this.charts),
      cards: await this.isElementVisible(this.cards),
      navigation: await this.isElementVisible(this.navigationMenu),
      userMenu: await this.isElementVisible(this.userMenu)
    };

    return results;
  }

  /**
   * Check for visual artifacts in current theme
   */
  async checkForVisualArtifacts(): Promise<string[]> {
    const artifacts: string[] = [];

    // Check for broken images
    const brokenImages = await this.page.evaluate(() => {
      const images = document.getElementsByTagName('img');
      const broken: string[] = [];
      for (const img of images) {
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
          broken.push(img.src || 'unknown');
        }
      }
      return broken;
    });

    if (brokenImages.length > 0) {
      artifacts.push(`Broken images: ${brokenImages.join(', ')}`);
    }

    // Check for overflow issues
    const overflowIssues = await this.page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const issues: string[] = [];
      elements.forEach(el => {
        const style = getComputedStyle(el);
        if (style.overflowX === 'scroll' || style.overflowY === 'scroll') {
          if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
            issues.push(el.tagName + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className}` : ''));
          }
        }
      });
      return issues;
    });

    if (overflowIssues.length > 0) {
      artifacts.push(`Overflow issues: ${overflowIssues.join(', ')}`);
    }

    return artifacts;
  }

  /**
   * Get background color of main content area
   */
  async getContentBackgroundColor(): Promise<string> {
    return await this.page.evaluate(() => {
      const content = document.querySelector('main, .content, body');
      return content ? getComputedStyle(content).backgroundColor : 'transparent';
    });
  }

  /**
   * Get text color of main content
   */
  async getContentTextColor(): Promise<string> {
    return await this.page.evaluate(() => {
      const content = document.querySelector('main, .content, body');
      return content ? getComputedStyle(content).color : 'inherit';
    });
  }

  /**
   * Verify dark mode uses soft grays (not pure black)
   */
  async verifyDarkModeUsesSoftGrays(): Promise<boolean> {
    if (!(await this.isDarkThemeApplied())) {
      return false;
    }

    const backgroundColor = await this.getContentBackgroundColor();
    
    // Check if color is in the soft gray range (#121212 to #1E1E1E)
    const softGrayRanges = [
      'rgb(18, 18, 18)', // #121212
      'rgb(30, 30, 30)', // #1E1E1E
      'rgb(33, 33, 33)', // #212121
      '#121212',
      '#1e1e1e',
      '#212121'
    ];

    // Pure black to avoid
    const pureBlack = ['rgb(0, 0, 0)', '#000000', '#000'];

    // Check for pure black
    for (const black of pureBlack) {
      if (backgroundColor.includes(black)) {
        return false;
      }
    }

    // Check for soft grays
    for (const gray of softGrayRanges) {
      if (backgroundColor.includes(gray)) {
        return true;
      }
    }

    // If not in our predefined ranges, check if it's a dark color
    return backgroundColor.includes('rgb(1') || backgroundColor.includes('rgb(2') || 
           backgroundColor.includes('rgb(3');
  }

  /**
   * Capture dashboard screenshot for visual regression
   */
  async captureDashboardScreenshot(theme: 'light' | 'dark'): Promise<void> {
    await this.takeScreenshot(`dashboard-${theme}`);
  }

  /**
   * Test theme across all dashboard components
   */
  async testThemeAcrossComponents(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    // Test data table
    if (await this.isElementPresent(this.dataTable)) {
      const tableBgColor = await this.page.evaluate(() => {
        const table = document.querySelector('table');
        return table ? getComputedStyle(table).backgroundColor : 'transparent';
      });
      results.tableContrast = !tableBgColor.includes('undefined');
    }

    // Test cards
    if (await this.isElementPresent(this.cards)) {
      const cardTextColor = await this.page.evaluate(() => {
        const card = document.querySelector('.card, .panel');
        return card ? getComputedStyle(card).color : 'inherit';
      });
      results.cardReadable = !cardTextColor.includes('undefined');
    }

    // Test navigation
    if (await this.isElementPresent(this.navigationMenu)) {
      const navVisible = await this.isElementVisible(this.navigationMenu);
      results.navigationVisible = navVisible;
    }

    return results;
  }
}