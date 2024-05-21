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

test("number of items in cart label increases as items are being added", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.addItemToCart(1);
  expect(await inventoryPage.getCartCount()).toBe(2);
});

test("number of items in cart label decreases as items are being removed", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
  await inventoryPage.addItemToCart(0);
  await inventoryPage.addItemToCart(1);
  await inventoryPage.removeItemFromCart(0);
  expect(await inventoryPage.getCartCount()).toBe(1);
});

test("items are sorted by price in ascending order", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy("lohi");

  const prices = await inventoryPage.getPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);
});

test("items are sorted by name in alphabetical order", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy("az");

  const names = await inventoryPage.getNames();
  const sortedNames = [...names].sort();
  expect(names).toEqual(sortedNames);
});
