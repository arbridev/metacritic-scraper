const Album = require('../model/album');

class DbAlbum {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Create an album.
   *
   * @param artist {Artist} An Artist object, for which the album will be related
   * @param title {String} A text, the title of the album
   * @param releale {Dateonly} The date of release
   * @param url {String} A text, the metacritic url of the album
   */
  async create(artist, title, release, url) {
    await this.sequelize.sync();
    try {
      const album = await Album.create({
        title: title,
        release: realease,
        url: url,
        artistId: artist.id
      });
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Fetch all albums.
   * 
   * @return All albums.
   */
  async fetchAll() {
    return await Album.findAll();
  }

  /**
   * Fetch a single album.
   * 
   * @param id {String} The id of the album to fetch.
   * @return A single album.
   */
  async fetch(id) {
    const album = await Album.findByPk(id);
    return album;
  }

  /**
   * Fetch a single album.
   * 
   * @param title {String} The title of the album to fetch.
   * @return A single album.
   */
  async fetchByTitle(title) {
    const album = await Album.findOne({ 
      where: {
        title: title
      }
    });
    return album;
  }

  /**
   * Update an album.
   *
   * @param album {Album} An album to be updated
   * @param artist {Artist} An Artist object, for which the album will be related
   * @param title {String} A text, the title of the album
   * @param release {Dateonly} The date of release
   * @param url {String} A text, the metacritic url of the album
   */
  async update(album, artist, title, release, url) {
    await this.sequelize.sync();
    try {
      album.title = title;
      album.release = release;
      album.url = url;
      album.artistId = artist.id;
      await album.save();
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Remove an album.
   * 
   * @param id {String} The id of the album to remove.
   */
  async remove(id) {
    await Album.destroy({
      where: {
        id: id
      }
    });
  }



  async addGenre(album, genre) {
    await this.sequelize.sync();
    try {
      await album.addGenre(genre);
      await album.save();
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
    }
  }

  async fetchGenres(album) {
    return await album.getGenres();
  }

}

module.exports = DbAlbum;