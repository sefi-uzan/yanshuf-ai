import { publicProcedure, router } from "@/app/api/trpc/trpc";
import { chromium } from "@playwright/test";

export const facebookRouter = router({
  facebookScrape: publicProcedure.mutation(async () => {
    const browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://www.facebook.com/");

    const title = await page.title();

    await page.locator("#email").fill(process.env.FACEBOOK_USER!);
    await page.locator("#pass").fill(process.env.FACEBOOK_PASSWORD!);

    await page.keyboard.press("Enter");

    const cookies = await context.cookies();

    await context.addCookies(cookies);

    await page.goto("https://www.facebook.com/groups/103294578038932");

    await page.screenshot({ path: `example.png`, fullPage: true });

    return title;
  }),
});
