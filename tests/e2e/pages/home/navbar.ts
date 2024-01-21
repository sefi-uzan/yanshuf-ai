import { Locator, Page } from "@playwright/test";
import { MobileMenu } from "./mobile-menu";
import { UserMenu } from "./user-menu";

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
  public readonly mobileMenuItems: MobileMenu;

  public readonly userMenuItems: UserMenu;
  public readonly userMenu: Locator;

  constructor(page: Page) {
    this.navbarLocator = page.locator("nav > div > div");
    this.navbarTitle = this.navbarLocator.getByRole("link", {
      name: "Yanshuf.ai",
    });
    this.navbarItems = this.navbarLocator.locator("div").nth(1);
    this.mobileNavbarItems = this.navbarLocator.locator("div").nth(0);
    this.themeToggle = page.getByTestId("mode-toggle").nth(1);
    this.mobileThemeToggle = this.mobileNavbarItems.locator(
      "button > span:has-text('Toggle theme')"
    );
    this.pricingLink = this.navbarItems.locator('a:has-text("Pricing")');
    this.signInLink = this.navbarItems.locator('a:has-text("Sign in")');
    this.getStartedLink = this.navbarItems.locator('a:has-text("Get started")');
    this.mobileMenu = this.mobileNavbarItems.locator("> button").nth(1);
    this.userMenu = this.mobileNavbarItems.locator("> button").nth(1);
    this.mobileMenuItems = new MobileMenu(page.getByRole("menu"));
    this.userMenuItems = new UserMenu(page.getByRole("menu"));
  }
}
