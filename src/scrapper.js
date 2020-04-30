const debug = require('debug')('scrapper');
const puppeteer = require('puppeteer');

(async () => {
//   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  try {
    // Main music page
    await page.goto('https://www.metacritic.com/browse/albums/release-date/new-releases/date', {waitUntil: 'domcontentloaded'});
    await page.click('li.product:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)');
    // First album page
    await page.waitForSelector('.product_genre > span:nth-child(2)', {
      visible: true,
    });
    let album = await page.evaluate(() => {
      let title = document.querySelector('a.hover_none > span:nth-child(1) > h1:nth-child(1)').innerText;
      let artist = document.querySelector('.band_name').innerText;
      let genre = document.querySelector('.product_genre > span:nth-child(2)').innerText;
      return {
        title: title,
        artist: artist,
        genre: genre
      }
    });
    debug(album);
  } catch(error) {
    debug(error);
  }
  await page.screenshot({path: 'screenshot.png'});

  await browser.close();
})();