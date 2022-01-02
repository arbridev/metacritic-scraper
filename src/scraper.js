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

  let browser = null;
  try {
    browser = await puppeteer.launch();
    // browser = await puppeteer.launch({headless: false}); // default is true
  } catch(error) {
    console.error(error);
  }

  console.log('Scraping last releases');
  const page = await browser.newPage();
  try {
    // Main music page
    await page.goto('https://www.metacritic.com/browse/albums/release-date/available/date', {waitUntil: 'domcontentloaded'});
    // Iterate through albums list
    for (let i = 1; i <= deepness; i = i + 2) {
      // Open album page in a new tab
      const link = await page.$(`div.browse_list_wrapper:nth-child(3) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(${i}) > td:nth-child(2) > a:nth-child(3)`);
      const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
      await link.click({button: 'middle'});
      const albumPage = await newPagePromise;
      await albumPage.bringToFront();
      await albumPage.waitForSelector('.metascore_wrap > div:nth-child(1)', {
        visible: true,
      });
      // Extract album data
      const rawAlbum = await albumPage.evaluate(() => {
        const title = document.querySelector('a.hover_none > span:nth-child(1) > h1:nth-child(1)').innerHTML;
        const artist = document.querySelector('.band_name').innerText;
        const release = document.querySelector('li.release > span:nth-child(2)').innerText;
        const url = window.location.href;
        let textGenres = document.querySelector('.product_genre');
        if (textGenres) {
          textGenres = textGenres.innerText;
        } else {
          textGenres = "";
        }
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
        console.log('Created scraped album:', album.title);
      }
    }
  } catch(error) {
    console.error(error);
  } finally {
    await browser.close();
  }
  
  console.log('Ended scraping last releases');
};