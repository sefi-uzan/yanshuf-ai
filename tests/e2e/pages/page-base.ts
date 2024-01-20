import { Page } from "@playwright/test";
import { Navbar } from "./home/navbar";
import { HomePage } from "./home/home-page";

export class PageBase {
  public readonly navbar: Navbar;

  constructor(public readonly page: Page) {
    this.navbar = new Navbar(this.page);
  }

  public async close(): Promise<void> {
    console.log("Closing page...");
    await this.page.close();
  }

  public async gotoHomePage(): Promise<HomePage> {
    const homepage = new HomePage(this.page);

    await homepage.goto();

    return homepage;
  }
}
