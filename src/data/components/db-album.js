const moment = require('moment');
const Album = require('../model/album');
const { QueryTypes } = require('sequelize');

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
        release: moment(release).format('LL'),
        url: url,
        artistId: artistId
      });
      return album;
    } catch(error) {
      throw error;
    }
  } 

  /**
   * Fetch all albums, filter by genre.
   * 
   * @param offset {Number} Offset to fetch at
   * @param limit {Number} Limit of results
   * @param genres {[String]} An array of the name of genres to filter on
   * 
   * @return All albums.
   */
  async fetchAll(offset, limit, genres) {
    if (genres !== undefined) {
      let genresArray = null;
      if (!Array.isArray(genres)) {
        genresArray = [genres];
      } else {
        genresArray = genres;
      }
      let queryStr = `select a.* from albums a left join album_genre j on a.id = j."albumId" left join genres g on j."genreId" = g.id`;
      let replacements = {};
      let genresQuery = '';
      for (let i = 0; i < genresArray.length; i++) {
        if (i === 0) {
          genresQuery = genresQuery + ` where g.name = :genre${i}`
        } else {
          genresQuery = genresQuery + ` or g.name = :genre${i}`;
        }
        replacements[`genre${i}`] = genresArray[i];
      }
      queryStr = queryStr + genresQuery;
      queryStr = queryStr + ' group by a.id';
      if (offset !== undefined && limit !== undefined) {
        queryStr = queryStr + ` limit ${limit} offset ${offset}`;
      }
      queryStr = queryStr + ';';
      const albums = await this.sequelize.query(queryStr, {
        model: Album,
        mapToModel: true,
        replacements: replacements,
        type: QueryTypes.SELECT
      });
      return albums;
    } else if (offset !== undefined && limit !== undefined) {
      return await Album.findAll({
        offset: offset,
        limit: limit
      });
    } else {
      return await Album.findAll();
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
    } catch(error) {
      throw error;
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
    } catch(error) {
      throw error;
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
      throw error;
    }
  }

  async addGenre(album, genreId) {
    await this.sequelize.sync();
    try {
      await album.addGenre(genreId);
      await album.save();
    } catch(error) {
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
    } catch(error) {
      throw error;
    }
  }

}

module.exports = DbAlbum;