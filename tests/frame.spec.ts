import { test, expect, Locator } from '@playwright/test';
test('frames demo ', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  //tottal no.of pages present on the page
  const frames = page.frames();
  console.log('number of frames:', frames.length);

  //approch 1 :using  page.frame()
  const frame = page.frame({
    url: 'https://ui.vision/demo/webtest/frames/frame_1.html',
  });
  // if (frame) {
  //   await frame.locator("[name='mytext1']").fill('Hello');
  // }

  //approh 2 : using frameLocator()..
  const inputbox = page
    .frameLocator("[src='frame_1.html']")
    .locator("[name='mytext1']");
  await inputbox.fill('Jhon');
  await page.waitForTimeout(5000);
});

test.only('inner/child frames demo', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame3 = page.frame({
    url: 'https://ui.vision/demo/webtest/frames/frame_3.html',
  });
  if (frame3) {
    await frame3.locator("[name='mytext3']").fill('welcome');
    const childFrames=frame3.childFrames();
    console.log("child frames inside  the Frame 3:",childFrames.length); //only 1  child frame exist
   const radio= childFrames[0].getByLabel("I am a human");
   radio.check(); // selct radio  button
   expect(radio).toBeChecked(); // assersation
  } else {
    console.log('frame 3 is not found ..');
  }
  await page.waitForTimeout(5000);
});
