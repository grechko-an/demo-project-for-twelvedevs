# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\authentication.spec.ts >> SauceDemo Authentication Tests >> P1 - Important Authentication Scenarios >> AUTH-02: Login with invalid username @P1
- Location: tests\e2e\authentication.spec.ts:59:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*index.html/
Received string:  "https://www.saucedemo.com/"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    13 × unexpected value "https://www.saucedemo.com/"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: invalid_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Username and password do not match any user in this service" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Username and password do not match any user in this service"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { test } from '../../fixtures/authentication.fixtures';
  3   | import { InventoryPage } from '../../pom/pages/InventoryPage';
  4   | 
  5   | test.describe('SauceDemo Authentication Tests', () => {
  6   |   test.describe('P0 - Critical Authentication Scenarios', () => {
  7   |     test('AUTH-01: Successful login with valid credentials @P0', async ({ 
  8   |       loginPage, 
  9   |       page 
  10  |     }) => {
  11  |       // Test ID: AUTH-01
  12  |       // Priority: P0
  13  |       // Steps: 1. Navigate to login page, 2. Enter valid username/password, 3. Click Login
  14  |       // Expected: User is redirected to inventory page
  15  | 
  16  |       // Act
  17  |       const inventoryPage = await loginPage.loginAsStandardUser();
  18  | 
  19  |       // Assert
  20  |       await expect(page).toHaveURL(/.*inventory.html/);
  21  |       await inventoryPage.verifyPageLoaded();
  22  |       
  23  |       // Verify inventory page elements
  24  |       await expect(inventoryPage.productContainer).toBeVisible();
  25  |       await expect(inventoryPage.sortDropdown).toBeVisible();
  26  |       
  27  |       // Take screenshot for evidence
  28  |       await page.screenshot({ path: 'test-results/auth-successful.png', fullPage: true });
  29  |     });
  30  | 
  31  |     test('AUTH-04: Login with locked_out_user @P0', async ({ 
  32  |       loginPage, 
  33  |       page,
  34  |       testCredentials 
  35  |     }) => {
  36  |       // Test ID: AUTH-04
  37  |       // Priority: P0
  38  |       // Steps: 1. Enter locked_out_user, 2. Enter secret_sauce, 3. Click Login
  39  |       // Expected: Error "Sorry, this user has been locked out." appears
  40  | 
  41  |       // Act
  42  |       await loginPage.login(
  43  |         testCredentials.lockedOutUser.username,
  44  |         testCredentials.lockedOutUser.password
  45  |       );
  46  | 
  47  |       // Assert
  48  |       await expect(loginPage.errorMessage).toBeVisible();
  49  |       const errorText = await loginPage.getErrorMessageText();
  50  |       expect(errorText).toContain('Sorry, this user has been locked out.');
  51  |       
  52  |       // Verify still on login page
  53  |       await expect(page).toHaveURL(/.*index.html/);
  54  |       await loginPage.verifyPageLoaded();
  55  |     });
  56  |   });
  57  | 
  58  |   test.describe('P1 - Important Authentication Scenarios', () => {
  59  |     test('AUTH-02: Login with invalid username @P1', async ({ 
  60  |       loginPage, 
  61  |       page,
  62  |       testCredentials 
  63  |     }) => {
  64  |       // Test ID: AUTH-02
  65  |       // Priority: P1
  66  |       // Steps: 1. Enter invalid username, 2. Enter valid password, 3. Click Login
  67  |       // Expected: Error message displayed, user stays on login page
  68  | 
  69  |       // Arrange
  70  |       const invalidUsername = 'invalid_user';
  71  |       const validPassword = testCredentials.standardUser.password;
  72  | 
  73  |       // Act
  74  |       const errorText = await loginPage.attemptInvalidLogin(invalidUsername, validPassword);
  75  | 
  76  |       // Assert
  77  |       expect(errorText).toContain('Username and password do not match');
  78  |       await expect(loginPage.errorMessage).toBeVisible();
> 79  |       await expect(page).toHaveURL(/.*index.html/);
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  80  |     });
  81  | 
  82  |     test('AUTH-03: Login with invalid password @P1', async ({ 
  83  |       loginPage, 
  84  |       page,
  85  |       testCredentials 
  86  |     }) => {
  87  |       // Test ID: AUTH-03
  88  |       // Priority: P1
  89  |       // Steps: 1. Enter valid username, 2. Enter invalid password, 3. Click Login
  90  |       // Expected: Error message displayed, user stays on login page
  91  | 
  92  |       // Arrange
  93  |       const validUsername = testCredentials.standardUser.username;
  94  |       const invalidPassword = 'wrong_password';
  95  | 
  96  |       // Act
  97  |       const errorText = await loginPage.attemptInvalidLogin(validUsername, invalidPassword);
  98  | 
  99  |       // Assert
  100 |       expect(errorText).toContain('Username and password do not match');
  101 |       await expect(loginPage.errorMessage).toBeVisible();
  102 |       await expect(page).toHaveURL(/.*index.html/);
  103 |     });
  104 | 
  105 |     test('AUTH-05: Logout functionality @P1', async ({ 
  106 |       authenticatedPageAsStandardUser,
  107 |       loginPage 
  108 |     }) => {
  109 |       // Test ID: AUTH-05
  110 |       // Priority: P1
  111 |       // Steps: 1. Login successfully, 2. Open menu, 3. Click Logout
  112 |       // Expected: User is redirected to login page
  113 | 
  114 |       // Arrange
  115 |       const page = authenticatedPageAsStandardUser;
  116 |       const inventoryPage = new InventoryPage(page);
  117 |       await inventoryPage.verifyPageLoaded();
  118 | 
  119 |       // Act - Logout via menu
  120 |       await inventoryPage.openMenu();
  121 |       const menuButton = page.locator('#logout_sidebar_link');
  122 |       await expect(menuButton).toBeVisible();
  123 |       await menuButton.click();
  124 | 
  125 |       // Assert
  126 |       await expect(page).toHaveURL(/.*index.html/);
  127 |       await loginPage.verifyPageLoaded();
  128 |       
  129 |       // Verify cannot access inventory directly
  130 |       await page.goto('/inventory.html');
  131 |       await expect(page).toHaveURL(/.*index.html/);
  132 |     });
  133 | 
  134 |     test('AUTH-06: Access protected page without login @P1', async ({ 
  135 |       loginPage, 
  136 |       page 
  137 |     }) => {
  138 |       // Test ID: AUTH-06
  139 |       // Priority: P1
  140 |       // Steps: 1. Navigate directly to /inventory.html, 2. Verify page
  141 |       // Expected: Redirected to login with error message
  142 | 
  143 |       // Act
  144 |       const redirected = await loginPage.testDirectAccessToProtectedPage('/inventory.html');
  145 | 
  146 |       // Assert
  147 |       expect(redirected).toBe(true);
  148 |       await loginPage.verifyPageLoaded();
  149 |       
  150 |       // Verify error message about authentication
  151 |       if (await loginPage.isErrorMessageDisplayed()) {
  152 |         const errorText = await loginPage.getErrorMessageText();
  153 |         expect(errorText).toContain('You can only access');
  154 |       }
  155 |     });
  156 |   });
  157 | 
  158 |   test.describe('Additional Authentication Tests', () => {
  159 |     test('Login with empty credentials', async ({ loginPage }) => {
  160 |       // Test empty username
  161 |       await loginPage.attemptInvalidLogin('', 'secret_sauce');
  162 |       await expect(loginPage.errorMessage).toBeVisible();
  163 |       const errorText1 = await loginPage.getErrorMessageText();
  164 |       expect(errorText1).toContain('Username is required');
  165 | 
  166 |       // Clear and test empty password
  167 |       await loginPage.clearForm();
  168 |       await loginPage.attemptInvalidLogin('standard_user', '');
  169 |       await expect(loginPage.errorMessage).toBeVisible();
  170 |       const errorText2 = await loginPage.getErrorMessageText();
  171 |       expect(errorText2).toContain('Password is required');
  172 |     });
  173 | 
  174 |     test('Login with problem_user account', async ({ 
  175 |       loginPage, 
  176 |       page,
  177 |       testCredentials 
  178 |     }) => {
  179 |       // This user has known issues but should still login
```