# Dark/Light Mode Theme Switching - Automated Tests

This directory contains automated tests for the Dark/Light Mode Theme Switching feature, based on the requirements in `issues/dark-mode-feature.md` and test plan in `issues/dark-mode-test-plan.md`.

## Test Structure

### Page Object Model (POM) Architecture

```
pw/
├── pages/
│   ├── BasePage.ts                    # Base class with common functionality
│   ├── LoginPage.ts                   # Login page POM
│   ├── DashboardPage.ts               # Dashboard page POM  
│   ├── SettingsPage.ts                # Settings page POM
│   ├── components/
│   │   └── ThemeToggle.ts             # Theme toggle component POM
│   └── fixtures/
│       └── theme.fixtures.ts          # Custom test fixtures
└── tests/
    └── theme/
        ├── acceptance-criteria.spec.ts  # P0 acceptance criteria tests
        ├── ui-ux-requirements.spec.ts   # UI/UX requirements tests
        ├── technical-requirements.spec.ts # Technical requirements tests
        ├── example-with-fixtures.spec.ts # Example tests using fixtures
        └── README.md                   # This file
```

### Test Coverage

The tests cover all requirements from the test plan:

#### Acceptance Criteria (P0)
- **TC-AC-01**: System theme detection on first visit
- **TC-AC-02**: Theme toggle functionality with smooth transition
- **TC-AC-03**: Theme persistence across page reload and browser restart
- **TC-AC-04**: OS theme sync in Auto mode
- **TC-AC-05**: Complete UI rendering in both themes

#### UI/UX Requirements
- **TC-UI-01**: Toggle placement in both header and settings
- **TC-UI-02**: Theme transition smoothness (200-300ms)
- **TC-UI-03**: Design system compliance with CSS custom properties
- **TC-UI-04**: WCAG 2.1 AA compliance for contrast ratios
- **TC-UI-05**: Dark mode uses soft grays, not pure black

#### Technical Requirements
- **TC-TECH-01**: CSS custom properties implementation
- **TC-TECH-02**: Persistence mechanisms (localStorage/API)
- **TC-TECH-03**: matchMedia listener for OS theme changes
- **TC-TECH-04**: Cross-browser compatibility
- **TC-TECH-05**: No page reload on theme switch
- **TC-TECH-06**: Color-scheme meta tag implementation

## Running Tests

### Prerequisites
- Node.js and npm installed
- Playwright installed (`npm install` in `pw/` directory)
- Application running at the base URL configured in `playwright.config.ts`

### Running All Theme Tests
```bash
cd pw
npx playwright test tests/theme/
```

### Running Specific Test Suites
```bash
# Run only acceptance criteria tests
npx playwright test tests/theme/acceptance-criteria.spec.ts

# Run UI/UX requirements tests
npx playwright test tests/theme/ui-ux-requirements.spec.ts

# Run technical requirements tests  
npx playwright test tests/theme/technical-requirements.spec.ts

# Run with specific browser
npx playwright test tests/theme/ --project=chromium
```

### Running with UI Mode
```bash
npx playwright test tests/theme/ --ui
```

### Running in CI Mode
```bash
npx playwright test tests/theme/ --headed --reporter=line
```

## Test Fixtures

Custom fixtures are available in `theme.fixtures.ts`:

```typescript
import { test } from '../../pages/fixtures/theme.fixtures';

test('Example using fixtures', async ({ 
  loginPage, 
  dashboardPage, 
  settingsPage, 
  themeToggle,
  pageWithCleanStorage 
}) => {
  // Test implementation
});
```

### Available Fixtures
- `loginPage`: LoginPage instance
- `dashboardPage`: DashboardPage instance  
- `settingsPage`: SettingsPage instance
- `themeToggle`: ThemeToggle component instance
- `pageWithCleanStorage`: Page with cleared localStorage and cookies

