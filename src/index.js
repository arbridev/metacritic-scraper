const Db = require('./data/db').db;

const db = new Db();

// (async () => {
//   try {
//     await db.artist.create('Jack White');

//     const artists = await db.artist.fetchAll();
//     console.log("All artists:", JSON.stringify(artists, null, 2));
//   } catch(error) {
//     console.error(error);
//   }

//   try {
//     const artist = await db.artist.fetchByName('Jack White');

//     const album = await db.album.fetchByTitle('Blunderbuss');
//     await db.album.update(album, artist, 'Blunderbuss', Date.parse('Apr 24, 2012'), 'https://www.metacritic.com/music/blunderbuss/jack-white');

//     const albums = await db.album.fetchAll();
//     console.log("All albums:", JSON.stringify(albums, null, 2));
//   } catch(error) {
//     console.error(error);
//   }
// })();

(async () => {
  try {
    const album = await db.album.fetchByTitle('Blunderbuss');
    let genre = await db.genre.fetchByName('Indie Rock');
    if (!genre) {
      await db.genre.create('Indie Rock');
      genre = await db.genre.fetchByName('Indie Rock');
      console.log(`Genre:`, JSON.stringify(genre, null, 2));
    }
    
    const exists = await db.album.hasGenre(album, genre.id);
    if (!exists) {
      await db.album.addGenre(album, genre.id);
    }
    const genres = await db.album.fetchGenres(album);
    console.log(`Genres of ${album.title}:`, JSON.stringify(genres, null, 2));
  } catch(error) {
    console.error(error);
  }
})();