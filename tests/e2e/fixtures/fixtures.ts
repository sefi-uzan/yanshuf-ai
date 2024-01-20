import { test as base } from "@playwright/test";
import { PageBase } from "../pages/page-base";
import { HomePage } from "../pages/home/home-page";

type SiteFixture = {
  pageBase: PageBase;
  homePage: HomePage;
};

export const test = base.extend<SiteFixture>({
  pageBase: async ({ page }, use) => {
    const pageBase = new PageBase(page);

    await use(pageBase);

    await pageBase.close();
  },
  homePage: async ({ pageBase }, use) => {
    const homePage = await pageBase.gotoHomePage();

    await use(homePage);
  },
});
