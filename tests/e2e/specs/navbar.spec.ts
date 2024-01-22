import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navbar tests", () => {
  test.describe("logged out navbar tests", () => {
    test("logged out navbar title is Yanshuf.ai", async ({ homePage }) => {
      await expect(homePage.navbar.navbarTitle).toContainText("Yanshuf.ai");
    });

    test("logged out displays the theme toggle", async ({ homePage }) => {
      await expect(homePage.navbar.themeToggle).toBeVisible();
    });

    test("logged out navbar has 3 items #no-mobile", async ({ homePage }) => {
      await expect(homePage.navbar.navbarItems).toHaveCount(3);
    });

    test("logged out navbar items have the correct text #no-mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.navbarItems.nth(0)).toContainText("Pricing");
      await expect(homePage.navbar.navbarItems.nth(1)).toContainText("Sign in");
      await expect(homePage.navbar.navbarItems.nth(2)).toContainText(
        "Get started"
      );
    });

    test("logged out navbar items are not visible on #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.navbarItems.nth(0)).toBeHidden();
      await expect(homePage.navbar.navbarItems.nth(1)).toBeHidden();
      await expect(homePage.navbar.navbarItems.nth(2)).toBeHidden();
    });

    test("logged out menu items are not displayed when menu is closed #mobile", async ({
      homePage,
    }) => {
      await expect(homePage.navbar.mobileMenuItems.nth(0)).toBeHidden();
      await expect(homePage.navbar.mobileMenuItems.nth(1)).toBeHidden();
      await expect(homePage.navbar.mobileMenuItems.nth(2)).toBeHidden();
    });

    test("logged out mobile menu has 3 items #mobile", async ({ homePage }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuItems).toHaveCount(3);
    });

    test("logged out clicking on the menu will show navbar items #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuItems.nth(0)).toBeVisible();
      await expect(homePage.navbar.mobileMenuItems.nth(1)).toBeVisible();
      await expect(homePage.navbar.mobileMenuItems.nth(2)).toBeVisible();
    });

    test("logged out menu items will have the correct names #mobile", async ({
      homePage,
    }) => {
      await homePage.navbar.mobileMenu.click();
      await expect(homePage.navbar.mobileMenuItems.nth(0)).toHaveText(
        "Pricing"
      );
      await expect(homePage.navbar.mobileMenuItems.nth(1)).toHaveText(
        "Sign in"
      );
      await expect(homePage.navbar.mobileMenuItems.nth(2)).toHaveText(
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

    test("logged in displays the theme toggle", async ({ homePage }) => {
      await expect(homePage.navbar.themeToggle).toBeVisible();
    });

    test("logged in user menu user details will have correct text", async ({
      homePage,
    }) => {
      await homePage.navbar.userMenu.click();
      await expect(homePage.navbar.userDetails.locator("p").nth(0)).toHaveText(
        "Yanshuf"
      );
      await expect(homePage.navbar.userDetails.locator("p").nth(1)).toHaveText(
        "sefiuzan812@gmail.com"
      );
    });

    test("logged in user menu items will have the correct amount", async ({
      homePage,
    }) => {
      await homePage.navbar.userMenu.click();
      await expect(homePage.navbar.userMenuItems).toHaveCount(4);
    });

    test("logged in user menu items will have the correct texts", async ({
      homePage,
    }) => {
      await homePage.navbar.userMenu.click();
      await expect(homePage.navbar.userMenuItems.nth(0)).toHaveText(
        "Dashboard"
      );
      await expect(homePage.navbar.userMenuItems.nth(1)).toHaveText("Settings");
      await expect(homePage.navbar.userMenuItems.nth(2)).toHaveText(
        "Subscription"
      );
      await expect(homePage.navbar.userMenuItems.nth(3)).toHaveText("Sign out");
    });

    test("logged in user menu is displayed", async ({ homePage }) => {
      await expect(homePage.navbar.userMenu).toBeVisible();
    });
  });
});
