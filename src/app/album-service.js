var debug = require('debug')('m-s:album-s');

class AlbumService {

  constructor(db) {
    this.db = db;
  }

  async endpointCreate(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    const { artist, title, release, url, genres } = req.body;
    try {
      let resAlbum = await this.readByTitle(title);
      if (resAlbum) {
        throw 'Album already exists';
      }
      let resArtist = await this.db.artist.fetchByName(artist);
      // create artist if does not exists
      if (!resArtist) {
        resArtist = await this.db.artist.create(artist);
      }

      await this.create(resArtist.id, title, release, url, genres);
      res.status(200).send('Album created');
    } catch(error) {
      debug(error);
      res.status(500).send('Error creating album');
    }
  }

  async create(artistId, title, release, url, genres) {
    await this.db.album.create(artistId, title, release, url);
    const album = await this.db.album.fetchByTitle(title);
    await this.processGenres(genres, album);
    return album;
  }

  async endpointReadAll(req, res) {
    debug('Request headers:', req.headers);
    debug('Request query:', req.query);
    const { onlyids, offset, limit } = req.query;
    try {
      // parse query parameters
      const parsedOnlyIds = onlyids === 'true' ? true : false;
      
      const albums = await this.db.album.fetchAll(offset, limit);
      let result = null;
      if (parsedOnlyIds) {
        result = albums.map(album => album.id);
      } else {
        const promises = albums.map(album => this.dbAlbumtoAlbumResult(album));
        result = await Promise.all(promises);
      }
      res.json(result);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading albums');
    }
  }

  async endpointRead(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      const album = await this.read(id);
      let result = await this.dbAlbumtoAlbumResult(album);
      debug(result);
      res.json(result);
    } catch(error) {
      const endpointError = 'Error reading album';
      debug(endpointError, error);
      res.status(500).json({error: endpointError});
    }
  }

  async read(id) {
    return await this.db.album.fetch(id);
  }

  async endpointReadByTitle(req, res) {
    debug('Request headers:', req.headers);
    debug('Request query:', req.query);
    const { title } = req.query;
    try {
      const album = await this.readByTitle(title);
      let result = await this.dbAlbumtoAlbumResult(album);
      debug(result);
      res.json(result);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading album');
    }
  }

  async readByTitle(title) {
    return await this.db.album.fetchByTitle(title);
  }

  // async update(req, res) {
  //   debug('Request headers:', req.headers);
  //   debug('Request body:', req.body);
  //   const { albumId, artistId, title, release, url, genres } = req.body;
  //   try {
  //     await this.db.album.update(albumId, artistId, title, release, url);
  //     const album = await this.db.album.fetch(albumId);
  //     await this.processGenres(genres, album);
  //     res.status(200).send('Album updated');
  //   } catch(error) {
  //     debug(error);
  //     res.status(500).send('Error updating album');
  //   }
  // }

  // async delete(req, res) {
  //   debug('Request headers:', req.headers);
  //   debug('Request params:', req.params);
  //   const { id } = req.params;
  //   try {
  //     await this.db.album.remove(id);
  //     res.status(200).send('Album removed');
  //   } catch(error) {
  //     debug(error);
  //     res.status(500).send('Error removing album');
  //   }
  // }

  async processGenres(genrenames, album) {
    let genrename;
    let genres = [];
    for (genrename of genrenames) {
      try {
        let genre = await this.db.genre.fetchByName(genrename);
        if (!genre) {
          await this.db.genre.create(genrename);
          genre = await this.db.genre.fetchByName(genrename);
        }
        const exists = await this.db.album.hasGenre(album, genre.id);
        if (!exists) {
          await this.db.album.addGenre(album, genre.id);
        }
        genres.push(genre);
      } catch(error) {
        throw error;
      }
    }
    try {
      await album.setGenres(genres);
    } catch(error) {
      throw error;
    }
  }

  async dbAlbumtoAlbumResult(album) {
    const artist = await album.getArtist();
    const genres = await album.getGenres();
    let result = {};
    result.id = album.id;
    result.title = album.title;
    result.artist = artist.name;
    result.release = album.release;
    result.url = album.url;
    result.genres = genres.map(genre => genre.name);
    return result;
  }

}

module.exports = AlbumService;