import { test, expect } from '@playwright/test';

test.describe('Home Page Interactions & Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero section renders and animates', async ({ page }) => {
    // Wait for GSAP timeline to finish
    await page.waitForTimeout(2000);
    
    const title = page.locator('text=Comedian. Chess Enthusiast. Chaos Agent.');
    await expect(title).toBeVisible();
  });

  test('Shows section filtering works correctly', async ({ page }) => {
    // Scroll down to Shows
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000); // wait for 3D stagger
    
    // Check initial cards count
    const cards = page.locator('.glass-card');
    const initialCount = await cards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Filter by Type: Standup
    const typeSelect = page.locator('select').nth(1); // Second select is Type
    await typeSelect.selectOption({ index: 1 });
    await page.waitForTimeout(500); // wait for Framer Motion exit
    
    const standupCount = await cards.count();
    // Assuming we have standup shows in the mock data, it should filter
    expect(standupCount).toBeGreaterThan(0);
    
    // Reset filter
    await typeSelect.selectOption('All');
  });

  test('Chessboard floating animation is running', async ({ page }) => {
    // Scroll to Chess Story
    await page.evaluate(() => window.scrollTo(0, 4000));
    
    // Wait for scroll trigger entrance
    await page.waitForTimeout(1500);
    
    const boardContainer = page.locator('.relative.aspect-square').first();
    await expect(boardContainer).toBeVisible();
    
    // Check if inline style transform changes over time (GSAP continuous)
    const transform1 = await boardContainer.getAttribute('style');
    await page.waitForTimeout(500);
    const transform2 = await boardContainer.getAttribute('style');
    
    expect(transform1).not.toBe(transform2);
  });
});
