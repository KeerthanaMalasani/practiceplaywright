import { test, expect, Locator } from '@playwright/test';
test('verify dailogs- simple alert', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //enable the  alert  handling
  page.on('dialog', (dialog) => {
    console.log('Dailog type is:', dialog.type()); //return type is dailog
    expect(dialog.type()).toContain('alert');
    console.log('Dailog Text', dialog.message()); //return message from dailogue
    expect(dialog.message()).toContain('I am an alert box!');
    dialog.accept();
  });

  await page.locator('#alertBtn').click();
  await page.waitForTimeout(5000);
});

test('confirmation dailog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //Register a dailog  handler
  page.on('dialog', (dialog) => {
    console.log('Dailog type is:', dialog.type()); //return type is dailog
    expect(dialog.type()).toContain("confirm");
    console.log('Dailog Text', dialog.message()); //return message from dailogue
    expect(dialog.message()).toContain("Press a button!");
    dialog.accept(); // it will  throws dailog by accept
    //dailog.dismiss(); // it will dismiss or close
  });

  await page.locator('#confirmBtn').click();
  const text: string = await page.locator('#demo').innerText();
  console.log("outputtext:",text);
  await expect(page.locator('#demo')).toHaveText('You pressed OK!');
  await page.waitForTimeout(5000);
});


test.only('prompt alert dailog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  //Register a dailog  handler
  page.on('dialog', (dialog) => {
    console.log('Dailog type is:', dialog.type()); //return type is dailog
    expect(dialog.type()).toContain('prompt');
    console.log('Dailog Text', dialog.message()); //return message from dailogue
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain('Harry Potter');
    //dialog.accept(); // it will  throws dailog by accept
    dialog.accept("jhon"); // close dailogue by accepting
   // dialog.dismiss(); // it will dismiss or close
  });

  await page.locator('#promptBtn').click();
  const text: string = await page.locator('#demo').innerText();
  console.log('outputtext:', text);
 // await expect(page.locator('#demo')).toHaveText('User cancelled the prompt.');
  await expect(page.locator('#demo')).toHaveText('Hello jhon! How are you today?');
  await page.waitForTimeout(5000);
});