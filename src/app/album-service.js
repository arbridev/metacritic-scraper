var debug = require('debug')('m-s:album-s');

class AlbumService {

  constructor(db) {
    this.db = db;
  }

  async create(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    const { artistId, title, release, url, genres } = req.body;
    try {
      await this.db.album.create(artistId, title, release, url);
      const album = await this.db.album.fetchByTitle(title);
      await this.processGenres(genres, album);
      res.status(200).send('Album created');
    } catch(error) {
      debug(error);
      res.status(500).send('Error creating album');
    }
  }

  async readAll(req, res) {
    debug('Request headers:', req.headers);
    try {
      const albums = await this.db.album.fetchAll();
      res.json(albums);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading albums');
    }
  }

  async read(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      const album = await this.db.album.fetch(id);
      res.json(album);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading album');
    }
  }

  async readByTitle(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { title } = req.params;
    try {
      const album = await this.db.album.fetchByTitle(title);
      res.json(album);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading album');
    }
  }

  async update(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    const { albumId, artistId, title, release, url, genres } = req.body;
    try {
      await this.db.album.update(albumId, artistId, title, release, url);
      const album = await this.db.album.fetch(albumId);
      await this.processGenres(genres, album);
      res.status(200).send('Album updated');
    } catch(error) {
      debug(error);
      res.status(500).send('Error updating album');
    }
  }

  async delete(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      await this.db.album.remove(id);
      res.status(200).send('Album removed');
    } catch(error) {
      debug(error);
      res.status(500).send('Error removing album');
    }
  }

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

}

module.exports = AlbumService;