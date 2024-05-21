import { Locator } from "@playwright/test";

export class Item {
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly addButton: Locator;

  constructor(item: Locator) {
    this.image = item.locator("img.inventory_item_img");
    this.name = item.locator('[data-test="inventory-item-name"]');
    this.description = item.locator('[data-test="inventory-item-desc"]');
    this.price = item.locator('[data-test="inventory-item-price"]');
    this.addButton = item.locator(
      '[data-test*="add-to-cart"], [data-test*="remove"]'
    );
  }

  async isItemInfoVisible() {
    return (
      (await this.image.isVisible()) &&
      (await this.name.isVisible()) &&
      (await this.description.isVisible()) &&
      (await this.price.isVisible())
    );
  }
}
