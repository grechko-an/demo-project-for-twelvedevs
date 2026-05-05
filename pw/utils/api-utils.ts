import { APIRequestContext, expect } from '@playwright/test';

/**
 * API Test Utilities for SauceDemo
 * Note: SauceDemo is a static demo site with minimal backend APIs.
 * These utilities handle the observed analytics endpoints and provide
 * structure for potential hidden APIs.
 */

export interface ApiResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

export interface AnalyticsEvent {
  event_name: string;
  event_value?: string | number;
  timestamp?: number;
  user_agent?: string;
  page_url?: string;
}

export class SauceDemoApiUtils {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string = 'https://www.saucedemo.com') {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * Send analytics event to Backtrace.io
   * Observed endpoint: POST https://events.backtrace.io/api/unique-events/submit
   * Note: This is an external service that may be unavailable. Returns mock response on network errors.
   */
  async sendAnalyticsEvent(event: AnalyticsEvent): Promise<ApiResponse> {
    const url = 'https://events.backtrace.io/api/unique-events/submit';
    
    const payload = {
      event_name: event.event_name,
      event_value: event.event_value || '',
      timestamp: event.timestamp || Date.now(),
      user_agent: event.user_agent || 'Playwright Test',
      page_url: event.page_url || this.baseURL
    };

    try {
      const response = await this.request.post(url, {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Analytics API unavailable, returning mock response:', errorMessage);
      // Return mock response for demo purposes when service is unavailable
      return {
        status: 503, // Service Unavailable
        headers: { 'content-type': 'application/json' },
        body: {
          status: 'mock',
          message: 'Analytics service unavailable, using mock response for testing',
          original_error: errorMessage
        }
      };
    }
  }

  /**
   * Send summed analytics event
   * Observed endpoint: POST https://events.backtrace.io/api/summed-events/submit
   * Note: This is an external service that may be unavailable. Returns mock response on network errors.
   */
  async sendSummedAnalyticsEvent(events: AnalyticsEvent[]): Promise<ApiResponse> {
    const url = 'https://events.backtrace.io/api/summed-events/submit';
    
    const payload = {
      events: events.map(event => ({
        event_name: event.event_name,
        event_value: event.event_value || '',
        timestamp: event.timestamp || Date.now()
      }))
    };

    try {
      const response = await this.request.post(url, {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn('Summed Analytics API unavailable, returning mock response:', errorMessage);
      // Return mock response for demo purposes when service is unavailable
      return {
        status: 503, // Service Unavailable
        headers: { 'content-type': 'application/json' },
        body: {
          status: 'mock',
          message: 'Analytics service unavailable, using mock response for testing',
          original_error: errorMessage
        }
      };
    }
  }

  /**
   * Test potential login API (if exists)
   * Based on test plan assumption: POST /api/login
   */
  async testLoginAPI(username: string, password: string): Promise<ApiResponse> {
    const url = `${this.baseURL}/api/login`;
    
    const payload = {
      username,
      password
    };

    try {
      const response = await this.request.post(url, {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      // Expected if endpoint doesn't exist
      return {
        status: 404,
        headers: {},
        body: { error: 'Endpoint not found' }
      };
    }
  }

  /**
   * Test potential inventory API (if exists)
   * Based on test plan assumption: GET /api/inventory
   */
  async testInventoryAPI(): Promise<ApiResponse> {
    const url = `${this.baseURL}/api/inventory`;

    try {
      const response = await this.request.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      // Expected if endpoint doesn't exist
      return {
        status: 404,
        headers: {},
        body: { error: 'Endpoint not found' }
      };
    }
  }

  /**
   * Test potential cart API (if exists)
   * Based on test plan assumption: GET /api/cart
   */
  async testCartAPI(authToken?: string): Promise<ApiResponse> {
    const url = `${this.baseURL}/api/cart`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/json'
    };
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await this.request.get(url, { headers });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      // Expected if endpoint doesn't exist
      return {
        status: 404,
        headers: {},
        body: { error: 'Endpoint not found' }
      };
    }
  }

  /**
   * Test potential order API (if exists)
   * Based on test plan assumption: POST /api/order
   */
  async testOrderAPI(orderData: any, authToken?: string): Promise<ApiResponse> {
    const url = `${this.baseURL}/api/order`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await this.request.post(url, {
        data: orderData,
        headers
      });

      return {
        status: response.status(),
        headers: response.headers(),
        body: await response.json().catch(() => response.text())
      };
    } catch (error) {
      // Expected if endpoint doesn't exist
      return {
        status: 404,
        headers: {},
        body: { error: 'Endpoint not found' }
      };
    }
  }

  /**
   * Validate API response structure
   */
  validateApiResponse(response: ApiResponse, expectedStatus: number): void {
    expect(response.status).toBe(expectedStatus);
    
    if (expectedStatus >= 200 && expectedStatus < 300) {
      // Successful response should have content-type header
      const contentType = response.headers['content-type'] || response.headers['Content-Type'];
      if (contentType) {
        expect(contentType).toContain('application/json');
      }
    }
  }

  /**
   * Generate test order data
   */
  generateTestOrderData(): any {
    return {
      items: [
        {
          product_id: 1,
          quantity: 1,
          price: 29.99
        }
      ],
      customer: {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        zip_code: '12345'
      },
      payment: {
        method: 'credit_card',
        card_number: '**** **** **** 1234'
      }
    };
  }

  /**
   * Generate test analytics events
   */
  generateTestAnalyticsEvents(): AnalyticsEvent[] {
    return [
      {
        event_name: 'page_view',
        event_value: 'inventory',
        page_url: `${this.baseURL}/inventory.html`
      },
      {
        event_name: 'add_to_cart',
        event_value: 'sauce-backpack',
        page_url: `${this.baseURL}/inventory.html`
      },
      {
        event_name: 'checkout_start',
        page_url: `${this.baseURL}/checkout-step-one.html`
      }
    ];
  }

  /**
   * Wait for analytics events to be processed
   */
  async waitForAnalyticsProcessing(delayMs: number = 1000): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  /**
   * Extract authentication token from response
   */
  extractAuthToken(response: ApiResponse): string | null {
    if (response.status === 200 && response.body && response.body.token) {
      return response.body.token;
    }
    
    // Check headers for token
    const authHeader = response.headers['authorization'] || response.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    
    return null;
  }
}