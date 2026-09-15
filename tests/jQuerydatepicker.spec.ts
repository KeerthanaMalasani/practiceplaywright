import { test, expect, Locator } from '@playwright/test';
test('jquery date picker', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com');

  const dateInput: Locator = page.locator('#datepicker');
  expect(dateInput).toBeVisible();
  //approch 1 -- fill(0 method)
  //  dateInput.fill("02/14/2026"); -mm/dd/yyy

  //approch 2 using date picker
  await dateInput.click();
  //select target date
  const year = '2025';
  const month = 'February';
  const date = '14';

  while (true) {
    const currentMonth = await page
      .locator('.ui-datepicker-month')
      .textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();
    if (currentMonth === month && currentYear === year) {
      await page.waitForTimeout(3000);
      console.log('before break');
      break;
    }
    //future
   // await page.locator('.ui-datepicker-next').click();
   // console.log('next clicked');
    // await page.locator(".ui-icon.ui-icon-circle-triangle-e").click();

    // past
    await page.locator('.ui-datepicker-prev').click();
    console.log('past clicked');
  }
const allDates = await page.locator('.ui-datepicker-calendar td').all();
for (let dt of allDates) {
  const dateText = await dt.innerText();
  if (dateText === date) {
    await dt.click();
    await page.waitForTimeout(3000);
    console.log('date clicked');
    break;
  }
}
});
