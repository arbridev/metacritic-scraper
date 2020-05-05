const Db = require('./data/db').db;

const db = new Db();

(async () => {
  try {
    await db.artist.create('Blink-182');

    const artists = await db.artist.fetchAll();
    console.log("All artists:", JSON.stringify(artists, null, 2));
  } catch(error) {
    console.error(error);
  }
})();