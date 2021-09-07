const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
});

test('duck go checking logo', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const logo = page.locator('#logo_homepage_link');
  await expect(logo).toBeVisible();
});

test('T2', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', 'Test');
  await page.click('#search_button_homepage');
  const firstResultText = await page.textContent('#r1-0');

  expect(firstResultText).toContain('Test');
});

test('T3', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage',"Microsoft word cheat sheet");
  await page.click('#search_button_homepage');
  await page.waitForNavigation();
  await page.click("span.chomp--link__mr");
  expect(await page.isVisible('h6.cheatsheet__title:has-text("Formatting")'))  
});

test('T4', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage',"shorten www.wikipedia.com");
  await page.click('#search_button_homepage');
  const shortUrl =await page.inputValue('#shorten-url');
  await page.goto(shortUrl);
  const newPageUrl= await page.url();
  expect(newPageUrl).toBe("https://www.wikipedia.org/")
},60);
