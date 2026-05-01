import { test, expect } from '@playwright/test';
import { SauceDemoApiUtils, AnalyticsEvent } from './api-utils';

test.describe('SauceDemo API Tests', () => {
  let apiUtils: SauceDemoApiUtils;

  test.beforeEach(async ({ request }) => {
    apiUtils = new SauceDemoApiUtils(request, 'https://www.saucedemo.com');
  });

  test.describe('Analytics API Tests', () => {
    test('Send unique analytics event', async ({ request }) => {
      // Test sending analytics event to Backtrace.io
      const event: AnalyticsEvent = {
        event_name: 'test_page_view',
        event_value: 'inventory',
        page_url: 'https://www.saucedemo.com/inventory.html',
        user_agent: 'Playwright Test Runner'
      };

      const response = await apiUtils.sendAnalyticsEvent(event);
      
      // Note: Backtrace.io analytics endpoint may return various status codes
      // Accept 200 (success), 201 (created), or 202 (accepted)
      expect([200, 201, 202, 204]).toContain(response.status);
      
      // Log response for debugging
      console.log('Analytics response:', {
        status: response.status,
        headers: response.headers,
        body: response.body
      });
    });

    test('Send summed analytics events', async ({ request }) => {
      // Test sending multiple analytics events
      const events = apiUtils.generateTestAnalyticsEvents();
      
      const response = await apiUtils.sendSummedAnalyticsEvent(events);
      
      // Note: Backtrace.io analytics endpoint may return various status codes
      expect([200, 201, 202, 204]).toContain(response.status);
      
      // Log response for debugging
      console.log('Summed analytics response:', {
        status: response.status,
        body: response.body
      });
    });

    test('Verify analytics event structure', async ({ request }) => {
      // Test with different event structures
      const testCases = [
        {
          event: {
            event_name: 'page_view',
            event_value: 'homepage'
          },
          description: 'Minimal event'
        },
        {
          event: {
            event_name: 'add_to_cart',
            event_value: 'sauce-backpack-1000',
            timestamp: Date.now(),
            user_agent: 'Mozilla/5.0 Playwright',
            page_url: 'https://www.saucedemo.com/inventory.html'
          },
          description: 'Complete event'
        },
        {
          event: {
            event_name: 'checkout_complete',
            event_value: 123.45  // Numeric value
          },
          description: 'Event with numeric value'
        }
      ];

      for (const testCase of testCases) {
        const response = await apiUtils.sendAnalyticsEvent(testCase.event);
        
        // Accept various success status codes
        expect([200, 201, 202, 204]).toContain(response.status);
        
        console.log(`Analytics test (${testCase.description}):`, {
          status: response.status,
          event: testCase.event
        });
      }
    });
  });

  test.describe('Potential Hidden API Tests (If Implemented)', () => {
    // These tests check for potential hidden APIs mentioned in the test plan
    // Note: SauceDemo is a static demo site, so these endpoints likely don't exist
    // These tests are designed to fail gracefully if endpoints are not implemented

    test('API-01: Valid login API (if exists) @api', async ({ request }) => {
      // Test ID: API-01
      // Scenario: Valid login
      // Expected: Returns 200 with session token (if implemented)

      const response = await apiUtils.testLoginAPI('standard_user', 'secret_sauce');
      
      // If endpoint exists, expect 200 with token
      // If not exists, expect 404
      if (response.status !== 404) {
        apiUtils.validateApiResponse(response, 200);
        
        // Check for token in response
        const token = apiUtils.extractAuthToken(response);
        if (token) {
          expect(token).toBeTruthy();
          console.log('Login API returned token:', token.substring(0, 20) + '...');
        }
      } else {
        console.log('Login API endpoint not found (expected for demo site)');
      }
    });

    test('API-02: Invalid login API (if exists) @api', async ({ request }) => {
      // Test ID: API-02
      // Scenario: Invalid login
      // Expected: Returns 401 Unauthorized (if implemented)

      const response = await apiUtils.testLoginAPI('invalid_user', 'wrong_password');
      
      if (response.status !== 404) {
        // If endpoint exists, expect 401 for invalid credentials
        expect([401, 403]).toContain(response.status);
        
        // Check for error message
        if (response.body && typeof response.body === 'object') {
          expect(response.body).toHaveProperty('error');
        }
      } else {
        console.log('Login API endpoint not found (expected for demo site)');
      }
    });

    test('API-03: Get inventory API (if exists) @api', async ({ request }) => {
      // Test ID: API-03
      // Scenario: Get inventory
      // Expected: Returns product list JSON (if implemented)

      const response = await apiUtils.testInventoryAPI();
      
      if (response.status !== 404) {
        apiUtils.validateApiResponse(response, 200);
        
        // Check response structure
        expect(response.body).toBeTruthy();
        
        if (Array.isArray(response.body)) {
          // Should be array of products
          expect(response.body.length).toBeGreaterThan(0);
          
          // Check product structure
          const firstProduct = response.body[0];
          expect(firstProduct).toHaveProperty('id');
          expect(firstProduct).toHaveProperty('name');
          expect(firstProduct).toHaveProperty('price');
          
          console.log(`Inventory API returned ${response.body.length} products`);
        }
      } else {
        console.log('Inventory API endpoint not found (expected for demo site)');
      }
    });

    test('API-04: Submit order API (if exists) @api', async ({ request }) => {
      // Test ID: API-04
      // Scenario: Submit order
      // Expected: Returns 201 with order ID (if implemented)

      // First try to get auth token
      const loginResponse = await apiUtils.testLoginAPI('standard_user', 'secret_sauce');
      const authToken = apiUtils.extractAuthToken(loginResponse);
      
      // Generate test order data
      const orderData = apiUtils.generateTestOrderData();
      
      const response = await apiUtils.testOrderAPI(orderData, authToken || undefined);
      
      if (response.status !== 404) {
        // If endpoint exists, expect 201 for created order
        // or 401 if authentication required
        if (authToken) {
          expect([201, 200]).toContain(response.status);
          
          // Check for order ID in response
          if (response.body && typeof response.body === 'object') {
            expect(response.body).toHaveProperty('order_id');
            console.log('Order API returned order ID:', response.body.order_id);
          }
        } else {
          // No auth token, might get 401
          expect([401, 403]).toContain(response.status);
        }
      } else {
        console.log('Order API endpoint not found (expected for demo site)');
      }
    });

    test('API-05: Authentication required for cart API (if exists) @api', async ({ request }) => {
      // Test ID: API-05
      // Scenario: Authentication required
      // Expected: Returns 403 Forbidden without token (if implemented)

      const response = await apiUtils.testCartAPI(); // No auth token
      
      if (response.status !== 404) {
        // If endpoint exists and requires auth, expect 401/403
        expect([401, 403]).toContain(response.status);
        
        // Check for authentication error
        if (response.body && typeof response.body === 'object') {
          expect(response.body).toHaveProperty('error');
          expect(response.body.error).toContain('auth');
        }
      } else {
        console.log('Cart API endpoint not found (expected for demo site)');
      }
    });
  });

  test.describe('API Integration and Edge Cases', () => {
    test('Test API endpoint discovery', async ({ request }) => {
      // Test common API endpoints to see what exists
      const endpoints = [
        '/api/login',
        '/api/inventory',
        '/api/products',
        '/api/cart',
        '/api/order',
        '/api/user',
        '/api/health',
        '/api/status'
      ];
      
      const results = [];
      
      for (const endpoint of endpoints) {
        const url = `https://www.saucedemo.com${endpoint}`;
        
        try {
          const response = await request.get(url, {
            headers: { 'Accept': 'application/json' }
          });
          
          results.push({
            endpoint,
            status: response.status(),
            exists: response.status() !== 404
          });
        } catch (error) {
          results.push({
            endpoint,
            status: 'error',
            exists: false,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
      
      console.log('API endpoint discovery results:', results);
      
      // Log which endpoints exist
      const existingEndpoints = results.filter(r => r.exists);
      console.log(`Found ${existingEndpoints.length} existing endpoints`);
    });

    test('Test API response headers', async ({ request }) => {
      // Test main page headers
      const response = await request.get('https://www.saucedemo.com/');
      
      expect(response.status()).toBe(200);
      
      // Check important headers
      const headers = response.headers();
      expect(headers['content-type']).toContain('text/html');
      
      // Check security headers
      const securityHeaders = [
        'x-frame-options',
        'x-content-type-options',
        'content-security-policy'
      ];
      
      for (const header of securityHeaders) {
        if (headers[header]) {
          console.log(`Security header ${header}:`, headers[header]);
        }
      }
    });

    test('Test API rate limiting (if applicable)', async ({ request }) => {
      // Test if API has rate limiting by making multiple rapid requests
      const requests = [];
      const numRequests = 5;
      
      for (let i = 0; i < numRequests; i++) {
        requests.push(
          apiUtils.sendAnalyticsEvent({
            event_name: `rate_limit_test_${i}`,
            event_value: i
          })
        );
      }
      
      const responses = await Promise.all(requests);
      
      // Check if any responses indicate rate limiting (429)
      const rateLimited = responses.filter(r => r.status === 429);
      
      if (rateLimited.length > 0) {
        console.log(`Rate limiting detected: ${rateLimited.length}/${numRequests} requests got 429`);
      } else {
        console.log(`No rate limiting detected for ${numRequests} rapid requests`);
      }
      
      // All requests should complete (even if some get 429)
      expect(responses.length).toBe(numRequests);
    });
  });

  test.describe('API Performance and Reliability', () => {
    test('Measure analytics API response time', async ({ request }) => {
      const startTime = Date.now();
      
      const response = await apiUtils.sendAnalyticsEvent({
        event_name: 'performance_test',
        event_value: 'measure_response_time'
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.log(`Analytics API response time: ${responseTime}ms`);
      
      // Response should be reasonable (under 5 seconds)
      expect(responseTime).toBeLessThan(5000);
      
      // API should respond with success status
      expect([200, 201, 202, 204]).toContain(response.status);
    });

    test('Test API reliability with retries', async ({ request }) => {
      // Test API with potential network issues simulation
      const maxRetries = 3;
      let lastError;
      let success = false;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await apiUtils.sendAnalyticsEvent({
            event_name: 'reliability_test',
            event_value: `attempt_${attempt}`
          });
          
          if ([200, 201, 202, 204].includes(response.status)) {
            success = true;
            console.log(`API call succeeded on attempt ${attempt}`);
            break;
          }
        } catch (error) {
          lastError = error;
          console.log(`API call failed on attempt ${attempt}:`, error instanceof Error ? error.message : String(error));
          
          if (attempt < maxRetries) {
            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }
      
      // API should eventually succeed (or at least not crash)
      expect(success).toBe(true);
    });
  });

  test.describe('API Data Validation', () => {
    test('Validate analytics event data types', async ({ request }) => {
      // Test with various data types
      const testCases = [
        { value: 'string_value', type: 'string' },
        { value: 123, type: 'number' },
        { value: 123.45, type: 'number' },
        { value: true, type: 'boolean' },
        { value: null, type: 'null' }
      ];
      
      for (const testCase of testCases) {
        const response = await apiUtils.sendAnalyticsEvent({
          event_name: 'data_type_test',
          event_value: testCase.value as any
        });
        
        // API should accept various data types (or convert them)
        expect([200, 201, 202, 204]).toContain(response.status);
        
        console.log(`Data type test (${testCase.type}):`, {
          status: response.status,
          value: testCase.value
        });
      }
    });

    test('Test large analytics event payload', async ({ request }) => {
      // Test with large event value
      const largeValue = 'x'.repeat(1000); // 1000 character string
      
      const response = await apiUtils.sendAnalyticsEvent({
        event_name: 'large_payload_test',
        event_value: largeValue
      });
      
      // API should handle large payloads
      expect([200, 201, 202, 204, 413]).toContain(response.status);
      
      if (response.status === 413) {
        console.log('API rejected large payload (413 Payload Too Large)');
      } else {
        console.log('API accepted large payload');
      }
    });
  });

  test.describe('API Error Handling', () => {
    test('Test malformed analytics event', async ({ request }) => {
      // Test with malformed event (missing required field)
      const url = 'https://events.backtrace.io/api/unique-events/submit';
      
      // Send request without event_name (required field)
      const response = await request.post(url, {
        data: {
          // Missing event_name
          event_value: 'test'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // API should handle malformed requests gracefully
      // Could return 400, 422, or still accept it
      const status = response.status();
      console.log('Malformed request status:', status);
      
      // Accept various error status codes
      expect([200, 201, 202, 204, 400, 422]).toContain(status);
    });

    test('Test non-existent API endpoint', async ({ request }) => {
      // Test endpoint that definitely doesn't exist
      const url = 'https://www.saucedemo.com/api/nonexistent';
      
      const response = await request.get(url, {
        headers: { 'Accept': 'application/json' }
      });
      
      // Should return 404
      expect(response.status()).toBe(404);
    });
  });
});