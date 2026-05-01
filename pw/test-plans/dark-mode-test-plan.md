# 🧪 Dark/Light Mode Theme Switching - Test Plan

**📋 Document Version:** 1.0  
**📅 Created:** 2026-04-28  
**👤 QA Engineer:** Senior QA Engineer  
**📊 Status:** Draft  
**🔗 Related Issue:** [FE] Implement Dark/Light Mode Theme Switching (issues/dark-mode-feature.md)

---

## 📋 Test Plan Overview

### 🎯 Objective
Verify that the dark/light mode theme switching functionality works correctly according to all acceptance criteria, UI/UX requirements, and technical specifications.

### 🎯 Scope
- Theme toggle functionality in Settings and Header/Sidebar
- System theme detection and synchronization
- Theme persistence across sessions
- Visual rendering and accessibility compliance
- Cross-browser and cross-device compatibility

### 🎯 Out of Scope
- Backend API implementation (unless required for authenticated user preferences)
- Third-party library theme overrides (covered in separate audit)
- Performance benchmarking (beyond transition timing requirements)

### 🎯 Test Environment
- **Browsers:** Chrome, Safari, Firefox, Edge (latest versions)
- **Devices:** Desktop, Tablet, Mobile (iOS Safari, Android Chrome)
- **OS:** Windows 11, macOS, iOS, Android
- **Test Data:** Guest users, authenticated users

### 🎯 Entry Criteria
- Feature implementation complete
- Design tokens/CSS variables updated
- Figma designs approved
- Development environment accessible

### 🎯 Exit Criteria
- All P0 test cases passed
- No critical or blocker defects open
- Accessibility compliance verified
- Cross-browser compatibility confirmed

---

## 🧪 Test Cases

### 📋 Acceptance Criteria Test Cases

#### **AC-1: System Theme Detection (First Visit)**
| Test ID | TC-AC-01 |
|---------|----------|
| **Description** | Verify system theme is applied automatically on first visit when no theme is explicitly set |
| **Preconditions** | User opens app for the first time (no localStorage theme preference) |
| **Test Steps** | 1. Set OS theme to Light Mode<br>2. Clear browser localStorage<br>3. Open application in new incognito/private window<br>4. Observe applied theme |
| **Expected Result** | Application uses light theme matching OS preference |
| **Priority** | P0 |
| **Test Data** | OS theme: Light, Dark, Auto |

#### **AC-2: Theme Toggle Functionality**
| Test ID | TC-AC-02 |
|---------|----------|
| **Description** | Verify theme toggle switches UI palette instantly with smooth transition |
| **Preconditions** | User is on any page with theme toggle accessible |
| **Test Steps** | 1. Navigate to Settings → Appearance or click header toggle<br>2. Click theme toggle<br>3. Observe theme change<br>4. Measure transition duration |
| **Expected Result** | UI switches theme instantly (≤300ms transition), no flickering |
| **Priority** | P0 |
| **Test Data** | Current theme: Light → Dark, Dark → Light |

#### **AC-3: Theme Persistence**
| Test ID | TC-AC-03 |
|---------|----------|
| **Description** | Verify last user-selected theme is restored after page reload or return |
| **Preconditions** | User has manually changed theme |
| **Test Steps** | 1. Manually switch theme (e.g., to Dark)<br>2. Reload page (F5/Ctrl+R)<br>3. Navigate away and return to app<br>4. Close and reopen browser |
| **Expected Result** | Previously selected theme is preserved and applied |
| **Priority** | P0 |
| **Test Data** | Themes: Light, Dark, Auto |

#### **AC-4: OS Theme Sync (Auto Mode)**
| Test ID | TC-AC-04 |
|---------|----------|
| **Description** | Verify app syncs automatically with OS theme changes in real-time when in Auto mode |
| **Preconditions** | App theme is set to "Auto" |
| **Test Steps** | 1. Set app theme to Auto<br>2. Change OS theme from Light to Dark<br>3. Observe app theme change<br>4. Change OS theme back to Light |
| **Expected Result** | App theme updates automatically within 1 second of OS change |
| **Priority** | P0 |
| **Test Data** | OS theme transitions: Light→Dark, Dark→Light |

