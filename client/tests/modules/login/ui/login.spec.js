const { test, expect } = require('@playwright/test');
const LoginPage = require('../../../page-objects/LoginPage');

test.describe('Login Page UI Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display login form', async () => {
    await loginPage.verifyLoginPage();
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@email.com', 'wrongpassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid email or password');
  });

  test('should navigate to signup page', async () => {
    await loginPage.switchToSignup();
    await expect(loginPage.submitButton).toHaveText('Sign Up');
  });

  test('should login successfully with valid credentials', async () => {
    await loginPage.login('test@example.com', 'password123');
    await expect(loginPage.page.locator('h2')).toContainText('Welcome');
  });
}); 