const Album = require('../model/album');

class DbAlbum {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Create an album.
   *
   * @param artist {Artist} An Artist object, for which the album will be related
   * @param title A text, the title of the album
   * @param url A text, the metacritic url of the album
   */
  async create(artist, title, url) {
    // await this.sequelize.sync();
    try {
      const album = await Album.create({
        title: title,
        url: url,
        artistId: artist.id
      });
      console.log(album.toJSON());
    } catch(error) {
      console.error(error);
    }
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



  async addGenre(genre, album) {
    // await this.sequelize.sync();
    try {
      await album.addGenre(genre);
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