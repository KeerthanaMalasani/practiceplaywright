import { test, expect, Locator } from '@playwright/test';
test('Xpath Axes demo', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_tables.asp');
  //1,self - select<td>element that contains germany
  const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
  await expect(germanyCell).toHaveText('Germany');

  //parent axis - get parent of <tr> germany cell
  const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
  await expect(parentRow).toContainText('Maria Anders');

  //following -sibiling
  const sibling: Locator = page.locator(
    "//td[normalize-space()='Maria Anders']/following-sibling::td",
  );
  await expect(sibling).toHaveCount(1);

  //preceding axes
  const pre: Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
  await expect(pre).toHaveText('Maria Anders');
  
  //preceding-sibiling axes
  const sister: Locator = page.locator("//td[text()='Germany']/preceding::td");
  await expect(sister).toHaveCount(2);
  //await expect(sister.nth(0)).toHaveText('Alfreds Futterkiste');
  // await expect(sister.nth(1)).toHaveText('Maria Anders');
});
