const { test, expect } = require("@playwright/test");

test("Server responds with a page with the title 'Questions & Answers'", async ({ page }) => {
    await page.goto("/assignment-1/");
    expect(await page.title()).toBe("Questions & Answers");
  });