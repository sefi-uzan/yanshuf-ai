import { Locator, Page } from "@playwright/test";

export class Navbar {
  private readonly navbarLocator: Locator;
  public readonly navbarTitle: Locator;
  public readonly navbarItems: Locator;
  public readonly mobileNavbarItems: Locator;
  public readonly themeToggle: Locator;
  public readonly pricingLink: Locator;
  public readonly signInLink: Locator;
  public readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.navbarLocator = page.locator("nav > div > div");
    this.navbarTitle = this.navbarLocator.getByRole("link", {
      name: "Yanshuf.ai",
    });
    this.navbarItems = this.navbarLocator.locator("div.hidden");
    this.mobileNavbarItems = this.navbarLocator.locator("div.sm:hidden");
    this.themeToggle = this.navbarItems.locator(
      "button > span:has-text('Toggle theme')"
    );
    this.pricingLink = this.navbarItems.locator('a:has-text("Pricing")');
    this.signInLink = this.navbarItems.locator('a:has-text("Sign in")');
    this.getStartedLink = this.navbarItems.locator('a:has-text("Get started")');
  }
}
