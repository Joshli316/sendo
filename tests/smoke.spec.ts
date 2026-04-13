import { test, expect } from '@playwright/test';

test.describe('Sendō Smoke Tests', () => {

  test('homepage loads with asymmetric hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-logo')).toContainText('宣道');
    await expect(page.locator('.sendo-question')).toContainText('Christianity');
    await expect(page.locator('.sendo-title-kanji')).toContainText('宣道');
    await expect(page.locator('.sendo-stat-bar')).toBeVisible();
  });

  test('research page shows report cards', async ({ page }) => {
    await page.goto('/#/research');
    const cards = page.locator('.report-card');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('report detail loads for report 01', async ({ page }) => {
    await page.goto('/#/research/01');
    const content = page.locator('#app');
    await expect(content).toContainText('Japan', { timeout: 10_000 });
  });

  test('timeline page loads with events', async ({ page }) => {
    await page.goto('/#/research/timeline');
    const events = page.locator('.timeline-event');
    await expect(events.first()).toBeVisible({ timeout: 10_000 });
    const count = await events.count();
    expect(count).toBeGreaterThan(10);
  });

  test('tools hub shows tool cards', async ({ page }) => {
    await page.goto('/#/tools');
    const cards = page.locator('.offer-grid .card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('heritage page loads with sections', async ({ page }) => {
    await page.goto('/#/heritage');
    await expect(page.locator('.heritage-title')).toBeVisible();
    const sections = page.locator('.heritage-section');
    await expect(sections.first()).toBeVisible();
    const count = await sections.count();
    expect(count).toBe(6);
  });

  test('personas hub shows 12 persona cards', async ({ page }) => {
    await page.goto('/#/personas');
    const cards = page.locator('.persona-card');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBe(12);
  });

  test('retention calculator has sliders and shows result', async ({ page }) => {
    await page.goto('/#/tools/retention');
    const sliders = page.locator('.calc-slider');
    await expect(sliders).toHaveCount(5);
    const resultArea = page.locator('#result-area');
    await expect(resultArea).not.toBeEmpty();
    await expect(resultArea.locator('text')).toContainText('%');
  });
});

test.describe('Search', () => {

  test('search modal opens on Ctrl+K', async ({ page }) => {
    await page.goto('/');
    const modal = page.locator('#search-modal');
    await expect(modal).not.toHaveClass(/open/);
    await page.keyboard.press('Control+k');
    await expect(modal).toHaveClass(/open/);
    await expect(page.locator('.search-input')).toBeFocused();
  });

  test('search returns results for "Xavier"', async ({ page }) => {
    await page.goto('/');
    // Open search — this triggers loadIndex() which loads all reports async
    await page.keyboard.press('Control+k');
    const input = page.locator('.search-input');
    // Give the async report loading time to finish
    await page.waitForTimeout(5000);
    await input.fill('Xavier');
    await page.waitForTimeout(300);
    const results = page.locator('.search-result');
    await expect(results.first()).toBeVisible({ timeout: 10_000 });
    const count = await results.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('search keyboard nav: arrow down highlights result', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(5000);
    await page.locator('.search-input').fill('martyr');
    await page.waitForTimeout(300);
    const results = page.locator('.search-result');
    await expect(results.first()).toBeVisible({ timeout: 10_000 });
    await page.keyboard.press('ArrowDown');
    await expect(results.first()).toHaveClass(/search-result--active/);
  });

  test('Escape closes search modal', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Control+k');
    const modal = page.locator('#search-modal');
    await expect(modal).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/open/);
  });
});

test.describe('Language Toggle', () => {

  test('switches to Japanese', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lang-toggle button[data-lang="jp"]').click();
    // Hero question should be in Japanese
    await expect(page.locator('.sendo-question')).toContainText('日本');
    // Nav links should be translated
    await expect(page.locator('.nav-links a').first()).toContainText('研究');
    // Lang button should be active
    await expect(page.locator('.lang-toggle button[data-lang="jp"]')).toHaveClass(/active/);
  });

  test('persists language across navigation', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lang-toggle button[data-lang="jp"]').click();
    await expect(page.locator('.sendo-question')).toContainText('日本');
    // Navigate to research
    await page.goto('/#/research');
    await expect(page.locator('h1')).toContainText('研究報告');
    // Navigate to tools
    await page.goto('/#/tools');
    await expect(page.locator('h1')).toContainText('ツール');
  });

  test('switches back to English', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lang-toggle button[data-lang="jp"]').click();
    await expect(page.locator('.sendo-question')).toContainText('日本');
    await page.locator('.lang-toggle button[data-lang="en"]').click();
    await expect(page.locator('.sendo-question')).toContainText('Christianity');
  });
});

test.describe('Report Navigation', () => {

  test('clicking a report card navigates to detail', async ({ page }) => {
    await page.goto('/#/research');
    const firstCard = page.locator('.report-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });
    await firstCard.click();
    await expect(page).toHaveURL(/#\/research\/\d+/);
    await expect(page.locator('#app')).not.toBeEmpty();
  });

  test('back button returns to report list', async ({ page }) => {
    await page.goto('/#/research/01');
    await expect(page.locator('#app')).toContainText('Japan', { timeout: 10_000 });
    const backLink = page.locator('a[href="#/research"]').first();
    if (await backLink.isVisible()) {
      await backLink.click();
      await expect(page).toHaveURL(/#\/research$/);
    }
  });

  test('report cards maintain order (01-12)', async ({ page }) => {
    await page.goto('/#/research');
    const cards = page.locator('.report-card');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const firstHref = await cards.first().getAttribute('href');
    expect(firstHref).toContain('/research/01');
  });
});
