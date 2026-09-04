import { test, expect, Locator } from 'playwright/test';
test('verify static table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const table: Locator = page.locator("table[name='BookTable']");
  await expect(table).toBeVisible();

  //1,count no.of rows in a table
  const rows: Locator = page.locator("table[name='BookTable'] tbody tr"); // retunns all the rows inculding headers
  // const rows: Locator = page.locator("tr");
  await expect(rows).toHaveCount(7); //approch 1

  const rowCount: number = await rows.count();
  // console.log("no.of rows :",rowCount);
  expect(rowCount).toBe(7); //approch 2

  //2, count no.of columns in tqable including with headers
  const columns: Locator = page.locator("table[name='BookTable'] tbody tr th");
  //const columns:Locator=rows.locator('th');
  await expect(columns).toHaveCount(4); //approch 1
  const columnCount: number = await columns.count();
  console.log('number of columns /headers:', columnCount);
  //expect(columnCount).toBe(4); // approch 2

  // 3) Read all data from 2nd row (index 2 means 3rd row including header)
  const secoundrowcells: Locator = await page
    .locator('tbody')
    .locator('tr')
    .nth(2);
  const secoundrowtext: string[] = await secoundrowcells.allInnerTexts();
  console.log('secound row print:', secoundrowtext); //[ 'Learn Java\tMukesh\tJava\t500' ]
  await expect(secoundrowcells).toHaveText(['Learn Java\tMukesh\tJava\t500']); //assertion
console.log("2nd row dataa....")
for(let text of secoundrowtext){
    console.log(text);
}
// 4, read all the table data without headers
console.log('printing all the table without headers')
const allRowData=await rows.all();
console.log("BookName author subject price")
for(let row of allRowData.slice(1)) //slice(1) -- skip header
{
    const cols=await row.locator('td').allInnerTexts();
    console.log(cols.join('\t'));
}

//5, print  book names where author is mukesh
console.log("book written is mukesh ....")
const mukeshBooks:string[]=[];
for(let row of allRowData.slice(1)) //slice(1) --skip header
{
    const cells=await row.locator('td').allInnerTexts();
    const author=cells[1];
    const book=cells[0]
    if(author=='Mukesh'){
        console.log('${author}\t${book}')
       
    }
}
//expect(mukeshBooks).toHaveLength(2);

//caluclate total price  of all books
let totalPrice=0;
for (let row of allRowData.slice(1)) { //slice(1) --skip header
  const cells = await row.locator('td').allInnerTexts();
  const price = cells[3];
 totalPrice =totalPrice+parseInt(price);
  
}
console.log("total price..",totalPrice);

//expect(totalPrice).toBe(7100); //asseration

});
