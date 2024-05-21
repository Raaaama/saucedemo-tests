import { Locator, Page } from "@playwright/test";
import { Item } from "./item";

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async isEveryItemInfoVisible() {
    const itemLocators = await this.items.all();
    const visibilityChecks = itemLocators.map(async (i) => {
      const item = new Item(i);
      return await item.isItemInfoVisible();
    });
    const results = await Promise.all(visibilityChecks);
    return results.every((isVisible) => isVisible);
  }

  async addItemToCart(itemIndex: number) {
    const itemLocators = await this.items.all();
    if (itemIndex < 0 || itemIndex >= itemLocators.length) {
      throw new Error(`Invalid itemIndex: ${itemIndex}`);
    }
    const item = new Item(itemLocators[itemIndex]);
    if ((await item.addButton.textContent()) === "Add to cart") {
      await item.addButton.click();
    }
  }

  async removeItemFromCart(itemIndex: number) {
    const itemLocators = await this.items.all();
    if (itemIndex < 0 || itemIndex >= itemLocators.length) {
      throw new Error(`Invalid itemIndex: ${itemIndex}`);
    }
    const item = new Item(itemLocators[itemIndex]);
    if ((await item.addButton.textContent()) === "Remove") {
      await item.addButton.click();
    }
  }

  async getCartCount() {
    const text = (await this.cartBadge.textContent()) || "0";
    return parseInt(text, 10);
  }

  async sortBy(option: string) {
    await this.page.selectOption(".product_sort_container", { value: option });
  }

  async getPrices() {
    const pricesStr = await this.items
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return pricesStr.map((s) => parseFloat(s.replace("$", "")));
  }

  async getNames() {
    return this.items
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();
  }
}
