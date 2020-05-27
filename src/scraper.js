const debug = require('debug')('m-s:scraper');
const puppeteer = require('puppeteer');

const Db = require('./data/db').db;
const db = new Db();

const AlbumService = require('./app/album-service');
const albumService = new AlbumService(db);
albumService.endpointCreate.bind(albumService);

exports.scrapeLastReleases = async function () {

  function extractGenres(text) {
    let newText = text.replace("Genre(s): ", "");
    newText = newText.split(", ");
    return newText;
  }

  const deepness = 10;

  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  try {
    // Main music page
    await page.goto('https://www.metacritic.com/browse/albums/release-date/available/date', {waitUntil: 'domcontentloaded'});
    // Iterate through albums list
    for (let i = 1; i <= deepness; i++) {
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
      const rawAlbum = await albumPage.evaluate(() => {
        const title = document.querySelector('a.hover_none > span:nth-child(1) > h1:nth-child(1)').innerHTML;
        const artist = document.querySelector('.band_name').innerText;
        const release = document.querySelector('li.release > span:nth-child(2)').innerText;
        const url = window.location.href;
        const textGenres = document.querySelector('.product_genre').innerText;
        return {
          title: title,
          artist: artist,
          release: release,
          url: url,
          genres: textGenres
        }
      });
      const album = {
        title: rawAlbum.title,
        artist: rawAlbum.artist,
        release: rawAlbum.release,
        url: rawAlbum.url,
        genres: extractGenres(rawAlbum.genres)
      }
      debug(album);
      await albumPage.close();

      const readAlbum = await albumService.readByTitle(album.title);
      if (!readAlbum) {
        await albumService.createWithArtist(album.artist, album.title, album.release, album.url, album.genres);
        debug('Created scraped album');
      }
    }
  } catch(error) {
    debug(error);
  }

  await browser.close();
};