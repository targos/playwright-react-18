const { chromium, expect } = require('@playwright/test');

const version = process.argv[2] || 'react-18';
const otherVersion = version === 'react-18' ? 'react-17' : 'react-18';

console.log(`Testing ${version}. Pass ${otherVersion} to test with the other React version.`);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Go to page');
  await page.goto(`https://playwright-react-18.netlify.app/${version}/`);

  console.log('Click the button three times');
  await page.click('_react=Button');
  await page.click('_react=Button');
  await page.click('_react=Button');

  console.log('Check count');
  const locator = page.locator('_react=Count');
  await expect(locator).toHaveText('count is: 3');

  console.log('Close browser');
  await browser.close();
})();
