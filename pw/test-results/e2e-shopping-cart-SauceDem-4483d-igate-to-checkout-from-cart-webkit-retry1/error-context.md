# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\shopping-cart.spec.ts >> SauceDemo Shopping Cart Tests >> Cart Page Functionality >> Navigate to checkout from cart
- Location: tests\e2e\shopping-cart.spec.ts:283:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.isEnabled: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Checkout")')

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
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Name (A to Z)
          - combobox [ref=e19]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link "Sauce Labs Backpack" [ref=e26]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Backpack" [ref=e30]:
              - /url: "#"
              - generic [ref=e31]: Sauce Labs Backpack
            - generic [ref=e32]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e33]:
            - generic [ref=e34]: $29.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link "Sauce Labs Bike Light" [ref=e38]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42]:
              - /url: "#"
              - generic [ref=e43]: Sauce Labs Bike Light
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e50]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54]:
              - /url: "#"
              - generic [ref=e55]: Sauce Labs Bolt T-Shirt
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link "Sauce Labs Fleece Jacket" [ref=e62]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Sauce Labs Fleece Jacket" [ref=e66]:
              - /url: "#"
              - generic [ref=e67]: Sauce Labs Fleece Jacket
            - generic [ref=e68]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e69]:
            - generic [ref=e70]: $49.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link "Sauce Labs Onesie" [ref=e74]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Onesie" [ref=e78]:
              - /url: "#"
              - generic [ref=e79]: Sauce Labs Onesie
            - generic [ref=e80]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e81]:
            - generic [ref=e82]: $7.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e86]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e90]:
              - /url: "#"
              - generic [ref=e91]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e92]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e93]:
            - generic [ref=e94]: $15.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  75  |    * Remove item from cart by index
  76  |    */
  77  |   async removeItem(index: number): Promise<void> {
  78  |     const removeButton = this.cartItems.nth(index).locator('button:has-text("Remove")');
  79  |     await removeButton.click();
  80  |     // Wait for item removal animation
  81  |     await this.page.waitForTimeout(300);
  82  |   }
  83  | 
  84  |   /**
  85  |    * Remove all items from cart
  86  |    */
  87  |   async removeAllItems(): Promise<void> {
  88  |     const count = await this.getCartItemCount();
  89  |     for (let i = count - 1; i >= 0; i--) {
  90  |       await this.removeItem(i);
  91  |     }
  92  |   }
  93  | 
  94  |   /**
  95  |    * Continue shopping (return to inventory)
  96  |    */
  97  |   async continueShopping(): Promise<void> {
  98  |     await this.continueShoppingButton.click();
  99  |   }
  100 | 
  101 |   /**
  102 |    * Proceed to checkout
  103 |    */
  104 |   async proceedToCheckout(): Promise<void> {
  105 |     await this.checkoutButton.click();
  106 |   }
  107 | 
  108 |   /**
  109 |    * Get total price of all items in cart
  110 |    */
  111 |   async getTotalPrice(): Promise<number> {
  112 |     let total = 0;
  113 |     const count = await this.getCartItemCount();
  114 |     
  115 |     for (let i = 0; i < count; i++) {
  116 |       const priceText = await this.cartItems.nth(i).locator('.inventory_item_price').textContent();
  117 |       if (priceText) {
  118 |         const price = parseFloat(priceText.replace('$', ''));
  119 |         if (!isNaN(price)) {
  120 |           const quantityText = await this.cartItems.nth(i).locator('.cart_quantity').textContent();
  121 |           const quantity = quantityText ? parseInt(quantityText, 10) : 1;
  122 |           total += price * quantity;
  123 |         }
  124 |       }
  125 |     }
  126 |     
  127 |     return total;
  128 |   }
  129 | 
  130 |   /**
  131 |    * Verify cart contains specific item by name
  132 |    */
  133 |   async verifyItemInCart(itemName: string): Promise<boolean> {
  134 |     const count = await this.getCartItemCount();
  135 |     
  136 |     for (let i = 0; i < count; i++) {
  137 |       const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
  138 |       if (name === itemName) {
  139 |         return true;
  140 |       }
  141 |     }
  142 |     
  143 |     return false;
  144 |   }
  145 | 
  146 |   /**
  147 |    * Get item index by name
  148 |    */
  149 |   async getItemIndexByName(itemName: string): Promise<number> {
  150 |     const count = await this.getCartItemCount();
  151 |     
  152 |     for (let i = 0; i < count; i++) {
  153 |       const name = await this.cartItems.nth(i).locator('.inventory_item_name').textContent();
  154 |       if (name === itemName) {
  155 |         return i;
  156 |       }
  157 |     }
  158 |     
  159 |     return -1;
  160 |   }
  161 | 
  162 |   /**
  163 |    * Verify page is loaded
  164 |    */
  165 |   async verifyPageLoaded(): Promise<void> {
  166 |     await expect(this.cartContainer).toBeVisible();
  167 |     await expect(this.continueShoppingButton).toBeVisible();
  168 |     await expect(this.checkoutButton).toBeVisible();
  169 |   }
  170 | 
  171 |   /**
  172 |    * Verify checkout button is enabled (cart not empty)
  173 |    */
  174 |   async verifyCheckoutEnabled(): Promise<boolean> {
> 175 |     return await this.checkoutButton.isEnabled();
      |                                      ^ Error: locator.isEnabled: Test timeout of 60000ms exceeded.
  176 |   }
  177 | }
```