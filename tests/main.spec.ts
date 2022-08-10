import { test, expect } from '@playwright/test';

test.describe('homepage loads correctly, shows all inputs and redirects to trainer', () => {
  let start;
  let paragraphInput;

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000//');

    start = page.locator('.start');
    paragraphInput = page.locator('.paragraph-input');
  });

  test('Page Loads', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/TypingTrainer Setup/);

  });

  test('Paragraph has default random paragraph value and Can start trainer with default options', async ({ page }) => {
    await page.waitForSelector('text=Start',{timeout:25000})


    // Expect paragraphInput "to contain" something.
    await expect((await paragraphInput.inputValue()).length).toBeGreaterThan(0);

    await start.click();

    // Expects the URL to contain intro.
    await expect(page.locator('h2')).toContainText(/Score: 0/);

  });

  test('Can start trainer with different timeLimits', async ({ page }) => {
    const timeLimitSelect = page.locator('.time-limit');

      // Expect timeSelect to have required options
    await expect(page.locator('.other')).toHaveCount(0);

    await timeLimitSelect.selectOption("300")
    await expect(await timeLimitSelect.inputValue()).toBe("300");

    await start.click();

    await expect(page).toHaveTitle("TypingTrainer in Training");
    await expect(page.locator("text=00:05:00")).toHaveCount(1);

  });

  test('Can start trainer with custom timeLimit', async ({ page }) => {
    const timeLimitSelect = page.locator('.time-limit');

      // Expect timeSelect to have required options
    await expect(page.locator('.other')).toHaveCount(0);

    await timeLimitSelect.selectOption("-1")
    await expect(await timeLimitSelect.inputValue()).toBe("-1");

    const otherTimeLimit = page.locator('.other')

    await expect(otherTimeLimit).toBeVisible();
    await otherTimeLimit.fill("90")

    await start.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("TypingTrainer in Training");
    await expect(page.locator("text=00:01:30")).toHaveCount(1);
  });

  test('Can start trainer with custom Paragraph', async ({ page }) => {

    const paragraph = "I'm going to try to add a custom paragraph to the typing trainer"

    await paragraphInput.fill(paragraph)

    await start.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveTitle("TypingTrainer in Training");
    await expect(page.locator("text=I'm going to try to add a custom paragraph to the typing trainer")).toHaveCount(1);
  });

});

test.describe('trainer works correctly', () => {
  let start;
  let paragraphInput;
  let trainingInput;

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000//');

    start = page.locator('.start');
    paragraphInput = page.locator('.paragraph-input');
    trainingInput = page.locator('input');

    const paragraph = "I'm going to try to add a custom paragraph to the typing trainer"

    await paragraphInput.fill(paragraph)

    await start.click();

  });

  test('Score changes', async ({ page }) => {

    await trainingInput.focus()
    await page.keyboard.type('I\'m ');


    // Expects the URL to contain intro.
    await expect(await trainingInput.inputValue()).toBe("");
    await expect(page.locator('h2')).toContainText(/Score: 1/);

    await page.keyboard.type('xxx ');
    await expect(page.locator('h2')).toContainText(/Score: 1/);

    await page.keyboard.type('to ');
    await expect(page.locator('h2')).toContainText(/Score: 2/);

  });

  test('Redirects to results', async ({ page }) => {
    await trainingInput.focus()
    await page.keyboard.type('I\'m going to try to add a custom paragraph to the typing trainer ');

    await expect(page).toHaveTitle("TypingTrainer Results");

    // Expects the URL to contain intro.
    await expect(page.locator('text=Final Score: 13 / 13')).toHaveCount(1);

  });
});

test.describe('Results page works correctly', () => {
  let start;
  let paragraphInput;
  let trainingInput;
  let restartButton;

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:3000//');

    start = page.locator('.start');
    paragraphInput = page.locator('.paragraph-input');
    trainingInput = page.locator('input');

    const paragraph = "I'm going to try to add a custom paragraph to the typing trainer"

    await paragraphInput.fill(paragraph)

    await start.click();

    await trainingInput.focus()
    await page.keyboard.type(paragraph + ' ');

    restartButton = page.locator('button');
  });

  test('Restart button works', async ({page}) => {
    await restartButton.click()
    await expect(page).toHaveTitle(/TypingTrainer Setup/);
  })
})