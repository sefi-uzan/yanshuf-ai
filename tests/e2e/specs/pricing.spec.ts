import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Pricing page tests", () => {
  test.describe("logged out pricing page  tests", () => {
    test("free plan cta has correct text", async ({ pricingPage }) => {
      await expect(pricingPage.freePlan.locator("div > a ")).toContainText(
        "Sign up"
      );
    });
    test("pro plan cta has correct text", async ({ pricingPage }) => {
      await expect(pricingPage.proPlan.locator("div > a ")).toContainText(
        "Sign up"
      );
    });
    test("clicking on free plan cta navigates to correct page", async ({
      page,
      pricingPage,
    }) => {
      await pricingPage.freePlan.locator("div > a ").click();

      expect(page).toHaveURL("http://localhost:3000/auth/sign-in");
    });
    test("clicking on pro plan cta navigates to correct page", async ({
      page,
      pricingPage,
    }) => {
      await pricingPage.freePlan.locator("div > a ").click();

      expect(page).toHaveURL("http://localhost:3000/auth/sign-in");
    });
  });

  test.describe.fixme("logged in navbar tests", () => {
    test("logged in free plan cta has correct text", async ({
      pricingPage,
    }) => {
      await expect(pricingPage.freePlan.locator("div > a ")).toContainText(
        "Start chatting"
      );
    });
    test("logged in  pro plan cta has correct text", async ({
      pricingPage,
    }) => {
      await expect(pricingPage.proPlan.locator("div > a ")).toContainText(
        "Upgrade now"
      );
    });
    test("loged in clicking on free plan cta navigates to correct page", async ({
      page,
      pricingPage,
    }) => {
      await pricingPage.freePlan.locator("div > a ").click();

      expect(page).toHaveURL("http://localhost:3000/dashboard/threads");
    });
    test("logged in clicking on pro plan cta navigates to correct page", async ({
      page,
      pricingPage,
    }) => {
      await pricingPage.freePlan.locator("div > a ").click();

      expect(page).toHaveURL(/stripe/);
    });
  });
});
