import { test, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/login";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test("can login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logIn("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
});

test("can't login with invalid password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.logIn("standard_user", "asd");
  expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
  expect(page.url()).not.toContain("inventory.html");
});
