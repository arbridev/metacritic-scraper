var debug = require('debug')('m-s:a-s');

class ArtistService {

  constructor(db) {
      this.db = db;
  }

  async create(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    const { name } = req.body;
    try {
      await this.db.artist.create(name);
      res.status(200).send('Artist created');
    } catch(error) {
      debug(error);
      res.status(500).send('Error creating artist');
    }
  }

  async readAll(req, res) {
    debug('Request headers:', req.headers);
    try {
      const artists = await this.db.artist.fetchAll();
      res.json(artists);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading artists');
    }
  }

  async read(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      const artist = await this.db.artist.fetch(id);
      res.json(artist);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading artist');
    }
  }

  async readByName(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { name } = req.params;
    try {
      const artist = await this.db.artist.fetchByName(name);
      res.json(artist);
    } catch(error) {
      debug(error);
      res.status(500).send('Error reading artist');
    }
  }

  async update(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    const { id, name } = req.body;
    try {
      const artist = await this.db.artist.fetch(id);
      if (!artist) {
        throw 'Artist not found';
      }
      artist.name = name;
      await this.db.artist.update(artist);
      res.status(200).send('Artist updated');
    } catch(error) {
      debug(error);
      res.status(500).send('Error updating artist');
    }
  }

  async delete(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      await this.db.artist.remove(id);
      res.status(200).send('Artist removed');
    } catch(error) {
      debug(error);
      res.status(500).send('Error removing artist');
    }
  }

}

module.exports = ArtistService;