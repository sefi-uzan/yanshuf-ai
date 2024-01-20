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
  website: async ({ page }, use) => {
    const website = new Website(page);

    await use(website);

    await website.close();
  },
  homePage: async ({ website }, use) => {
    const homePage = await website.gotoHomePage();

    await use(homePage);
  },
});
