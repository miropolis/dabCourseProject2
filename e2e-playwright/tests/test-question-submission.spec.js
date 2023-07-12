const { test, expect } = require("@playwright/test");

test("A question submitted to a course appears on the course page", async ({page}) => {
  // Go to course without questions
  await page.goto("/course-2/");

  // Open question submission form, make sure it is shown with the correct title and fill in the example question
  await page.locator('button:text("Ask a new question!")').click();
  await expect(page.locator(`p >> text='Question title'`)).toHaveText('Question title');
  await page.locator("#question-title-input").fill("Example question?");

  // Submit the example question
  await page.locator('button:text("Ask question")').click();

  // Assert that a new question with the title "Example question?" is shown
  await expect(page.locator(`h5 >> text='Example question?'`).first()).toHaveText('Example question?');

});