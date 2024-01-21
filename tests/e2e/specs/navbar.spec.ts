import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navbar tests", () => {
  test("navbar title is Yanshuf.ai", async ({ homePage }) => {
    await expect(homePage.navbar.navbarTitle).toContainText("Yanshuf.ai");
  });

  test("logged out displays the theme toggle @no-mobile", async ({
    homePage,
  }) => {
    await expect(homePage.navbar.themeToggle).toBeVisible();
  });

  test("logged out displays the theme toggle @mobile", async ({ homePage }) => {
    await expect(homePage.navbar.mobileThemeToggle).toBeVisible();
  });

  test("logged out navbar items are displayed", async ({ homePage }) => {
    await expect(homePage.navbar.pricingLink).toContainText("Pricing");
    await expect(homePage.navbar.signInLink).toContainText("Sign in");
    await expect(homePage.navbar.getStartedLink).toContainText("Get started");
  });

  test("logged out mobile menu is displayed on @mobile", async ({
    homePage,
  }) => {
    await expect(homePage.navbar.mobileMenu).toBeVisible();
  });
});
