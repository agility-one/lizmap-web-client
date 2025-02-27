// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Startup', () => {

  test('Zoom to features extent', async ({ page }) => {
    const url = '/index.php/view/map/?repository=testsrepository&project=startup&layer=sousquartiers&filter="quartmno"%20=%20%27PA%27%20OR%20"quartmno"%20=%20%27HO%27';
    await page.goto(url, { waitUntil: 'networkidle' });

    // Hide all elements but #map and its children
    await page.$eval("*", el => el.style.visibility = 'hidden');
    await page.$eval("#map, #map *", el => el.style.visibility = 'visible');

    expect(await page.locator('#map').screenshot()).toMatchSnapshot('zoom-features-extent.png');
  });

  test('Zoom to features extent and display popup', async ({ page }) => {
    const url = '/index.php/view/map/?repository=testsrepository&project=startup&layer=sousquartiers&filter="quartmno"%20=%20%27PA%27%20OR%20"quartmno"%20=%20%27HO%27&popup=true';
    await page.goto(url, { waitUntil: 'networkidle' });

    // Hide all elements but #map and its children
    await page.$eval("*", el => el.style.visibility = 'hidden');
    await page.$eval("#map, #map *", el => el.style.visibility = 'visible');

    expect(await page.locator('#map').screenshot()).toMatchSnapshot('zoom-features-extent-display-popup.png');
  });

});