import { expect, Locator, Page, test } from '@playwright/test';

async function selectDate(
  targetYear: string,
  targetMonth: string,
  targetDate: string,
  page: Page,
  isFuture: boolean,
) {
  while (true) {
    const currentMonth = await page
      .locator('.ui-datepicker-month')
      .textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();

    if (
      currentMonth?.trim() === targetMonth &&
      currentYear?.trim() === targetYear
    ) {
      break;
    }

    if (isFuture) {
      await page.locator('.ui-datepicker-next').click();
    } else {
      await page.locator('.ui-datepicker-prev').click();
    }

    await page.waitForTimeout(2000);
  }

  const allDates = await page.locator('.ui-datepicker-calendar td').all();
  for (const dt of allDates) {
    const dateText = (await dt.innerText()).trim();
    if (dateText === targetDate) {
      await dt.click();
      break;
    }
  }
}

test('jquery date picker', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com');

  const dateInput: Locator = page.locator('#datepicker');
  await expect(dateInput).toBeVisible();

  // approach 1 -- fill() method
  // dateInput.fill("02/14/2026"); // mm/dd/yyyy

  // approach 2 using date picker
  await dateInput.click();

  // select future  target date
  const year = '2027';
  const month = 'February';
  const date = '14';

  // select past  target date
  /*
  const year = '2025';
  const month = 'February';
  const date = '14';
  */
  await selectDate(year, month, date, page, true);
  const expectedDate = '02/14/2027'; // mm/dd/yyy
  await expect(dateInput).toHaveValue(expectedDate);
  await page.waitForTimeout(5000);
});
