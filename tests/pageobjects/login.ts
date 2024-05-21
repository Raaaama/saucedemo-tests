import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly logInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.logInButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async logIn(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.logInButton.click();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }
}
