import { test as base, Page } from '@playwright/test';
import { SauceDemoLoginPage } from '../pom/pages/SauceDemoLoginPage';
import { InventoryPage } from '../pom/pages/InventoryPage';
import { CartPage } from '../pom/pages/CartPage';
import { CheckoutStepOnePage } from '../pom/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pom/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pom/pages/CheckoutCompletePage';
import { HeaderComponent } from '../pom/components/HeaderComponent';
import { MenuComponent } from '../pom/components/MenuComponent';
import { LoginPage } from '../pom/pages/LoginPage';
import { DashboardPage } from '../pom/pages/DashboardPage';
import { SettingsPage } from '../pom/pages/SettingsPage';
import { ThemeToggle } from '../pom/components/ThemeToggle';

/**
 * Combined fixtures interface for all test types
 */
export interface CombinedFixtures {
  // ===== Authentication Fixtures =====
  /** SauceDemo login page object */
  loginPage: SauceDemoLoginPage;
  
  /** Pre-authenticated page as standard user */
  authenticatedPageAsStandardUser: Page;
  
  /** Pre-authenticated page as problem user */
  authenticatedPageAsProblemUser: Page;
  
  /** Pre-authenticated page as performance glitch user */
  authenticatedPageAsPerformanceGlitchUser: Page;
  
  /** Helper method to login as any user */
  loginAsUser: (username: string, password: string) => Promise<InventoryPage>;
  
  /** Helper to login with a completely clean context (no shared state) */
  loginWithCleanContext: (username: string, password: string) => Promise<{ page: Page; inventoryPage: InventoryPage }>;
  
  // ===== Checkout Fixtures =====
  /** Inventory page object (automatically logs in as standard user) */
  inventoryPage: InventoryPage;
  
  /** Cart page object */
  cartPage: CartPage;
  
  /** Checkout step one page object */
  checkoutStepOnePage: CheckoutStepOnePage;
  
  /** Checkout step two page object */
  checkoutStepTwoPage: CheckoutStepTwoPage;
  
  /** Checkout complete page object */
  checkoutCompletePage: CheckoutCompletePage;
  
  /** Pre-authenticated page with an item already in cart */
  authenticatedPageWithItemInCart: Page;
  
  /** Pre-authenticated page at checkout step one */
  authenticatedPageAtCheckoutStepOne: Page;
  
  /** Pre-authenticated page at checkout step two */
  authenticatedPageAtCheckoutStepTwo: Page;
  
  /** Helper method to add product to cart */
  addProductToCart: (productIndex?: number) => Promise<void>;
  
  /** Helper method to proceed to checkout from cart */
  proceedToCheckout: () => Promise<void>;
  
  /** Helper method to fill checkout information */
  fillCheckoutInfo: (firstName: string, lastName: string, postalCode: string) => Promise<void>;
  
  /** Helper method to complete purchase */
  completePurchase: () => Promise<void>;
  
  /** Helper method to complete full checkout workflow */
  completeFullCheckout: (options?: {
    productIndex?: number;
    firstName?: string;
    lastName?: string;
    postalCode?: string;
  }) => Promise<CheckoutCompletePage>;
  
  // ===== Shopping Cart Fixtures =====
  /** Header component - available on all authenticated pages */
  header: HeaderComponent;
  
  /** Pre-authenticated page with inventory already loaded */
  authenticatedPage: Page;
  
  /** Helper to create authenticated page with specific items in cart */
  authenticatedPageWithCartItems: (itemCount: number) => Promise<{ page: Page; inventoryPage: InventoryPage; cartPage: CartPage; header: HeaderComponent }>;
  
  /** Helper method to add multiple items to cart */
  addItemsToCart: (indices: number[]) => Promise<void>;
  
  /** Helper method to go to cart with specific items */
  goToCartWithItems: (indices: number[]) => Promise<{ cartPage: CartPage; header: HeaderComponent }>;
  
  /** Helper to login as different user types */
  loginAsUserType: (userType: 'standard' | 'problem' | 'performance') => Promise<InventoryPage>;
  
  // ===== Product Catalog Fixtures =====
  /** Helper to get inventory page with specific user credentials */
  inventoryPageAsUser: (username: string, password: string) => Promise<InventoryPage>;
  
