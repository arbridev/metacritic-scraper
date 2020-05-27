const scraper = require('./scraper');

(async () => {
  await scraper.scrapeLastReleases();
})();