import { test, expect, Locator } from 'playwright/test';
test('verify  dropdown contains duplicate sorted', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const dropdownOptions: Locator = page.locator('#animals>option'); //not having duplicates
 //const dropdownOptions: Locator = page.locator('#colors>option'); // duplicate
 const optionText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
 const myset=new Set<string>();//set - duiplicates not allowed
 const duplicates:string[]=[]; //array -duplicates  allowed
 for(const text of optionText){
    if(myset.has(text))
    {
        duplicates.push(text);
    }
    else{
        myset.add(text);
    }
 }
 console.log("Duplicate options are:===>",duplicates);
 if(duplicates.length>0){
    console.log("duplicate options found.",duplicates)
 }
 else{
    console.log("no duplicate options found ")

 }
 expect(duplicates.length).toBe(0);
});
