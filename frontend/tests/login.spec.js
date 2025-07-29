import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('Shows error on invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByPlaceholder('Username').fill('wrong');
    await page.getByPlaceholder('Password').fill('invalid');
    await page.click('button:text("Login")');

    // 👇 Listen for alert
    page.once('dialog', async dialog => {
      expect(dialog.message()).toMatch(/invalid/i); // Adjust this to your exact error
      await dialog.dismiss();
    });
  });

  test('Successfully logs in with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByPlaceholder('Username').fill('test');
    await page.getByPlaceholder('Password').fill('password');
    await page.click('button:text("Login")');

    // Optional: check token saved in localStorage
    await expect(async () => {
      const token = await page.evaluate(() => localStorage.getItem('token'));
      expect(token).not.toBeNull();
    }).toPass();

    // Confirm redirect to /todo or /dashboard
    await expect(page).toHaveURL(/\/(todo|dashboard)/);
  });
});
