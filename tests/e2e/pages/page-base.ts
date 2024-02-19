import { Page } from "@playwright/test";
import { Navbar } from "./navbar";
import { HomePage } from "./home-page";

export class PageBase {
  public readonly navbar: Navbar;

  constructor(public readonly page: Page) {
    this.navbar = new Navbar(this.page);
  }

  public async close(): Promise<void> {
    console.log("Closing page...");
    await this.page.close();
  }
}
