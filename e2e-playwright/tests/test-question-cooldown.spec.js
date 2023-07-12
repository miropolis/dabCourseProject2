const { test, expect } = require("@playwright/test");

test("After creating one question, another one cannot be created instantly", async ({page}) => {
  
  // Create a new question analogous to test-question-submission.spec.js
  await page.goto("/course-2/");
  await page.locator('button:text("Ask a new question!")').click();
  await expect(page.locator(`p >> text='Question title'`)).toHaveText('Question title');
  await page.locator("#question-title-input").fill("Auto generated answers question?");
  await page.locator('button:text("Ask question")').click();
  await expect(page.locator(`h5 >> text='Auto generated answers question?'`).first()).toHaveText('Auto generated answers question?');

  // Attempt to create another question
  await page.locator('button:text("Ask a new question!")').click();
  await expect(page.locator(`p >> text='Question title'`)).toHaveText('Question title');
  await page.locator("#question-title-input").fill("Question-should-not-be-posted");
  await page.locator('button:text("Ask question")').click();
  // Verify that question title is not visible
  await expect(page.locator(`h5 >> text='Question-should-not-be-posted'`).first()).not.toBeVisible();
});