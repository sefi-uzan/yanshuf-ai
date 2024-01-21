import { Page } from "@playwright/test";
import { userCookies } from "../fixtures/config";
import { HomePage } from "./home/home-page";
import { PageBase } from "./page-base";

export class Website extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  public seteUserCookie() {
    return this.page.context().addCookies(userCookies);
  }

  public async gotoHomePage(): Promise<HomePage> {
    const homepage = new HomePage(this.page);

    await homepage.goto();

    return homepage;
  }
}
