import { test, expect, Locator } from '@playwright/test';

test('verify demo playwright locator', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  );
  await page.waitForTimeout(3000);
  const logo: Locator = page.getByAltText('company-branding');
  await expect(logo).toBeVisible();
  /* getBytext()locator */
  // const text:Locator=page.getByText("Welcoem to store");
  // await expect(text).toBeVisible();
  // await expect(page.getByText('Welcome to our store')).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Search').fill('Dashboard');
});
