import { Locator, Page } from "@playwright/test";

export class UserMenu {
  public readonly name: Locator;
  public readonly email: Locator;
  public readonly dashboard: Locator;
  public readonly settings: Locator;
  public readonly subscription: Locator;
  public readonly upgrade: Locator;
  public readonly signOut: Locator;

  constructor(locator: Locator) {
    this.name = locator.locator("div > div > p").nth(0);
    this.email = locator.locator("div > div > p").nth(1);
    this.dashboard = locator.getByRole("menuitem").nth(0);
    this.settings = locator.getByRole("menuitem").nth(1);
    this.subscription = locator.getByRole("menuitem").nth(2);
    this.upgrade = locator.getByRole("menuitem").nth(2);
    this.signOut = locator.getByRole("menuitem").nth(3);
  }
}