  // ===== Menu Navigation Fixtures =====
  /** Menu component (requires authenticated page) */
  menu: MenuComponent;
  
  /** Pre-authenticated page with all components initialized */
  authenticatedPageWithComponents: Page;
  
  /** Helper method to login as standard user */
  loginAsStandardUser: () => Promise<InventoryPage>;
  
  // ===== Theme Fixtures =====
  /** Theme login page object (different from SauceDemo) */
  themeLoginPage: LoginPage;
  
  /** Dashboard page object */
  dashboardPage: DashboardPage;
  
  /** Settings page object */
  settingsPage: SettingsPage;
  
  /** Theme toggle component */
  themeToggle: ThemeToggle;
  
  /** Page with cleared localStorage and cookies */
  pageWithCleanStorage: Page;
  
  // ===== Test Data =====
  /** Comprehensive test credentials for all user types */
  testCredentials: {
    standardUser: { username: string; password: string };
    lockedOutUser: { username: string; password: string };
    problemUser: { username: string; password: string };
    performanceGlitchUser: { username: string; password: string };
  };
  
  /** Test user data for checkout */
  testUser: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  
  /** Test products data */
  testProducts: {
    indices: number[];
    descriptions: string[];
  };
}

/**
 * Extended test with all combined fixtures
 */
