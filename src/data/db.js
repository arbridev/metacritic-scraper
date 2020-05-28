process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // error: self signed certificate

const pg = require('pg');
pg.defaults.ssl = process.env.DATABASE_URL ? true : false;

const { Sequelize } = require('sequelize');
const dburl = process.env.DATABASE_URL ? process.env.DATABASE_URL : require('./dburl');
const sequelize = new Sequelize(dburl, { logging: false });

module.exports.sequelize = sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Relationships

const Album = require('./model/album');
const Artist = require('./model/artist');
const Genre = require('./model/genre');

console.log('Models ---', sequelize.models);

Artist.hasMany(Album);
Album.belongsTo(Artist);
Album.belongsToMany(Genre, { through: 'album_genre' });
Genre.belongsToMany(Album, { through: 'album_genre' });

(async () => {
  try {
    await sequelize.sync({ alter: true });
  } catch(error) {
    console.error(error);
  }
})();

// Db class

const DbAlbum = require('./components/db-album');
const DbArtist = require('./components/db-artist');
const DbGenre = require('./components/db-genre');

class Db {
  constructor() {
    this.album = new DbAlbum(sequelize);
    this.artist = new DbArtist(sequelize);
    this.genre = new DbGenre(sequelize);
  }
}

module.exports.db = Db;