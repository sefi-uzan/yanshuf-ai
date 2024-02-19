import { Locator, Page } from "@playwright/test";


export class Navbar {
  private readonly navbarLocator: Locator;
  public readonly navbarTitle: Locator;
  public readonly themeToggle: Locator;

  public readonly navbarItems: Locator;

  public readonly mobileMenu: Locator;
  public readonly mobileMenuItems: Locator;

  public readonly userMenuItems: Locator;
  public readonly userMenu: Locator;

  public readonly userDetails: Locator;

  constructor(page: Page) {
    this.navbarLocator = page.locator("nav > div > div");
    this.navbarTitle = this.navbarLocator.getByTestId("navbar-title");
    this.themeToggle = this.navbarLocator.getByTestId("mode-toggle");
    this.mobileMenu = this.navbarLocator.getByTestId("mobile-menu");
    this.userMenu = this.navbarLocator.getByTestId("user-account-menu");
    this.navbarItems = this.navbarLocator.getByTestId("navbar-item");
    this.mobileMenuItems = page.getByTestId("mobile-navbar-item");
    this.userMenuItems = page.getByTestId("user-account-navbar-item");
    this.userDetails = page.getByTestId("user-details");
  }
}