#### **AC-5: Complete UI Rendering**
| Test ID | TC-AC-05 |
|---------|----------|
| **Description** | Verify all UI elements render correctly in both themes |
| **Preconditions** | User navigates through key application screens |
| **Test Steps** | 1. Switch to Light theme<br>2. Navigate through all major screens<br>3. Switch to Dark theme<br>4. Repeat navigation<br>5. Check for visual artifacts |
| **Expected Result** | All UI elements display correctly, no broken layouts, colors apply consistently |
| **Priority** | P0 |
| **Test Data** | Screens: Dashboard, Data tables, Modals, Toasts, Charts, Forms |

---

### 🎨 UI/UX Requirements Test Cases

#### **UI-1: Toggle Placement & Design**
| Test ID | TC-UI-01 |
|---------|----------|
| **Description** | Verify theme toggle is present in both Settings and Header/Sidebar |
| **Preconditions** | User is logged in |
| **Test Steps** | 1. Navigate to Settings → Appearance<br>2. Verify toggle presence<br>3. Return to main view<br>4. Check header/sidebar for toggle icon |
| **Expected Result** | Toggle accessible in both locations, icon clearly indicates current theme |
| **Priority** | P1 |

#### **UI-2: Transition Smoothness**
| Test ID | TC-UI-02 |
|---------|----------|
| **Description** | Verify theme transition uses 200-300ms smooth animation |
| **Preconditions** | Developer tools open (Performance/Animation inspection) |
| **Test Steps** | 1. Open browser DevTools<br>2. Switch theme<br>3. Record performance<br>4. Measure transition duration |
| **Expected Result** | Transition duration 200-300ms for background-color, color, border-color |
| **Priority** | P1 |

#### **UI-3: Design System Compliance**
| Test ID | TC-UI-03 |
|---------|----------|
| **Description** | Verify theme uses updated design system tokens |
| **Preconditions** | Access to design token documentation |
| **Test Steps** | 1. Inspect CSS variables on page<br>2. Compare with design token specifications<br>3. Verify token naming convention |
| **Expected Result** | All colors use CSS Custom Properties, naming follows design system |
| **Priority** | P1 |

#### **UI-4: WCAG 2.1 AA Compliance**
| Test ID | TC-UI-04 |
|---------|----------|
| **Description** | Verify text and interactive elements meet accessibility contrast ratios |
| **Preconditions** | Accessibility testing tools available |
| **Test Steps** | 1. Run automated accessibility scan (Axe, Lighthouse)<br>2. Manually check contrast of key text elements<br>3. Verify focus ring visibility |
| **Expected Result** | All elements pass WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text) |
| **Priority** | P0 |

#### **UI-5: Dark Mode Color Palette**
| Test ID | TC-UI-05 |
|---------|----------|
| **Description** | Verify dark mode uses soft grays instead of pure black |
| **Preconditions** | Dark theme applied |
| **Test Steps** | 1. Apply dark theme<br>2. Inspect background colors<br>3. Check for #000000 usage |
| **Expected Result** | Background colors use #121212–#1E1E1E range, no pure black |
| **Priority** | P1 |

---

### ⚙️ Technical Requirements Test Cases

#### **TECH-1: CSS Custom Properties Implementation**
| Test ID | TC-TECH-01 |
|---------|------------|
| **Description** | Verify theme implemented via CSS Custom Properties |
| **Preconditions** | Developer tools open |
| **Test Steps** | 1. Inspect :root element<br>2. Check for data-theme attributes<br>3. Verify CSS variable definitions |
| **Expected Result** | Theme uses :root and [data-theme="dark"] with CSS variables |
| **Priority** | P1 |

