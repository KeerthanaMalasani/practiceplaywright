import{test,expect,Locator} from "@playwright/test";
test("single select dropdown",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1,select option from the dropdown  4 ways
   // await page.locator("#colors").selectOption(['Red','Blue','Green']);//using visible text
    //await page.locator("#colors").selectOption(['Red','Blue','white']); // using value attribute
   // await page.locator('#colors').selectOption([{label:'Red'}, {label:'Blue'},{label: 'Green'}]); //using label attribute
    await page .locator('#colors').selectOption([{ index:0}, { index:1}, {index:3 }]); //by using index numbner

    //2, check the no.of options in the dropdown

    const dropdownOptions:Locator= page.locator("#colors>option");
    await expect(dropdownOptions).toHaveCount(7);

    //3,check an option present inthe dropdown
    const optionText:string[]=(await dropdownOptions.allTextContents()).map(text=>text.trim());
    console.log(optionText)
    expect(optionText).toContain('Red');
    // 4, printing option from the dropdown
    for(const option of optionText)
    {
        console.log(option);
    }
})