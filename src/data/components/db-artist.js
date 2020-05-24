const Artist = require('../model/artist');

class DbArtist {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Create an artist.
   *
   * @param name A text, the name of the artist
   */
  async create(name) {
    await this.sequelize.sync();
    try {
      const artist = await Artist.create({
        name: name
      });
      console.log(artist.toJSON());
      return artist;
    } catch(error) {
      throw error;
    }
  }

  /**
   * Fetch all artists.
   * 
   * @return All artists.
   */
  async fetchAll(offset, limit) {
    if (offset !== undefined && limit !== undefined) {
      return await Artist.findAll({
        offset: offset,
        limit: limit
      });
    } else {
      return await Artist.findAll();
    }
  }

  /**
   * Fetch a single artist.
   * 
   * @param id {String} The id of the artist to fetch.
   * @return A single artist.
   */
  async fetch(id) {
    const artist = await Artist.findByPk(id);
    return artist;
  }

  /**
   * Fetch a single artist.
   * 
   * @param name {String} The name of the artist to fetch.
   * @return A single artist.
   */
  async fetchByName(name) {
    const artist = await Artist.findOne({ 
      where: {
        name: name
      }
    });
    return artist;
  }

  /**
   * Update an artist.
   * 
   * @param artist {Artist} The artist to update.
   */
  async update(artist) {
    await artist.save();
  }

  /**
   * Remove an artist.
   * 
   * @param id {String} The id of the artist to remove.
   */
  async remove(id) {
    await Artist.destroy({
      where: {
        id: id
      }
    });
  }

}

module.exports = DbArtist;