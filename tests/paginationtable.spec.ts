import { test, expect, Locator } from 'playwright/test';
test('read all the data from the page:', async ({ page }) => {
  //test.setTimeout(3000)
  await page.goto(
    'https://datatables.net/examples/basic_init/zero_configuration.html',
  );
  let hasmorepages = true;
  while (hasmorepages) {
    const rows = await page.locator('#example tbody tr').all();
    for (const row of rows) {
      console.log(await row.innerText());
    }

    const nextButton: Locator = page.getByLabel('Next');
    const buttonClass = await nextButton.getAttribute('class');
    if (buttonClass?.includes('disabled')) {
      hasmorepages = false;
    } else {
      await nextButton.click();
    }
  }

  await page.waitForTimeout(2000);
});

test('Filter the rows and check the rows count', async ({ page }) => {
  await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
  const dropdown: Locator = page.locator('#dt-length-0');
  await dropdown.selectOption({ label: '25' });
  //approch 1
  const rows = await page.locator('#example tbody tr').all();
  expect(rows.length).toBe(25); //assertion
  //Approch 2
  const rows2 = await page.locator('#example tbody tr');
 await expect(rows2).toHaveCount(25);
});


test.only('Search for specific data in a table', async ({ page }) => {
  await page.goto(
    'https://datatables.net/examples/basic_init/zero_configuration.html',
  );
  const searchbox: Locator = page.locator('#dt-search-0');
  await searchbox.fill('Paul Byrd');
  await page.waitForTimeout(5000);
  const rows = await page.locator('#example tbody tr').all();

  if (rows.length >= 1) {
    let matchFound = false;
    for (const row of rows) {
      const text = await row.innerText();
      if (text.includes('Paul Byrd')) {
        console.log('Record found');
        matchFound = true;
        break;
      }
    }
    expect(matchFound).toBe(true);
  } else {
    expect(rows.length).toBeGreaterThan(0);
    console.log("no rows found at search text")
  }
});

