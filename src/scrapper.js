const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
//   await page.goto('https://www.google.com');
  try {
    await page.goto('https://www.metacritic.com/browse/albums/release-date/new-releases/date');
  } catch(error) {
      console.log(error);
  }
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();