const Genre = require('../model/genre');

class DbGenre {

  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  /**
   * Create an genre.
   *
   * @param name A text, the name of the genre
   */
  async create(name) {
    await this.sequelize.sync();
    try {
      const genre = await Genre.create({
        name: name
      });
      console.log(genre.toJSON());
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Fetch all genres.
   * 
   * @return All genres.
   */
  async fetchAll(offset, limit) {
    if (offset !== undefined && limit !== undefined) {
      return await Genre.findAll({
        offset: offset,
        limit: limit
      });
    } else {
      return await Genre.findAll();
    }
  }

  /**
   * Fetch a single genre.
   * 
   * @param id {String} The id of the genre to fetch.
   * @return A single genre.
   */
  async fetch(id) {
    const genre = await Genre.findByPk(id);
    return genre;
  }

  /**
   * Fetch a single genre.
   * 
   * @param name {String} The name of the genre to fetch.
   * @return A single genre.
   */
  async fetchByName(name) {
    const genre = await Genre.findOne({ 
      where: {
        name: name
      }
    });
    return genre;
  }

  /**
   * Remove an genre.
   * 
   * @param id {String} The id of the genre to remove.
   */
  async remove(id) {
    await Genre.destroy({
      where: {
        id: id
      }
    });
  }

}

module.exports = DbGenre;