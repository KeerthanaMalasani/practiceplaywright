import { test, expect, Locator } from '@playwright/test';
test('Test the Actions ', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  //Text and imput 
  const textBox: Locator = page.locator('#name');
  await expect(textBox).toBeVisible();
  await expect(textBox).toBeEnabled();
  const maxLength: string | null = await textBox.getAttribute('maxLength');
  expect (maxLength).toBe('15');
  await textBox.fill("keerthana");
  console.log("text content of FirstName:",await textBox.textContent());
  const inputValue: string = await textBox.inputValue();
  console.log('input text of First Name :', inputValue);
  expect(inputValue).toBe("keerthana");

});

//Radio buttons and checkboxes 
test('Test the Radio and checkboxes ', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
 const maleRadio:Locator =page.locator('#male');//male radio

await expect(maleRadio).toBeVisible();
await expect(maleRadio).toBeEnabled();
expect(await maleRadio.isChecked()).toBe(false);

});

// multiple radio 

test. only('Test checkboxes Actions ', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  //select specific checkbox (sunday) using getByLabel and assert
  const sundayCheckbox:Locator = page.getByLabel('sunday');
 //await sundayCheckbox.check();
 //await expect(sundayCheckbox).toBeChecked();
 //select all chckboxes and asserts each is checked 
 const days: string[] = [
   'sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
 ];
 const checkboxes:Locator[]=days.map(index=>page.getByLabel(index));
 expect(checkboxes.length).toBe(7);
/*
 //select checkboxes and assert each os checked
 
 for( const checkbox of checkboxes)
 {
  await checkbox.check();
  await expect(checkbox).toBeChecked();

 }


 // uncheck last 3 check boxes and asserts
 for(const  checkbox  of checkboxes.slice(-3))
  {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }
//7. randomly check the checkboxes 1,3,6
const indexes: number[] = [1, 3, 6];
for(const i of indexes){
  checkboxes[i].check();
  await expect(checkboxes[i]).toBeAttached();
}

 await page.waitForTimeout(5000);
 */
 //8, select the checkbox based on the label

 const  weekname:string='Friday';
 for(const label of days){
  if(label.toLowerCase()==weekname.toLowerCase()){
    const checkbox=page.getByLabel(label);
    checkbox.check();
    await expect(checkbox).toBeChecked();
  }
 }
});