#### **TECH-2: Persistence Mechanisms**
| Test ID | TC-TECH-02 |
|---------|------------|
| **Description** | Verify theme preference persistence for guest and authenticated users |
| **Preconditions** | Test as guest and authenticated user |
| **Test Steps** | 1. As guest: change theme, check localStorage<br>2. As authenticated: change theme, verify API call<br>3. Clear storage, verify fallback |
| **Expected Result** | Guest: localStorage, Authenticated: User Preferences API, proper fallback |
| **Priority** | P0 |

#### **TECH-3: matchMedia Listener**
| Test ID | TC-TECH-03 |
|---------|------------|
| **Description** | Verify window.matchMedia listener reacts to OS theme changes |
| **Preconditions** | App in Auto mode |
| **Test Steps** | 1. Mock matchMedia in test<br>2. Trigger OS theme change event<br>3. Verify listener callback execution |
| **Expected Result** | Listener properly detects and responds to prefers-color-scheme changes |
| **Priority** | P1 |

#### **TECH-4: Cross-Browser Compatibility**
| Test ID | TC-TECH-04 |
|---------|------------|
| **Description** | Verify theme works across all major browsers |
| **Preconditions** | Multiple browsers installed |
| **Test Steps** | 1. Test in Chrome, Safari, Firefox, Edge<br>2. Verify theme switching<br>3. Check CSS variable support |
| **Expected Result** | Consistent behavior across all browsers |
| **Priority** | P0 |

#### **TECH-5: No Page Reload**
| Test ID | TC-TECH-05 |
|---------|------------|
| **Description** | Verify theme switch doesn't cause full page reload |
| **Preconditions** | Network tab open in DevTools |
| **Test Steps** | 1. Monitor network requests<br>2. Switch theme<br>3. Check for page reload indicators |
| **Expected Result** | No network requests triggered, no page reload |
| **Priority** | P1 |

#### **TECH-6: Meta Tag Implementation**
| Test ID | TC-TECH-06 |
|---------|------------|
| **Description** | Verify <meta name="color-scheme"> tag present |
| **Preconditions** | View page source |
| **Test Steps** | 1. Inspect HTML head<br>2. Check for meta tag<br>3. Verify content attribute |
| **Expected Result** | `<meta name="color-scheme" content="light dark">` present |
| **Priority** | P1 |

---

### 🔍 Edge Cases & Special Scenarios

#### **EDGE-1: Rapid Toggle Switching**
| Test ID | TC-EDGE-01 |
|---------|------------|
| **Description** | Verify no issues with rapid theme switching |
| **Preconditions** | Theme toggle accessible |
| **Test Steps** | 1. Rapidly click toggle 10+ times<br>2. Check for race conditions<br>3. Verify final state correct |
| **Expected Result** | No flickering, correct final theme, no errors in console |
| **Priority** | P2 |

#### **EDGE-2: Incognito/Private Browsing**
| Test ID | TC-EDGE-02 |
|---------|------------|
| **Description** | Verify theme works in private browsing modes |
| **Preconditions** | Open incognito/private window |
| **Test Steps** | 1. Open app in private mode<br>2. Switch theme<br>3. Close and reopen private window |
| **Expected Result** | Theme functions normally, persistence works within session |
| **Priority** | P2 |

#### **EDGE-3: JavaScript Disabled**
| Test ID | TC-EDGE-03 |
|---------|------------|
| **Description** | Verify graceful degradation when JS disabled |
| **Preconditions** | JavaScript disabled in browser |
| **Test Steps** | 1. Disable JavaScript<br>2. Load app<br>3. Check default theme |
| **Expected Result** | App loads with system/default theme, toggle not functional (expected) |
| **Priority** | P3 |

#### **EDGE-4: Storage Quota Exceeded**
| Test ID | TC-EDGE-04 |
|---------|------------|
| **Description** | Verify graceful handling when localStorage full |
| **Preconditions** | Simulate full localStorage |
| **Test Steps** | 1. Fill localStorage to quota<br>2. Attempt to save theme preference<br>3. Check error handling |
| **Expected Result** | Graceful error handling, no app crash, theme resets to default on next load |
| **Priority** | P3 |

