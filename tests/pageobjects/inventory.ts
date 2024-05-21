import { Locator, Page } from "@playwright/test";
import { Item } from "./item";

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
  }

  async goto() {
    await this.page.goto("/inventory.html");
  }

  async isEveryItemInfoVisible() {
    const items = await this.items.all();
    const visibilityChecks = items.map(async (i) => {
      const item = new Item(i);
      return await item.isItemInfoVisible();
    });
    const results = await Promise.all(visibilityChecks);
    return results.every((isVisible) => isVisible);
  }
}
