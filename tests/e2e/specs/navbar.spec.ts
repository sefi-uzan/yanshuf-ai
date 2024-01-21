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

    test("logged out clicking on the menu will show navbar items #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuItems.pricing).toBeVisible();
      await expect(homePage.navbar.mobileMenuItems.signIn).toBeVisible();
      await expect(homePage.navbar.mobileMenuItems.getStarted).toBeVisible();
    });

    test("logged out menu items will have the correct names #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuItems.pricing).toHaveText(
        "Pricing"
      );
      await expect(homePage.navbar.mobileMenuItems.signIn).toHaveText(
        "Sign in"
      );
      await expect(homePage.navbar.mobileMenuItems.getStarted).toHaveText(
        "Get started"
      );
    });

    test("logged out mobile menu is displayed on #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.mobileMenu).toBeVisible();
    });
  });

  test.describe("logged in navbar tests", () => {
    test("logged in navbar title is Yanshuf.ai", async ({ homePage }) => {
      await expect(homePage.navbar.navbarTitle).toContainText("Yanshuf.ai");
    });

    test("logged in displays the theme toggle #no-mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.themeToggle).toBeVisible();
    });

    test("logged in displays the theme toggle #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.mobileThemeToggle).toBeVisible();
    });

    test("logged in clicking on the user menu will show navbar items #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.userMenu.click();
      await expect(homePage.navbar.userMenuItems.name).toHaveText("Yanshuf");
      await expect(homePage.navbar.userMenuItems.email).toHaveText(
        "sefiuzan812@gmail.com"
      );
      await expect(homePage.navbar.userMenuItems.dashboard).toBeVisible();
      await expect(homePage.navbar.userMenuItems.settings).toBeVisible();
      await expect(homePage.navbar.userMenuItems.subscription).toBeVisible();
      await expect(homePage.navbar.userMenuItems.signOut).toBeVisible();
    });

    test("logged in mobile menu is displayed on #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.userMenu).toBeVisible();
    });
  });
});
