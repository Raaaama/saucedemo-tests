import { test, expect } from "@playwright/test";
import { InventoryPage } from "./pageobjects/inventory";
import { LoginPage } from "./pageobjects/login";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.logIn("standard_user", "secret_sauce");
});

test("all items have all info fields displayed", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
  expect(await inventoryPage.isEveryItemInfoVisible()).toBeTruthy();
});
