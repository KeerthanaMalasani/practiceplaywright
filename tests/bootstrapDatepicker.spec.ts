import { test, expect, Locator } from '@playwright/test';
test('verify the bootsrtrapDatepicker ', async ({ page }) => {
  await page.goto('https://www.booking.com/');

  //click on the datepicker  filed to open calender
  await page.getByTestId('searchbox-dates-container').click();

  //  ====check in  date selectiom//
  let checkinYear: string = '2027';
  let checkinMonth: string = 'February';
  let checkinDay: string = '14';

  //navigate through  the calender  to find the desired check-in month and year
  while (true) {
    const checkInMonthYear = await page.locator('span').filter({ hasText: '10' }) .first().innerText();
    const currentMonth = checkInMonthYear.split(' ')[0];
    const currentYear = checkInMonthYear.split(' ')[1];
    if (currentMonth === checkinMonth && currentYear === checkinYear) {
      break;
    }
  }
  //selct the specific check -in -date

  let allDates =await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
  let checkinDateSelected = false;
  for(let date of allDates){
    const dateText = await date.innerText();
    if (dateText === checkinDay) {
        await date.click();
        checkinDateSelected =  true;
        break;
        
    }
  }
});
