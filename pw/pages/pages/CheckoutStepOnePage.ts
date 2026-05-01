import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Checkout Step One Page (Customer Information) Page Object Model for SauceDemo
 */
export class CheckoutStepOnePage extends BasePage {
  // Locators
  readonly checkoutContainer: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly errorIcon: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators with SauceDemo-specific selectors
    this.checkoutContainer = page.locator('.checkout_info_container');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.locator('#cancel');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorIcon = page.locator('.error_icon');
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();
  }

  /**
   * Submit form and continue to next step
   */
  async continueToNextStep(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Cancel checkout and return to cart
   */
  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Validate form with test data
   */
  async validateFormWithData(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Clear form first
    await this.clearForm();

    // Test with empty fields
    await this.continueButton.click();
    if (await this.isErrorDisplayed()) {
      const errorText = await this.getErrorMessage();
      if (errorText.includes('First Name') || errorText.includes('required')) {
        errors.push('First Name required validation works');
      }
    }

    // Fill first name only
    await this.firstNameInput.fill(firstName);
    await this.continueButton.click();
    if (await this.isErrorDisplayed()) {
      const errorText = await this.getErrorMessage();
      if (errorText.includes('Last Name')) {
        errors.push('Last Name required validation works');
      }
    }

    // Fill first and last name
    await this.lastNameInput.fill(lastName);
    await this.continueButton.click();
    if (await this.isErrorDisplayed()) {
      const errorText = await this.getErrorMessage();
      if (errorText.includes('Postal')) {
        errors.push('Postal Code required validation works');
      }
    }

    // Fill all fields correctly
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();

    // Check if we moved to next page (no error)
    const stillOnPage = await this.checkoutContainer.isVisible();
    
    return {
      isValid: !stillOnPage && errors.length === 0,
      errors
    };
  }

  /**
   * Test with invalid postal code (letters)
   */
  async testInvalidPostalCode(postalCode: string): Promise<boolean> {
    await this.clearForm();
    await this.firstNameInput.fill('Test');
    await this.lastNameInput.fill('User');
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();

    return await this.isErrorDisplayed();
  }

  /**
   * Get field values
   */
  async getFieldValues(): Promise<{
    firstName: string;
    lastName: string;
    postalCode: string;
  }> {
    return {
      firstName: await this.firstNameInput.inputValue(),
      lastName: await this.lastNameInput.inputValue(),
      postalCode: await this.postalCodeInput.inputValue()
    };
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.checkoutContainer).toBeVisible();
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

  /**
   * Verify all fields are empty by default
   */
  async verifyFieldsAreEmpty(): Promise<boolean> {
    const values = await this.getFieldValues();
    return values.firstName === '' && 
           values.lastName === '' && 
           values.postalCode === '';
  }
}