const { expect } = require('@playwright/test');

class SignupPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.loginLink = page.locator('text=Login');
    this.messageText = page.locator('p');
  }

  async goto() {
    await this.page.goto('/');
    await this.switchToSignup();
  }

  async signup(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getSuccessMessage() {
    return this.messageText.textContent();
  }

  async switchToSignup() {
    const signupButton = this.page.locator('text=Sign Up').last();
    await signupButton.click();
  }

  async verifySignupPage() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toHaveText('Sign Up');
  }
}

module.exports = SignupPage; 