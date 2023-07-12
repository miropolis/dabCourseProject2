const { test, expect } = require("@playwright/test");

test("After creating one answer, another one cannot be created instantly", async ({page}) => {
// Go to the first question in course-1
await page.goto("/course-1/");
await page.locator(`a >> text='Show answers!'`).first().click();
// Post one answer analogous to test-answer-submission.spec.js
await page.locator('button:text("Post a new answer!")').click();
await expect(page.locator(`p >> text='Answer title'`)).toHaveText('Answer title');
await page.locator("#answer-title-input").fill("Example answer!");
await page.locator('button:text("Give answer")').click();
// Attempt to post another answer
await page.locator('button:text("Post a new answer!")').click();
await expect(page.locator(`p >> text='Answer title'`)).toHaveText('Answer title');
await page.locator("#answer-title-input").fill("Answer-should-not-be-posted");
await page.locator('button:text("Give answer")').click();
// Verify that answer title is not visible
await expect(page.locator(`h5 >> text='Answer-should-not-be-posted'`).first()).not.toBeVisible();
});