import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navbar tests", () => {
  test.describe("logged out navbar tests", () => {
    test("logged out navbar title is Yanshuf.ai", async ({ homePage }) => {
      await expect(homePage.navbar.navbarTitle).toContainText("Yanshuf.ai");
    });

    test("logged out displays the theme toggle #no-mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.themeToggle).toBeVisible();
    });

    test("logged out displays the theme toggle #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.mobileThemeToggle).toBeVisible();
    });

    test("logged out navbar items have the correct text #no-mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.pricingLink).toContainText("Pricing");
      await expect(homePage.navbar.signInLink).toContainText("Sign in");
      await expect(homePage.navbar.getStartedLink).toContainText("Get started");
    });

    test("logged out navbar items are not visible on #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.pricingLink).toBeHidden();
      await expect(homePage.navbar.signInLink).toBeHidden();
      await expect(homePage.navbar.getStartedLink).toBeHidden();
    });

    test.only("logged out clicking on the menu will show navbar items #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuPricing).toBeVisible();
      await expect(homePage.navbar.mobileMenuSignIn).toBeVisible();
      await expect(homePage.navbar.mobileMenuGetStarted).toBeVisible();
    });

    test("logged out mobile menu is displayed on #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.mobileMenu).toBeVisible();
    });
  });
});