### Helper Functions
- `setupTestWithTheme()`: Set up test with specific theme
- `testThemeAcrossPages()`: Test theme consistency across all pages
- `testThemePersistence()`: Test theme persistence scenarios
- `measureThemeTransition()`: Measure transition performance

## Page Objects

### BasePage
Common functionality for all page objects:
- Navigation and waiting utilities
- Theme detection methods (`isDarkThemeApplied()`, `getCurrentTheme()`)
- LocalStorage utilities
- Screenshot capture

### ThemeToggle Component
Component-specific interactions:
- `toggleThemeViaHeader()`: Toggle theme via header button
- `setTheme()`: Set theme to specific mode (light/dark/auto)
- `verifyHeaderTogglePresent()`: Check toggle visibility
- `getThemeTransitionDuration()`: Measure transition time
- Accessibility testing methods

### Page Objects
- **LoginPage**: Login form interactions and theme verification
- **DashboardPage**: Dashboard UI components and theme consistency checks
- **SettingsPage**: Settings page interactions and theme configuration

## Test Design Principles

### 1. Reliability First
- Use explicit waits (`locator.waitFor()`, `expect(locator).toBeVisible()`)
- No hardcoded timeouts (`page.waitForTimeout()`)
- Proper error handling and cleanup

### 2. Maintainability
- Page Object Model pattern
- Reusable helper functions
- Clear separation of concerns
- TypeScript for type safety

### 3. Observability
- Detailed test annotations
- Screenshots on failure
- Console logging for debugging
- Trace recording for CI failures

### 4. CI/CD Readiness
- Headless execution support
- Parallel test execution
- Proper test isolation
- Environment configuration

## Customizing Tests for Your Application

### 1. Update Locators
The POM classes use flexible locator strategies. Update selectors in:
- `BasePage.ts`: Theme detection methods
- `ThemeToggle.ts`: Toggle element selectors  
- Page objects: Application-specific elements

### 2. Configure Base URL
Update `baseURL` in `playwright.config.ts`:
```typescript
use: {
  baseURL: 'https://your-application.com/',
}
```

### 3. Adjust Test Data
Modify test data in spec files:
- User credentials (if testing authenticated flows)
- Theme-specific test scenarios
- Browser/device configurations

### 4. Extend Functionality
Add custom methods to page objects for:
- Application-specific theme indicators
- Custom theme configurations
- Third-party component testing

## Troubleshooting

### Common Issues

#### 1. Locators Not Found
- Update selectors in POM classes
- Use `data-testid` attributes for stable selectors
- Check if elements are in shadow DOM

#### 2. Theme Detection Fails
- Update `isDarkThemeApplied()` method in `BasePage.ts`
- Add application-specific theme indicators
- Check CSS variable naming conventions

#### 3. Tests Flaky in CI
- Increase timeouts in `playwright.config.ts`
- Use `trace: 'on-first-retry'` for debugging
- Ensure proper test isolation

#### 4. Cross-Browser Issues
- Test with all configured browsers
- Check browser-specific CSS/JavaScript support
- Update browser compatibility checks

## Integration with CI/CD

### Sample GitHub Actions Workflow
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd pw && npm ci
      - run: cd pw && npx playwright install
      - run: cd pw && npx playwright test tests/theme/ --reporter=html
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: pw/playwright-report/
```

### Test Reports
- HTML report: `npx playwright show-report`
- Allure report: Configured in `playwright.config.ts`
- JUnit XML: For CI integration

## Maintenance

### Regular Updates
- Update Playwright and dependencies
- Review and update locators after UI changes
- Add tests for new theme-related features

### Test Review
- Review test failures for flakiness
- Update tests for changed requirements
- Remove obsolete tests

### Performance Optimization
- Use parallel execution (`workers` in config)
- Implement test sharding for large suites
- Use selective test runs for PR validation

## Related Documentation
- [Feature Requirements](issues/dark-mode-feature.md)
- [Test Plan](issues/dark-mode-test-plan.md)
- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)