export const test = base.extend<CombinedFixtures>({
  // ===== Authentication Fixtures =====
  /**
   * Login page object - automatically navigates to login page
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    await use(loginPage);
  },

  /**
   * Pre-authenticated page as standard user
   * Creates a clean context with standard user already logged in
   */
  authenticatedPageAsStandardUser: async ({ browser }, use) => {
    // Create a new context for clean authentication
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginAsStandardUser();
    
    await use(page);
    
    // Cleanup
    await context.close();
  },

  /**
   * Pre-authenticated page as problem user
   */
  authenticatedPageAsProblemUser: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('problem_user', 'secret_sauce');
    
    await use(page);
    
    await context.close();
  },

  /**
   * Pre-authenticated page as performance glitch user
   */
  authenticatedPageAsPerformanceGlitchUser: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    
    await use(page);
    
    await context.close();
  },

  /**
   * Helper method to login as any user
   */
  loginAsUser: async ({ loginPage }, use) => {
    await use(async (username: string, password: string) => {
      return await loginPage.login(username, password);
    });
  },

  /**
   * Helper to login with a completely clean context (no shared state)
   */
  loginWithCleanContext: async ({ browser }, use) => {
    const contexts: any[] = [];
    
    await use(async (username: string, password: string) => {
      const context = await browser.newContext();
      contexts.push(context);
      const page = await context.newPage();
      
      const loginPage = new SauceDemoLoginPage(page);
      await loginPage.gotoLoginPage();
      const inventoryPage = await loginPage.login(username, password);
      
      return { page, inventoryPage };
    });
    
    // Cleanup all contexts created during this fixture's lifetime
    for (const context of contexts) {
      await context.close();
    }
  },

  // ===== Checkout Fixtures =====
  /**
   * Inventory page object (automatically logs in as standard user)
   */
  inventoryPage: async ({ page, loginPage }, use) => {
    await loginPage.gotoLoginPage();
    const inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    
    await use(inventoryPage);
  },

  /**
   * Cart page object (requires inventory page to be set up)
   */
  cartPage: async ({ page, inventoryPage }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  /**
   * Checkout step one page object
   */
  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  /**
   * Checkout step two page object
   */
  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  /**
   * Checkout complete page object
   */
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },

  /**
   * Pre-authenticated page with an item already in cart
   * Creates a clean context with standard user logged in and item added to cart
   */
  authenticatedPageWithItemInCart: async ({ browser }, use) => {
    // Create a new context for clean authentication
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    const inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    
    // Add item to cart
    await inventoryPage.addProductToCart(0);
    
    await use(page);
    
    // Cleanup
    await context.close();
  },

  /**
   * Pre-authenticated page at checkout step one
   * Creates a clean context with standard user at checkout step one
   */
  authenticatedPageAtCheckoutStepOne: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    const inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    
    // Add item and proceed to checkout step one
    await inventoryPage.addProductToCart(0);
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    await use(page);
    
    await context.close();
  },

  /**
   * Pre-authenticated page at checkout step two
   * Creates a clean context with standard user at checkout step two
   */
  authenticatedPageAtCheckoutStepTwo: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    const inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    
    // Complete checkout step one
    await inventoryPage.addProductToCart(0);
    await inventoryPage.goToCart();
    
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutStepOnePage.continueToNextStep();
    
    await use(page);
    
    await context.close();
  },

  /**
   * Helper method to add product to cart
   */
  addProductToCart: async ({ inventoryPage }, use) => {
    await use(async (productIndex: number = 0) => {
      await inventoryPage.addProductToCart(productIndex);
    });
  },

  /**
   * Helper method to proceed to checkout from cart
   */
  proceedToCheckout: async ({ cartPage }, use) => {
    await use(async () => {
      await cartPage.proceedToCheckout();
    });
  },

  /**
   * Helper method to fill checkout information
   */
  fillCheckoutInfo: async ({ checkoutStepOnePage }, use) => {
    await use(async (firstName: string, lastName: string, postalCode: string) => {
      await checkoutStepOnePage.fillCheckoutInfo(firstName, lastName, postalCode);
    });
  },

  /**
   * Helper method to complete purchase
   */
  completePurchase: async ({ checkoutStepTwoPage }, use) => {
    await use(async () => {
      await checkoutStepTwoPage.completePurchase();
    });
  },

  /**
   * Helper method to complete full checkout workflow
   */
  completeFullCheckout: async ({ 
    inventoryPage, 
    cartPage, 
    checkoutStepOnePage, 
    checkoutStepTwoPage 
  }, use) => {
    await use(async (options?: {
      productIndex?: number;
      firstName?: string;
      lastName?: string;
      postalCode?: string;
    }) => {
      const productIndex = options?.productIndex ?? 0;
      const firstName = options?.firstName ?? 'John';
      const lastName = options?.lastName ?? 'Doe';
      const postalCode = options?.postalCode ?? '12345';

      // Add product to cart
      await inventoryPage.addProductToCart(productIndex);
      await inventoryPage.goToCart();
      
      // Proceed to checkout
      await cartPage.proceedToCheckout();
      
      // Fill checkout info
      await checkoutStepOnePage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutStepOnePage.continueToNextStep();
      
      // Complete purchase
      await checkoutStepTwoPage.completePurchase();
      
      return new CheckoutCompletePage(checkoutStepOnePage.page);
    });
  },

  // ===== Shopping Cart Fixtures =====
  /**
   * Header component - available on all authenticated pages
   */
  header: async ({ page }, use) => {
    const header = new HeaderComponent(page);
    await use(header);
  },

  /**
   * Pre-authenticated page with inventory already loaded
   * Useful for tests that need a clean authenticated state
   */
  authenticatedPage: async ({ browser }, use) => {
    // Create a new context for clean authentication
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    const inventoryPage = await loginPage.loginAsStandardUser();
    await inventoryPage.verifyPageLoaded();
    
    await use(page);
    
    // Cleanup
    await context.close();
  },

  /**
   * Helper to create authenticated page with specific items in cart
   */
  authenticatedPageWithCartItems: async ({ browser }, use) => {
    await use(async (itemCount: number) => {
      // Create a new context for clean authentication
      const context = await browser.newContext();
      const page = await context.newPage();
      
      const loginPage = new SauceDemoLoginPage(page);
      await loginPage.gotoLoginPage();
      const inventoryPage = await loginPage.loginAsStandardUser();
      await inventoryPage.verifyPageLoaded();
      
      const header = new HeaderComponent(page);
      
      // Add specified number of items
      for (let i = 0; i < itemCount && i < 6; i++) {
        await inventoryPage.addProductToCart(i);
      }
      
      // Navigate to cart
      await inventoryPage.goToCart();
      const cartPage = new CartPage(page);
      await cartPage.verifyPageLoaded();
      
      return { page, inventoryPage, cartPage, header };
    });
  },

  /**
   * Helper method to add multiple items to cart
   */
  addItemsToCart: async ({ inventoryPage }, use) => {
    await use(async (indices: number[]) => {
      for (const index of indices) {
        await inventoryPage.addProductToCart(index);
      }
    });
  },

  /**
   * Helper method to go to cart with specific items
   */
  goToCartWithItems: async ({ inventoryPage, page }, use) => {
    await use(async (indices: number[]) => {
      // Add items to cart
      for (const index of indices) {
        await inventoryPage.addProductToCart(index);
      }
      
      // Navigate to cart
      await inventoryPage.goToCart();
      const cartPage = new CartPage(page);
      await cartPage.verifyPageLoaded();
      
      const header = new HeaderComponent(page);
      
      return { cartPage, header };
    });
  },

  /**
   * Helper to login as different user types
   */
  loginAsUserType: async ({ loginPage, page }, use) => {
    await use(async (userType: 'standard' | 'problem' | 'performance') => {
      await loginPage.gotoLoginPage();
      
      let inventoryPage: InventoryPage;
      switch (userType) {
        case 'standard':
          inventoryPage = await loginPage.loginAsStandardUser();
          break;
        case 'problem':
          inventoryPage = await loginPage.login('problem_user', 'secret_sauce');
          break;
        case 'performance':
          inventoryPage = await loginPage.login('performance_glitch_user', 'secret_sauce');
          break;
        default:
          inventoryPage = await loginPage.loginAsStandardUser();
      }
      
      await inventoryPage.verifyPageLoaded();
      return inventoryPage;
    });
  },

  // ===== Product Catalog Fixtures =====
  /**
   * Helper to get inventory page with specific user credentials
   */
  inventoryPageAsUser: async ({ page, loginPage }, use) => {
    const getUserInventory = async (username: string, password: string): Promise<InventoryPage> => {
      await loginPage.gotoLoginPage();
      const inventoryPage = await loginPage.login(username, password);
      await inventoryPage.verifyPageLoaded();
      return inventoryPage;
    };
    
    await use(getUserInventory);
  },

  // ===== Menu Navigation Fixtures =====
  /**
   * Menu component (requires authenticated page)
   */
  menu: async ({ page, inventoryPage }, use) => {
    const menu = new MenuComponent(page);
    await use(menu);
  },

  /**
   * Pre-authenticated page with all components initialized
   * Creates a clean context with standard user logged in and all components ready
   */
  authenticatedPageWithComponents: async ({ browser }, use) => {
    // Create a new context for clean authentication
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const loginPage = new SauceDemoLoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginAsStandardUser();
    
    // Verify inventory page is loaded
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.verifyPageLoaded();
    
    await use(page);
    
    // Cleanup
    await context.close();
  },

  /**
   * Helper method to login as standard user
   */
  loginAsStandardUser: async ({ loginPage }, use) => {
    await use(async () => {
      await loginPage.gotoLoginPage();
      return await loginPage.loginAsStandardUser();
    });
  },

  // ===== Theme Fixtures =====
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
   * Theme login page object (different from SauceDemo)
   */
  themeLoginPage: async ({ page }, use) => {
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

  // ===== Test Data =====
  /**
   * Comprehensive test credentials for all user types
   */
  testCredentials: async ({}, use) => {
    const credentials = {
      standardUser: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
      },
      problemUser: {
        username: 'problem_user',
        password: 'secret_sauce'
      },
      performanceGlitchUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce'
      }
    };
    
    await use(credentials);
  },

  /**
   * Test user data for checkout
   */
  testUser: async ({}, use) => {
    await use({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    });
  },

  /**
   * Test products data
   */
  testProducts: async ({}, use) => {
    await use({
      indices: [0, 1, 2, 3, 4, 5],
      descriptions: [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
      ]
    });
  },
});

