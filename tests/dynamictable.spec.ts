import { test, expect, Locator } from 'playwright/test';
test('verify CPU Load in  dynamic web table ', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/dynamic-table');
  const table: Locator = page.locator('table.table tbody');
  await expect(table).toBeVisible();
  // select no.of rows then find number of rows
  const rows: Locator[] = await table.locator('tr').all();
  console.log('no.of rows:', rows.length);
  expect(rows).toHaveLength(4);

  // for chrome process get  value of CPU LOAD
  //READ each row o check  chrome  presence
  let cpuLoad='';
  for (const row of rows) {
    const processName: string = await row.locator('td').nth(0).innerText();
    if (processName === 'chrome') {
     // cpuLoad =await row.locator('td:has-text("%")').innerText();
      cpuLoad=await row.locator ("td", {hasText: '%' }).innerText();
    }
  }
  //step 2 : compare it with value in yellow label 
  let yellowbox:string=await page.locator("#chrome-cpu").innerText();
  console.log("chrome cpu load from yellowbox :",yellowbox)
  if(yellowbox.includes(cpuLoad)){
    console.log("cpu load of chrome is equal");
  }
    else{
console.log("cpu load is not matched ");
    }
  expect(yellowbox).toContain(cpuLoad);
});
