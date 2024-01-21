import { Locator, Page } from "@playwright/test";

export class Navbar {
  private readonly navbarLocator: Locator;
  public readonly navbarTitle: Locator;
  public readonly navbarItems: Locator;
  public readonly themeToggle: Locator;
  public readonly pricingLink: Locator;
  public readonly signInLink: Locator;
  public readonly getStartedLink: Locator;

  public readonly mobileNavbarItems: Locator;
  public readonly mobileMenu: Locator;
  public readonly mobileThemeToggle: Locator;
  public readonly mobileMenuItems: Locator;
  public readonly mobileMenuPricing: Locator;
  public readonly mobileMenuSignIn: Locator;
  public readonly mobileMenuGetStarted: Locator;

  constructor(page: Page) {
    this.navbarLocator = page.locator("nav > div > div");
    this.navbarTitle = this.navbarLocator.getByRole("link", {
      name: "Yanshuf.ai",
    });
    this.navbarItems = this.navbarLocator.locator("div").nth(1);
    this.mobileNavbarItems = this.navbarLocator.locator("div").nth(0);
    this.themeToggle = this.navbarItems.locator(
      "button > span:has-text('Toggle theme')"
    );
    this.mobileThemeToggle = this.mobileNavbarItems.locator(
      "button > span:has-text('Toggle theme')"
    );
    this.pricingLink = this.navbarItems.locator('a:has-text("Pricing")');
    this.signInLink = this.navbarItems.locator('a:has-text("Sign in")');
    this.getStartedLink = this.navbarItems.locator('a:has-text("Get started")');
    this.mobileMenu = this.mobileNavbarItems.locator("> button").nth(1);
    this.mobileMenuItems = page.getByRole("menu");
    this.mobileMenuPricing = this.mobileMenuItems.getByRole("menuitem").nth(0);
    this.mobileMenuSignIn = this.mobileMenuItems.getByRole("menuitem").nth(1);
    this.mobileMenuGetStarted = this.mobileMenuItems
      .getByRole("menuitem")
      .nth(2);
  }
}
