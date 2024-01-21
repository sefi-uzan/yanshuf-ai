import { Locator, Page } from "@playwright/test";

export class MobileMenu {
  public readonly pricing: Locator;
  public readonly signIn: Locator;
  public readonly getStarted: Locator;

  constructor(locator: Locator) {
    this.pricing = locator.getByRole("menuitem").nth(0);
    this.signIn = locator.getByRole("menuitem").nth(1);
    this.getStarted = locator.getByRole("menuitem").nth(2);
  }
}
