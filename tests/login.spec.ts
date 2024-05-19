import { test, expect } from "@playwright/test";

test("can login with valid cridentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("can't login with invalid password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("asd");
  await page.locator('[data-test="login-button"]').click();
  expect(page.locator('[data-test="error"]')).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(page.locator('[data-test="title"]')).not.toBeVisible();
  await expect(page).toHaveURL("https://www.saucedemo.com/");
});
