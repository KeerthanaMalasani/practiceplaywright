import {test,expect,Locator} from "@playwright/test";
test("verify css locators",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    

    //tsg id#
    const id: Locator = page.locator('input#small-searchterms');
    await expect(page.locator("input#small-searchterms")).toBeVisible();
    await id.fill("T-shirt");
    
    //class .
    const search: Locator = page.locator('input.small-searchterms');
    await expect(page.locator('input#small-searchterms')).toBeVisible();
    await search.fill('T-shirt');

    //tag[attribute=value]
//await page.locator("input[name=q]").fill("T-shirt");
//const filed: Locator = page.locator('input.small-searchterms');
//await expect(page.locator("[name=q]")).toBeVisible();
 //await search.fill('14.1-inch Laptop');

 //tag .class[attribute='value']
// await page.locator('search-box-text[value='Search store']").fill('T-shirt');
});