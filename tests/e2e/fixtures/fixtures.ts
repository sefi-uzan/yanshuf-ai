import { test as base } from "@playwright/test";
import { PageBase } from "../pages/page-base";
import { HomePage } from "../pages/home/home-page";
import { Website } from "../pages/website";

type SiteFixture = {
  pageBase: PageBase;
  website: Website;
  homePage: HomePage;
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
});