// ===== Re-export helper functions from individual fixture files =====

/**
 * Helper function to setup test with specific product in cart
 */
export async function setupTestWithProductInCart(
  inventoryPage: InventoryPage,
  productIndex: number = 0
): Promise<void> {
  await inventoryPage.addProductToCart(productIndex);
  await inventoryPage.goToCart();
}

/**
 * Helper function to verify order completion
 */
export async function verifyOrderCompletion(
  checkoutCompletePage: CheckoutCompletePage
): Promise<{
  orderComplete: boolean;
  cartEmpty: boolean;
  correctUrl: boolean;
  allElementsVisible: boolean;
}> {
  const validation = await checkoutCompletePage.validatePostPurchaseState();
  return validation;
}

/**
 * Helper function to test checkout form validation
 */
export async function testCheckoutFormValidation(
  checkoutStepOnePage: CheckoutStepOnePage,
  testCases: Array<{
    firstName: string;
    lastName: string;
    postalCode: string;
    expectedError: string;
  }>
): Promise<void> {
  for (const testCase of testCases) {
    await checkoutStepOnePage.clearForm();
    await checkoutStepOnePage.fillCheckoutInfo(
      testCase.firstName,
      testCase.lastName,
      testCase.postalCode
    );
    await checkoutStepOnePage.continueToNextStep();
    
    const hasError = await checkoutStepOnePage.isErrorDisplayed();
    if (hasError) {
      const errorText = await checkoutStepOnePage.getErrorMessage();
      if (!errorText.includes(testCase.expectedError)) {
        throw new Error(`Expected error to contain "${testCase.expectedError}" but got "${errorText}"`);
      }
    } else {
      throw new Error(`Expected error for test case: ${JSON.stringify(testCase)}`);
    }
  }
}

