import { test, expect, Locator } from '@playwright/test';

test('click the dynamic button', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Loop to click the button 5 times.
  for (let i = 1; i <= 5; i++) {
    const button: Locator = page.locator('//button[text()="STOP" or text()="START"]');
    await button.click();
  }
});
