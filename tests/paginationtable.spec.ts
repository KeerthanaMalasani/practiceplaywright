import {test,expect,Locator} from "playwright/test";
test("read all the data from the page:" ,async ({page})=>{
    //test.setTimeout(3000)
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    let hasmorepages =true;
    while(hasmorepages){
    const rows =await page.locator("#example tbody tr").all();
    for(let row of rows){
        console.log(await row.innerText());
    }
}
  await page.waitForTimeout(3000);
    const nextButton:Locator=page.locator("//button[aria-label='Next']");
   const isDisabled= await nextButton.getAttribute('class')
   if(isDisabled?.includes('disabled')){
    hasmorepages=false;
   }
   else{
    await nextButton.click();
   }

    })
