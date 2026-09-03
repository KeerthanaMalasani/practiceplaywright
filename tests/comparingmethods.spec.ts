import{test,expect,Locator} from "playwright/test"
test("comparing methods ",async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    const products:Locator=page.locator('.product-title')

    //1,innerText() vs textContent()
    //console.log(await products.nth(1).innerText());
    //console.log(await products.nth(1).textContent());

    //const count =await products.count();
    //for(let i=0; i<count;i++){
    /*  //  const productName :string=await products .nth(i).innerText(); // extraxt plain text  and eliminate whitspace and linebreaks
     //   console.log(productName);
       // const productName: string | null = await products.nth(i).textContent(); // whitspace and linebreaks will come
       // console.log(productName);
        const productName: string | null = await products.nth(i).textContent(); // whitspace and linebreaks will come
        console.log(productName?.trim());
    }*/

        //2, allInnerText() vs alltextContent()
       /* console .log("**comparing allInnerText() vs alltextContent()**")
       
        //const productNames:string[]=await products.allInnerTexts()
      //  console.log("product  names all captured:",productNames)
 const productNames: string[] = await products.allTextContents();
 //console.log('product  names all captured:', productNames);
 const productTrimmed:string[]=productNames.map(text=>text.trim());
 console.log("product names after trimmed:",productTrimmed)
 */

 //3, all()

const  productLocators:Locator[]=await products.all();
console.log(productLocators);
//for loop
/*for(let productloc of productLocators){
    console.log(await productloc.innerText());
}*/
//for in loop

for(let i in  productLocators){
    console.log(await productLocators[i].innerText());
}
})