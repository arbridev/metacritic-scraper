const debug = require('debug')('metacritic-scrapper:scrapper');
const puppeteer = require('puppeteer');

(async () => {
//   const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  try {
    // Main music page
    await page.goto('https://www.metacritic.com/browse/albums/release-date/new-releases/date', {waitUntil: 'domcontentloaded'});
    // Iterate through albums list
    for (let i = 1; i < 4; i++) {
      // Open album page in a new tab
      const link = await page.$(`li.product:nth-child(${i}) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)`);
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
      await link.click({button: 'middle'});
      const albumPage = await newPagePromise;
      await albumPage.bringToFront();
      await albumPage.waitForSelector('.product_genre > span:nth-child(2)', {
        visible: true,
      });
      // Extract album data
      let album = await albumPage.evaluate(() => {
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
      await albumPage.close();
    }
  } catch(error) {
    debug(error);
  }

  await browser.close();
})();