#### **EDGE-5: Multiple Tabs**
| Test ID | TC-EDGE-05 |
|---------|------------|
| **Description** | Verify theme consistency across multiple tabs |
| **Preconditions** | App open in multiple tabs |
| **Test Steps** | 1. Open app in two tabs<br>2. Change theme in tab 1<br>3. Check tab 2<br>4. Change theme in tab 2 |
| **Expected Result** | Tabs sync theme changes (or maintain independence based on design) |
| **Priority** | P2 |

---

### 📱 Mobile & Responsive Testing

#### **MOBILE-1: Mobile Browser Compatibility**
| Test ID | TC-MOBILE-01 |
|---------|--------------|
| **Description** | Verify theme works on mobile browsers |
| **Preconditions** | iOS Safari and Android Chrome available |
| **Test Steps** | 1. Test on iOS Safari<br>2. Test on Android Chrome<br>3. Verify toggle touch interaction<br>4. Check viewport rendering |
| **Expected Result** | Theme functions correctly on mobile, touch targets appropriate size |
| **Priority** | P1 |

#### **MOBILE-2: Mobile OS Theme Sync**
| Test ID | TC-MOBILE-02 |
|---------|--------------|
| **Description** | Verify app syncs with mobile OS theme changes |
| **Preconditions** | Mobile device with theme settings |
| **Test Steps** | 1. Set app to Auto mode<br>2. Change device theme (Light/Dark)<br>3. Verify app updates |
| **Expected Result** | App theme updates with device theme change |
| **Priority** | P1 |

#### **MOBILE-3: Touch Gestures**
| Test ID | TC-MOBILE-03 |
|---------|--------------|
| **Description** | Verify toggle works with touch gestures |
| **Preconditions** | Touch device |
| **Test Steps** | 1. Tap toggle<br>2. Swipe near toggle area<br>3. Test with different touch pressures |
| **Expected Result** | Toggle responds correctly to touch, no accidental triggers |
| **Priority** | P2 |

---

### 🎭 Accessibility Testing

#### **A11Y-1: Screen Reader Compatibility**
| Test ID | TC-A11Y-01 |
|---------|------------|
| **Description** | Verify theme toggle is accessible to screen readers |
| **Preconditions** | Screen reader enabled (NVDA, VoiceOver, JAWS) |
| **Test Steps** | 1. Navigate to toggle with screen reader<br>2. Verify aria-label/role<br>3. Check state announcements |
| **Expected Result** | Toggle properly announced, current state clear, keyboard operable |
| **Priority** | P0 |

#### **A11Y-2: Keyboard Navigation**
| Test ID | TC-A11Y-02 |
|---------|------------|
| **Description** | Verify theme toggle accessible via keyboard |
| **Preconditions** | Keyboard only navigation |
| **Test Steps** | 1. Tab to toggle<br>2. Press Enter/Space<br>3. Verify theme changes<br>4. Check focus visibility |
| **Expected Result** | Toggle focusable, operable with keyboard, focus ring visible in both themes |
| **Priority** | P0 |

#### **A11Y-3: Reduced Motion Preference**
| Test ID | TC-A11Y-03 |
|---------|------------|
| **Description** | Verify reduced motion preference respected |
| **Preconditions** | OS reduced motion setting enabled |
| **Test Steps** | 1. Enable reduced motion in OS<br>2. Switch theme<br>3. Observe transitions |
| **Expected Result** | Transitions reduced or eliminated per prefers-reduced-motion |
| **Priority** | P2 |

---

### 🖼️ Visual Regression Testing

#### **VISUAL-1: Screenshot Comparison**
| Test ID | TC-VISUAL-01 |
|---------|--------------|
| **Description** | Verify no visual regressions in either theme |
| **Preconditions** | Visual testing tool configured (Storybook/Loki/Chromatic) |
| **Test Steps** | 1. Capture baseline screenshots<br>2. Make code changes<br>3. Compare new screenshots<br>4. Review diffs |
| **Expected Result** | No unintended visual changes, only expected theme differences |
| **Priority** | P1 |

