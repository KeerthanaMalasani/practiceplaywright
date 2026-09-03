import { test, expect, Locator } from '@playwright/test';
test('Autosuggest dropdown', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  // await page.locator ("input[name='q']").fill("smart");
  //   await page
  //     .locator("//input[@placeholder='Search for Products, Brands and More']")
  //     .fill('smart');
  await page
    .locator("input[placeholder='Search for Products, Brands and More']")
    .first()
    .fill('smart');
  const options: Locator = page.locator('ul>li');

  const count = await options.count();
  console.log('Number of suggested optionsssss:', count);

  //printing all the suggested options  in the console
  console.log('5th option:', await options.nth(0).innerText());
  console.log('printing all the auto suggestions...');

  for (let i = 0; i < count; i++) {
    // console.log(await options.nth(i).innerText());
    console.log(await options.nth(i).textContent());
  }
  //seelct /click on the particular -smartphone option
  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    if (text === 'smartphone') {
      await options.nth(i).click();
      break;
    }
    await page.waitForTimeout(5000);
  }
});
