import { test, expect } from '@playwright/test';

test('user can log in and see todos', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  // Fill login form
  await page.fill('input[name="username"]', 'mercy');
  await page.fill('input[name="password"]', 'test123');
  await page.click('button[type="submit"]');

  // Should redirect to homepage and show "No todos" or list
  await expect(page).toHaveURL('http://localhost:5173/');
  await expect(page.locator('text=No todos')).toBeVisible();

  // Add a todo
  await page.fill('input[name="new-todo"]', 'Frontend test todo');
  await page.click('button:has-text("Add Todo")');

  // Check if it appears
  await expect(page.locator('text=Frontend test todo')).toBeVisible();
});
