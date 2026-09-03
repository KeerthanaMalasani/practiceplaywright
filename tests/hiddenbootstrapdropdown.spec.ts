import {test,expect,Locator} from "playwright/test"
test(" verify hiddenbootstrap dropdowns",async ({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    //login steps
   await page.getByPlaceholder('Username').fill("Admin");
   await page.getByPlaceholder('Password').fill("admin123");
   await page.getByRole('button').click();

   //click on pim
   await page.getByRole('link', { name: 'PIM' }).click();
 // await page.getByText('PIM').click();
await page.locator("form i").nth(2).click();
await page.waitForTimeout(3000);

//capture all the options from the dropdown
const options: Locator = page.locator("div[role='listbox']");
const count:number =await options.count();
console.log("no of options:",count);

//print all the options
console.log("all the options text contains:",await options.allTextContents());
console.log("print all  the options...")
for (let i = 0; i < count; i++) {
  console.log(await options.nth(i).textContent());
   //console.log(await options.nth(i).innerText());
}

//selct /clcik on option
for (let i = 0; i < count; i++) {
    const text =await  options.nth(i).innerText();
    if(text==='Automation Tester'){
        await options.nth(i).click();
        break;
    }
}

})