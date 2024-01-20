import { expect } from "@playwright/test";
import { test } from "../fixtures/fixtures";

test.describe("Navbar tests", () => {
  test("navbar title is Yanshuf.ai", async ({ pageBase }) => {
    await expect(pageBase.navbar.navbarTitle).toContainText("Yanshuf.ai");
  });
});
