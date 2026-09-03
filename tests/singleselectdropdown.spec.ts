import{test,expect,Locator} from "@playwright/test";
test("single select dropdown",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1,select  option from dropdown in 4 ways 
    //await page.locator('#country').selectOption('India'); // visible text
    //await page.locator('#country').selectOption({value:'uk'}); //select bu value
    //await page.locator('#country').selectOption({label :'India'}); // selct by label
      await page.locator('#country').selectOption({index:3}); //bu using index

      //2, check no of options(count)
      const dropdownOptions:Locator=page.locator("#country>option");
      await expect(dropdownOptions).toHaveCount(10);

      //3, check an option present in the dropdown
      const optionsText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
      console.log(optionsText);
      expect(optionsText).toContain('Japan'); //check if option contain japan or not

      // 4, printing the options form the dropdown

      for(const option of optionsText){
        console.log(option)
      }


  await page.waitForTimeout(3000);
})