const { test, expect } = require("@playwright/test");

test("An answer submitted to a question appears on the question page", async ({page}) => {
    
    // Create a new question analogous to test-question-submission.spec.js
    await page.goto("/course-2/");
    await page.locator('button:text("Ask a new question!")').click();
    await expect(page.locator(`p >> text='Question title'`)).toHaveText('Question title');
    await page.locator("#question-title-input").fill("Example question?");
    await page.locator('button:text("Ask question")').click();
    await expect(page.locator(`h5 >> text='Example question?'`).first()).toHaveText('Example question?');

    // Open the question page
    await page.locator(`a >> text='Show answers!'`).first().click();

    // TODO finish this test with actual answer submission
    // Think about testing auto generated answers
  });