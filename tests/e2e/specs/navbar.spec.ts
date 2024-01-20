import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navbar tests", () => {
  test("navbar title is Yanshuf.ai", async ({ homePage }) => {
    await expect(homePage.navbar.navbarTitle).toContainText("Yanshuf.ai");
  });
});
