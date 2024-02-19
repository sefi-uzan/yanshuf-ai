import { Page } from "@playwright/test";
import { userCookies } from "../fixtures/config";
import { HomePage } from "./home-page";
import { PageBase } from "./page-base";
import { PricingPage } from "./pricing";

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
  public async gotoPricingPage(): Promise<PricingPage> {
    const pricingpage = new PricingPage(this.page);

    await pricingpage.goto();

    return pricingpage;
  }
}
