import { test as base } from "@playwright/test";
import { PageBase } from "../pages/page-base";
import { HomePage } from "../pages/home-page";
import { Website } from "../pages/website";
import { PricingPage } from "../pages/pricing";

type SiteFixture = {
  pageBase: PageBase;
  website: Website;
  homePage: HomePage;
  pricingPage: PricingPage;
};

export const test = base.extend<SiteFixture>({
  website: async ({ page }, use, testInfo) => {
    const website = new Website(page);

    console.log(`Running test: ${testInfo.title}`);

    if (!testInfo.title.includes("logged out")) {
      console.log("Setting user cookie...");
      await website.seteUserCookie();
    }

    await use(website);

    console.log(`Test finished with a status of ${testInfo.status}`);
    await website.close();
  },
  homePage: async ({ website }, use) => {
    const homePage = await website.gotoHomePage();

    await use(homePage);
  },
  pricingPage: async ({ website }, use) => {
    const pricingPage = await website.gotoPricingPage();

    await use(pricingPage);
  },
});
