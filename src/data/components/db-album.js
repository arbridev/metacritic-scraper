const Album = require('../model/album');

class DbAlbum {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Create an album.
   *
   * @param artistId {String} The id of an Artist, for which the album will be related
   * @param title {String} A text, the title of the album
   * @param releale {Dateonly} The date of release
   * @param url {String} A text, the metacritic url of the album
   */
  async create(artistId, title, release, url) {
    await this.sequelize.sync();
    try {
      const album = await Album.create({
        title: title,
        release: release,
        url: url,
        artistId: artistId
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
   */
  async update(album) {
    await this.sequelize.sync();
    try {
      await album.save();
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Update an album.
   *
   * @param albumId {String} The id of the album to be updated
   * @param artistId {String} The id of the Artist object, for which the album will be related
   * @param title {String} A text, the title of the album
   * @param release {Dateonly} The date of release
   * @param url {String} A text, the metacritic url of the album
   */
  async update(albumId, artistId, title, release, url) {
    await this.sequelize.sync();
    try {
      const album = await Album.findByPk(albumId);
      album.title = title;
      album.release = release;
      album.url = url;
      album.artistId = artistId;
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

  // Genre

  async hasGenre(album, genreId) {
    await this.sequelize.sync();
    try {
      return await album.hasGenre(genreId);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async addGenre(album, genreId) {
    await this.sequelize.sync();
    try {
      await album.addGenre(genreId);
      await album.save();
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async fetchGenres(album) {
    return await album.getGenres();
  }

  async removeGenre(album, genreId) {
    await this.sequelize.sync();
    try {
      await album.removeGenre(genreId);
      await album.save();
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

}

module.exports = DbAlbum;