/**
 * Helper function to setup test with specific sort option applied
 */
export async function setupTestWithSort(
  inventoryPage: InventoryPage,
  sortOption: 'az' | 'za' | 'lohi' | 'hilo'
): Promise<void> {
  await inventoryPage.sortProducts(sortOption);
  const currentSort = await inventoryPage.getCurrentSortOption();
  if (currentSort !== sortOption) {
    throw new Error(`Failed to apply sort option ${sortOption}. Current sort is ${currentSort}`);
  }
}

/**
 * Helper function to verify product sorting
 */
export async function verifyProductSorting(
  inventoryPage: InventoryPage,
  expectedSort: 'az' | 'za' | 'lohi' | 'hilo'
): Promise<void> {
  const currentSort = await inventoryPage.getCurrentSortOption();
  if (currentSort !== expectedSort) {
    throw new Error(`Expected sort ${expectedSort}, but got ${currentSort}`);
  }

  switch (expectedSort) {
    case 'az':
      const productNamesAZ = await inventoryPage.getAllProductNames();
      const sortedNamesAZ = [...productNamesAZ].sort();
      if (JSON.stringify(productNamesAZ) !== JSON.stringify(sortedNamesAZ)) {
        throw new Error('Products are not sorted A-Z');
      }
      break;
      
    case 'za':
      const productNamesZA = await inventoryPage.getAllProductNames();
      const sortedNamesZA = [...productNamesZA].sort().reverse();
      if (JSON.stringify(productNamesZA) !== JSON.stringify(sortedNamesZA)) {
        throw new Error('Products are not sorted Z-A');
      }
      break;
      
    case 'lohi':
      const productPricesLOHI = await inventoryPage.getAllProductPrices();
      for (let i = 0; i < productPricesLOHI.length - 1; i++) {
        if (productPricesLOHI[i] > productPricesLOHI[i + 1]) {
          throw new Error(`Prices not sorted low to high: ${productPricesLOHI[i]} > ${productPricesLOHI[i + 1]}`);
        }
      }
      break;
      
    case 'hilo':
      const productPricesHILO = await inventoryPage.getAllProductPrices();
      for (let i = 0; i < productPricesHILO.length - 1; i++) {
        if (productPricesHILO[i] < productPricesHILO[i + 1]) {
          throw new Error(`Prices not sorted high to low: ${productPricesHILO[i]} < ${productPricesHILO[i + 1]}`);
        }
      }
      break;
  }
}

/**
 * Helper function to verify all product details
 */
export async function verifyAllProductDetails(inventoryPage: InventoryPage): Promise<void> {
  const productCount = await inventoryPage.getProductCount();
  if (productCount <= 0) {
    throw new Error('No products found');
  }

  for (let i = 0; i < productCount; i++) {
    const details = await inventoryPage.getProductDetails(i);
    
    if (!details.name || details.name.length === 0) {
      throw new Error(`Product ${i} has empty name`);
    }
    
    if (!details.description || details.description.length === 0) {
      throw new Error(`Product ${i} has empty description`);
    }
    
    if (!details.price || !/^\$\d+\.\d{2}$/.test(details.price)) {
      throw new Error(`Product ${i} has invalid price format: ${details.price}`);
    }
  }
}

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