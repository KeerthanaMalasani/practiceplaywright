import {test,expect,Locator} from "@playwright/test";
test("verify dropdown is sorted",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com");
    const dropdownOptions:Locator =page.locator('#animals>option')
    //const dropdownOptions: Locator = page.locator('#colors>option'); //for colors
   // console.log(dropdownOptions);
   const optionText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
   const OriginalList:string[]=[...optionText];
   const sortedList:string[]=[...optionText].sort();

   console.log("Original list :",OriginalList);
   console.log("sorted list:",sortedList);
expect(OriginalList).toEqual(sortedList);


    await page.waitForTimeout(3000);
})