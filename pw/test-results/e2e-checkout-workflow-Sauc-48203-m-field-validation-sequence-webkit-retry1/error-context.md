# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\checkout-workflow.spec.ts >> SauceDemo Checkout Workflow Tests >> Checkout Error Handling >> Checkout form field validation sequence
- Location: tests\e2e\checkout-workflow.spec.ts:379:9

# Error details

```
Error: Expected error for test case: {"firstName":"John","lastName":"Doe","postalCode":"ABC","expectedError":"Postal"}
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "1"
      - generic [ref=e16]: "Checkout: Overview"
    - generic [ref=e18]:
      - generic [ref=e19]:
        - generic [ref=e20]: QTY
        - generic [ref=e21]: Description
        - generic [ref=e22]:
          - generic [ref=e23]: "1"
          - generic [ref=e24]:
            - link "Sauce Labs Backpack" [ref=e25]:
              - /url: "#"
              - generic [ref=e26]: Sauce Labs Backpack
            - generic [ref=e27]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
            - generic [ref=e29]: $29.99
      - generic [ref=e30]:
        - generic [ref=e31]: "Payment Information:"
        - generic [ref=e32]: "SauceCard #31337"
        - generic [ref=e33]: "Shipping Information:"
        - generic [ref=e34]: Free Pony Express Delivery!
        - generic [ref=e35]: Price Total
        - generic [ref=e36]: "Item total: $29.99"
        - generic [ref=e37]: "Tax: $2.40"
        - generic [ref=e38]: "Total: $32.39"
        - generic [ref=e39]:
          - button "Go back Cancel" [ref=e40] [cursor=pointer]:
            - img "Go back" [ref=e41]
            - text: Cancel
          - button "Finish" [ref=e42] [cursor=pointer]
  - contentinfo [ref=e43]:
    - list [ref=e44]:
      - listitem [ref=e45]:
        - link "Twitter" [ref=e46]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e47]:
        - link "Facebook" [ref=e48]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e49]:
        - link "LinkedIn" [ref=e50]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e51]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  682 |         password: 'secret_sauce'
  683 |       },
  684 |       problemUser: {
  685 |         username: 'problem_user',
  686 |         password: 'secret_sauce'
  687 |       },
  688 |       performanceGlitchUser: {
  689 |         username: 'performance_glitch_user',
  690 |         password: 'secret_sauce'
  691 |       }
  692 |     };
  693 |     
  694 |     await use(credentials);
  695 |   },
  696 | 
  697 |   /**
  698 |    * Test user data for checkout
  699 |    */
  700 |   testUser: async ({}, use) => {
  701 |     await use({
  702 |       firstName: 'John',
  703 |       lastName: 'Doe',
  704 |       postalCode: '12345'
  705 |     });
  706 |   },
  707 | 
  708 |   /**
  709 |    * Test products data
  710 |    */
  711 |   testProducts: async ({}, use) => {
  712 |     await use({
  713 |       indices: [0, 1, 2, 3, 4, 5],
  714 |       descriptions: [
  715 |         'Sauce Labs Backpack',
  716 |         'Sauce Labs Bike Light',
  717 |         'Sauce Labs Bolt T-Shirt',
  718 |         'Sauce Labs Fleece Jacket',
  719 |         'Sauce Labs Onesie',
  720 |         'Test.allTheThings() T-Shirt (Red)'
  721 |       ]
  722 |     });
  723 |   },
  724 | });
  725 | 
  726 | // ===== Re-export helper functions from individual fixture files =====
  727 | 
  728 | /**
  729 |  * Helper function to setup test with specific product in cart
  730 |  */
  731 | export async function setupTestWithProductInCart(
  732 |   inventoryPage: InventoryPage,
  733 |   productIndex: number = 0
  734 | ): Promise<void> {
  735 |   await inventoryPage.addProductToCart(productIndex);
  736 |   await inventoryPage.goToCart();
  737 | }
  738 | 
  739 | /**
  740 |  * Helper function to verify order completion
  741 |  */
  742 | export async function verifyOrderCompletion(
  743 |   checkoutCompletePage: CheckoutCompletePage
  744 | ): Promise<{
  745 |   orderComplete: boolean;
  746 |   cartEmpty: boolean;
  747 |   correctUrl: boolean;
  748 |   allElementsVisible: boolean;
  749 | }> {
  750 |   const validation = await checkoutCompletePage.validatePostPurchaseState();
  751 |   return validation;
  752 | }
  753 | 
  754 | /**
  755 |  * Helper function to test checkout form validation
  756 |  */
  757 | export async function testCheckoutFormValidation(
  758 |   checkoutStepOnePage: CheckoutStepOnePage,
  759 |   testCases: Array<{
  760 |     firstName: string;
  761 |     lastName: string;
  762 |     postalCode: string;
  763 |     expectedError: string;
  764 |   }>
  765 | ): Promise<void> {
  766 |   for (const testCase of testCases) {
  767 |     await checkoutStepOnePage.clearForm();
  768 |     await checkoutStepOnePage.fillCheckoutInfo(
  769 |       testCase.firstName,
  770 |       testCase.lastName,
  771 |       testCase.postalCode
  772 |     );
  773 |     await checkoutStepOnePage.continueToNextStep();
  774 |     
  775 |     const hasError = await checkoutStepOnePage.isErrorDisplayed();
  776 |     if (hasError) {
  777 |       const errorText = await checkoutStepOnePage.getErrorMessage();
  778 |       if (!errorText.includes(testCase.expectedError)) {
  779 |         throw new Error(`Expected error to contain "${testCase.expectedError}" but got "${errorText}"`);
  780 |       }
  781 |     } else {
> 782 |       throw new Error(`Expected error for test case: ${JSON.stringify(testCase)}`);
      |             ^ Error: Expected error for test case: {"firstName":"John","lastName":"Doe","postalCode":"ABC","expectedError":"Postal"}
  783 |     }
  784 |   }
  785 | }
  786 | 
  787 | /**
  788 |  * Helper function to setup test with specific sort option applied
  789 |  */
  790 | export async function setupTestWithSort(
  791 |   inventoryPage: InventoryPage,
  792 |   sortOption: 'az' | 'za' | 'lohi' | 'hilo'
  793 | ): Promise<void> {
  794 |   await inventoryPage.sortProducts(sortOption);
  795 |   const currentSort = await inventoryPage.getCurrentSortOption();
  796 |   if (currentSort !== sortOption) {
  797 |     throw new Error(`Failed to apply sort option ${sortOption}. Current sort is ${currentSort}`);
  798 |   }
  799 | }
  800 | 
  801 | /**
  802 |  * Helper function to verify product sorting
  803 |  */
  804 | export async function verifyProductSorting(
  805 |   inventoryPage: InventoryPage,
  806 |   expectedSort: 'az' | 'za' | 'lohi' | 'hilo'
  807 | ): Promise<void> {
  808 |   const currentSort = await inventoryPage.getCurrentSortOption();
  809 |   if (currentSort !== expectedSort) {
  810 |     throw new Error(`Expected sort ${expectedSort}, but got ${currentSort}`);
  811 |   }
  812 | 
  813 |   switch (expectedSort) {
  814 |     case 'az':
  815 |       const productNamesAZ = await inventoryPage.getAllProductNames();
  816 |       const sortedNamesAZ = [...productNamesAZ].sort();
  817 |       if (JSON.stringify(productNamesAZ) !== JSON.stringify(sortedNamesAZ)) {
  818 |         throw new Error('Products are not sorted A-Z');
  819 |       }
  820 |       break;
  821 |       
  822 |     case 'za':
  823 |       const productNamesZA = await inventoryPage.getAllProductNames();
  824 |       const sortedNamesZA = [...productNamesZA].sort().reverse();
  825 |       if (JSON.stringify(productNamesZA) !== JSON.stringify(sortedNamesZA)) {
  826 |         throw new Error('Products are not sorted Z-A');
  827 |       }
  828 |       break;
  829 |       
  830 |     case 'lohi':
  831 |       const productPricesLOHI = await inventoryPage.getAllProductPrices();
  832 |       for (let i = 0; i < productPricesLOHI.length - 1; i++) {
  833 |         if (productPricesLOHI[i] > productPricesLOHI[i + 1]) {
  834 |           throw new Error(`Prices not sorted low to high: ${productPricesLOHI[i]} > ${productPricesLOHI[i + 1]}`);
  835 |         }
  836 |       }
  837 |       break;
  838 |       
  839 |     case 'hilo':
  840 |       const productPricesHILO = await inventoryPage.getAllProductPrices();
  841 |       for (let i = 0; i < productPricesHILO.length - 1; i++) {
  842 |         if (productPricesHILO[i] < productPricesHILO[i + 1]) {
  843 |           throw new Error(`Prices not sorted high to low: ${productPricesHILO[i]} < ${productPricesHILO[i + 1]}`);
  844 |         }
  845 |       }
  846 |       break;
  847 |   }
  848 | }
  849 | 
  850 | /**
  851 |  * Helper function to verify all product details
  852 |  */
  853 | export async function verifyAllProductDetails(inventoryPage: InventoryPage): Promise<void> {
  854 |   const productCount = await inventoryPage.getProductCount();
  855 |   if (productCount <= 0) {
  856 |     throw new Error('No products found');
  857 |   }
  858 | 
  859 |   for (let i = 0; i < productCount; i++) {
  860 |     const details = await inventoryPage.getProductDetails(i);
  861 |     
  862 |     if (!details.name || details.name.length === 0) {
  863 |       throw new Error(`Product ${i} has empty name`);
  864 |     }
  865 |     
  866 |     if (!details.description || details.description.length === 0) {
  867 |       throw new Error(`Product ${i} has empty description`);
  868 |     }
  869 |     
  870 |     if (!details.price || !/^\$\d+\.\d{2}$/.test(details.price)) {
  871 |       throw new Error(`Product ${i} has invalid price format: ${details.price}`);
  872 |     }
  873 |   }
  874 | }
  875 | 
  876 | /**
  877 |  * Helper function to set up test with specific theme
  878 |  */
  879 | export async function setupTestWithTheme(
  880 |   page: Page, 
  881 |   theme: 'light' | 'dark' | 'auto' | 'system'
  882 | ): Promise<{
```