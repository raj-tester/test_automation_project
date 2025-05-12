const { test, expect } = require('@playwright/test');
const APIHelper = require('../../../utils/api-helpers');

test.describe('Login API Tests', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request);
  });

  test('should login successfully with valid credentials', async () => {
    // First create a test user
    await apiHelper.signup('test@example.com', 'password123');
    
    const loginResponse = await apiHelper.login('test@example.com', 'password123');
    expect(loginResponse.ok()).toBeTruthy();
    expect(await loginResponse.json()).toHaveProperty('message', 'Login successful.');
  });

  test('should fail with invalid credentials', async () => {
    const loginResponse = await apiHelper.login('invalid@email.com', 'wrongpassword');
    expect(loginResponse.status()).toBe(401);
    expect(await loginResponse.json()).toHaveProperty('message', 'Invalid email or password.');
  });

  test('should get authenticated user details', async () => {
    // Login first
    await apiHelper.login('test@example.com', 'password123');
    
    const meResponse = await apiHelper.getMe();
    expect(meResponse.ok()).toBeTruthy();
    expect(await meResponse.json()).toHaveProperty('email', 'test@example.com');
  });

  test('should logout successfully', async () => {
    // Login first
    await apiHelper.login('test@example.com', 'password123');
    
    const logoutResponse = await apiHelper.logout();
    expect(logoutResponse.ok()).toBeTruthy();
    expect(await logoutResponse.json()).toHaveProperty('message', 'Logged out successfully.');

    // Verify logged out by checking /me endpoint
    const meResponse = await apiHelper.getMe();
    expect(meResponse.status()).toBe(401);
  });
}); 