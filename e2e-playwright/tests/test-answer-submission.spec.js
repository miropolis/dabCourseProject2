const { test, expect } = require("@playwright/test");

test("First create the question", async ({page}) => {
  
  // Create a new question analogous to test-question-submission.spec.js
  await page.goto("/course-2/");
  await page.locator('button:text("Ask a new question!")').click();
  await expect(page.locator(`p >> text='Question title'`)).toHaveText('Question title');
  await page.locator("#question-title-input").fill("Example question?");
  await page.locator('button:text("Ask question")').click();
  await expect(page.locator(`h5 >> text='Example question?'`).first()).toHaveText('Example question?');
});

// separate test to bypass the cooldown based on the user_uuid
test("An answer submitted to a question appears on the question page", async ({page}) => {
  await page.goto("/course-2/");
  // Open the question page
  await page.locator(`a >> text='Show answers!'`).first().click();
  // Open the answer submission modal and verify it is open
  await page.locator('button:text("Post a new answer!")').click();
  await expect(page.locator(`p >> text='Answer title'`)).toHaveText('Answer title');
  // Fill the answer title and submit the answer
  await page.locator("#answer-title-input").fill("Example answer!");
  await page.locator('button:text("Give answer")').click();
  // Verify that answer with expected title was created
  await expect(page.locator(`h5 >> text='Example answer!'`)).toBeVisible();
});