#### **VISUAL-2: Image/Icon Legibility**
| Test ID | TC-VISUAL-02 |
|---------|--------------|
| **Description** | Verify images/icons remain legible in dark mode |
| **Preconditions** | App with various images/icons |
| **Test Steps** | 1. Switch to dark theme<br>2. Check all images<br>3. Verify icons visible<br>4. Test inverted assets |
| **Expected Result** | All images/icons clearly visible, proper contrast maintained |
| **Priority** | P1 |

---

## 📊 Test Execution Strategy

### 🧪 Test Types
- **Manual Testing:** 70% (UI/UX, visual verification, accessibility)
- **Automated Testing:** 30% (unit tests, integration tests, visual regression)
- **Exploratory Testing:** 10% (ad-hoc testing for edge cases)

### 🔄 Test Cycles
1. **Smoke Test:** P0 test cases on main browsers
2. **Functional Test:** All test cases across browsers
3. **Regression Test:** After bug fixes
4. **Acceptance Test:** With product owner

### 📈 Success Metrics
- Test case pass rate: ≥95%
- Critical defects: 0
- Accessibility compliance: WCAG 2.1 AA
- Performance: Transition ≤300ms

---

## 🐛 Defect Reporting Template

```markdown
**Title:** [Theme] Brief description of issue

**Environment:**
- Browser: Chrome 120.0
- OS: Windows 11
- Device: Desktop
- Theme: Dark/Light/Auto

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Severity:** Critical/Major/Minor/Cosmetic

**Priority:** P0/P1/P2/P3

**Screenshots/Logs:**

**Additional Context:**
```

---

## 📋 Traceability Matrix

| Requirement | Test Cases | Status |
|-------------|------------|--------|
| AC-1 | TC-AC-01 | Not Started |
| AC-2 | TC-AC-02 | Not Started |
| AC-3 | TC-AC-03 | Not Started |
| AC-4 | TC-AC-04 | Not Started |
| AC-5 | TC-AC-05 | Not Started |
| UI/UX Requirements | TC-UI-01 to TC-UI-05 | Not Started |
| Technical Requirements | TC-TECH-01 to TC-TECH-06 | Not Started |
| Edge Cases | TC-EDGE-01 to TC-EDGE-05 | Not Started |
| Mobile Testing | TC-MOBILE-01 to TC-MOBILE-03 | Not Started |
| Accessibility | TC-A11Y-01 to TC-A11Y-03 | Not Started |
| Visual Testing | TC-VISUAL-01 to TC-VISUAL-02 | Not Started |

---

## 🚦 Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Browser compatibility issues | Medium | High | Early testing on all target browsers |
| Accessibility non-compliance | Medium | High | Early a11y audit, automated scanning |
| Performance degradation | Low | Medium | Performance testing during development |
| Theme persistence failures | Low | High | Comprehensive storage testing |
| Visual inconsistencies | High | Medium | Visual regression testing pipeline |

---

## 📝 Notes & Dependencies

### 🔗 Dependencies
- Figma designs for light/dark palettes (approved)
- Updated Design Tokens/CSS Variables
- Backend PATCH /api/users/preferences endpoint (for authenticated sync)
- QA sign-off required before merge

### 💡 Testing Tools
- **Automated:** Playwright/Cypress for E2E, Jest for unit tests
- **Visual:** Storybook + Chromatic/Loki
- **Accessibility:** Axe, Lighthouse, WAVE
- **Performance:** Chrome DevTools, Lighthouse
- **Cross-browser:** BrowserStack/Local testing

### 📅 Estimated Effort
- Test planning: 2 hours
- Test case creation: 4 hours  
- Test execution: 8 hours
- Bug verification: 4 hours
- Reporting: 2 hours
- **Total:** 20 hours

---

## ✅ Sign-off

**QA Engineer:** ___________________________  
**Date:** ___________________________  

**Product Owner:** ___________________________  
**Date:** ___________________________  

**Development Lead:** ___________________________  
**Date:** ___________________________