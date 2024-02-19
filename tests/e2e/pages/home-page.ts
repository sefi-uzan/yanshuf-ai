import { Page } from "@playwright/test";
import { PageBase } from "./page-base";

export class HomePage extends PageBase {
  constructor(page: Page) {
    super(page);
  }

  public async goto(): Promise<void> {
    await this.page.goto("/");
  }
}
