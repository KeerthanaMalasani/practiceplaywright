import {test,expect,Locator} from "@playwright/test"
test("verify dailogs- simple alert",async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on('dialog', (dialog) => { 
        console.log("Dailog type is:",dialog.type()); //return type is dailog
        expect(dialog.type()).toContain('alert');
        console.log("Dailog Text",dialog.message()); //return message from dailogue
        expect(dialog.message()).toContain("I am an alert box!");
        dialog.accept();
    });

    await page.locator('#alertBtn').click();
    await page.waitForTimeout(5000);

})