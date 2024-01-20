import { Locator, Page } from "@playwright/test";
import { HomePage } from "./home-page";

export class Navbar {
  private readonly navbarLocator: Locator;
  public readonly navbarTitle: Locator;
  constructor(page: Page) {
    this.navbarLocator = page.locator("nav > div > div");
    this.navbarTitle = this.navbarLocator.locator("a");
  }
}
