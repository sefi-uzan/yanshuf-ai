import { Page } from "@playwright/test";
import { Navbar } from "./home/navbar";
import { HomePage } from "./home/home-page";
import { PageBase } from "./page-base";

export class Website extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  public async gotoHomePage(): Promise<HomePage> {
    const homepage = new HomePage(this.page);

    await homepage.goto();

    return homepage;
  }
}
