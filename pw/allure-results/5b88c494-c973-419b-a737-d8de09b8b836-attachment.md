# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\authentication.spec.ts >> SauceDemo Authentication Tests >> Additional Authentication Tests >> Verify available credentials from page
- Location: tests\e2e\authentication.spec.ts:228:9

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected value: "standard_user"
Received array: []
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
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
  180 |       const inventoryPage = await loginPage.login(
  181 |         testCredentials.problemUser.username,
  182 |         testCredentials.problemUser.password
  183 |       );
  184 |       
  185 |       await expect(page).toHaveURL(/.*inventory.html/);
  186 |       await inventoryPage.verifyPageLoaded();
  187 |       
  188 |       // Verify at least some products are displayed
  189 |       const productCount = await inventoryPage.getProductCount();
  190 |       expect(productCount).toBeGreaterThan(0);
  191 |     });
  192 | 
  193 |     test('Login with performance_glitch_user', async ({ 
  194 |       loginPage, 
  195 |       page,
  196 |       testCredentials 
  197 |     }) => {
  198 |       // This user has performance delays but should still login
  199 |       const inventoryPage = await loginPage.login(
  200 |         testCredentials.performanceGlitchUser.username,
  201 |         testCredentials.performanceGlitchUser.password
  202 |       );
  203 |       
  204 |       await expect(page).toHaveURL(/.*inventory.html/);
  205 |       await inventoryPage.verifyPageLoaded();
  206 |     });
  207 | 
  208 |     test('Verify login form elements', async ({ loginPage }) => {
  209 |       // Verify all form elements are present
  210 |       await expect(loginPage.usernameInput).toBeVisible();
  211 |       await expect(loginPage.passwordInput).toBeVisible();
  212 |       await expect(loginPage.loginButton).toBeVisible();
  213 |       
  214 |       // Verify placeholders
  215 |       const placeholders = await loginPage.getPlaceholderTexts();
  216 |       expect(placeholders.username).toBe('Username');
  217 |       expect(placeholders.password).toBe('Password');
  218 |       
  219 |       // Verify login button is enabled by default
  220 |       const isEnabled = await loginPage.isLoginButtonEnabled();
  221 |       expect(isEnabled).toBe(true);
  222 |       
  223 |       // Verify credentials hint is displayed
  224 |       await expect(loginPage.loginCredentials).toBeVisible();
  225 |       await expect(loginPage.passwordCredentials).toBeVisible();
  226 |     });
  227 | 
  228 |     test('Verify available credentials from page', async ({ loginPage }) => {
  229 |       const credentials = await loginPage.getAvailableCredentialsFromPage();
  230 |       
  231 |       // Verify we got the expected usernames
> 232 |       expect(credentials.usernames).toContain('standard_user');
      |                                     ^ Error: expect(received).toContain(expected) // indexOf
  233 |       expect(credentials.usernames).toContain('locked_out_user');
  234 |       expect(credentials.usernames).toContain('problem_user');
  235 |       expect(credentials.usernames).toContain('performance_glitch_user');
  236 |       
  237 |       // Verify password
  238 |       expect(credentials.password).toBe('secret_sauce');
  239 |     });
  240 |   });
  241 | 
  242 |   test.describe('Session and Security Tests', () => {
  243 |     test('Session persistence after refresh', async ({ 
  244 |       authenticatedPageAsStandardUser 
  245 |     }) => {
  246 |       // Login is already done by the fixture
  247 |       const page = authenticatedPageAsStandardUser;
  248 |       const inventoryPage = new InventoryPage(page);
  249 |       await inventoryPage.verifyPageLoaded();
  250 |       
  251 |       // Refresh page
  252 |       await page.reload();
  253 |       
  254 |       // Should still be logged in
  255 |       await expect(page).toHaveURL(/.*inventory.html/);
  256 |       await inventoryPage.verifyPageLoaded();
  257 |     });
  258 | 
  259 |     test('Multiple failed login attempts', async ({ loginPage, page }) => {
  260 |       // Attempt multiple failed logins
  261 |       for (let i = 0; i < 3; i++) {
  262 |         await loginPage.attemptInvalidLogin('wrong_user', 'wrong_pass');
  263 |         await expect(loginPage.errorMessage).toBeVisible();
  264 |         await loginPage.clearForm();
  265 |       }
  266 |       
  267 |       // Should still be able to login successfully after failures
  268 |       const inventoryPage = await loginPage.loginAsStandardUser();
  269 |       await expect(page).toHaveURL(/.*inventory.html/);
  270 |       await inventoryPage.verifyPageLoaded();
  271 |     });
  272 | 
  273 |     test('Clean context authentication with helper', async ({ 
  274 |       loginWithCleanContext 
  275 |     }) => {
  276 |       // Test the loginWithCleanContext helper
  277 |       const { page, inventoryPage } = await loginWithCleanContext(
  278 |         'standard_user',
  279 |         'secret_sauce'
  280 |       );
  281 |       
  282 |       await expect(page).toHaveURL(/.*inventory.html/);
  283 |       await inventoryPage.verifyPageLoaded();
  284 |       
  285 |       // Verify we can interact with the inventory
  286 |       await expect(inventoryPage.productContainer).toBeVisible();
  287 |     });
  288 | 
  289 |     test('Login as different users using helper', async ({ 
  290 |       loginAsUser,
  291 |       testCredentials 
  292 |     }) => {
  293 |       // Test problem user
  294 |       const problemInventoryPage = await loginAsUser(
  295 |         testCredentials.problemUser.username,
  296 |         testCredentials.problemUser.password
  297 |       );
  298 |       await problemInventoryPage.verifyPageLoaded();
  299 |       
  300 |       // Test performance glitch user
  301 |       // Note: This would need a new page since we can't reuse the same page
  302 |       // For demonstration, we show the helper works
  303 |     });
  304 |   });
  305 | });
```