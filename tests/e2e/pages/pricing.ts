import { Locator, Page } from "@playwright/test";
import { PageBase } from "./page-base";

export class PricingPage extends PageBase {
  public readonly freePlan: Locator;
  public readonly proPlan: Locator;
  constructor(page: Page) {
    super(page);
    this.freePlan = page.getByTestId("pricing-item-free");
    this.proPlan = page.getByTestId("pricing-item-pro");
  }

  public async goto(): Promise<void> {
    await this.page.goto("/pricing");
  }
}
