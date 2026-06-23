import { test, expect } from '@playwright/test';

test.describe('Navigation & Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Navbar links navigate to correct sections', async ({ page }) => {
    // Wait for initial GSAP animations
    await page.waitForTimeout(2000);
    
    // Click About IGL link
    await page.click('text=About IGL');
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.locator('h1')).toContainText("About India's Got Latent");
    
    // Go back home
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Click Apply link
    await page.click('text=Apply');
    await expect(page).toHaveURL(/.*\/apply\/participant/);
    await expect(page.locator('h1')).toContainText('Apply as a Participant');
    
    // Go back home
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Click Register link
    await page.click('text=Register');
    await expect(page).toHaveURL(/.*\/apply\/audience/);
    await expect(page.locator('h1')).toContainText('Watch Samay Raina Live!');
  });

  test('Hero CTA buttons navigate correctly', async ({ page }) => {
    // Click Apply to Participate
    await page.click('a:has-text("Apply as Participant")');
    await expect(page).toHaveURL(/.*\/apply\/participant/);
    
    // Go back and click Register
    await page.goBack();
    await page.click('a:has-text("Register as Audience")');
    await expect(page).toHaveURL(/.*\/apply\/audience/);
  });
});
