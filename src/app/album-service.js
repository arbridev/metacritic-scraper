var debug = require('debug')('album-service');

class AlbumService {

  constructor(db) {
    this.db = db;
  }

  async create(req, res) {
    debug('Request headers:', req.headers);
    debug('Request body:', req.body);
    try {
      await this.db.album.create(req.name);
      res.status(200).send('Successful test');
    } catch(error) {
      debug(error);
      res.status(500);
    }
  }

  async readAll(req, res) {
      debug('Request headers:', req.headers);
      debug('Request body:', req.body);
  }

  async read(req, res) {
      debug('Request headers:', req.headers);
      debug('Request body:', req.body);
  }

  async readByName(req, res) {
      debug('Request headers:', req.headers);
      debug('Request body:', req.body);
  }

  async update(req, res) {
      debug('Request headers:', req.headers);
      debug('Request body:', req.body);
  }

  async delete(req, res) {
      debug('Request headers:', req.headers);
      debug('Request body:', req.body);
  }

}

module.exports = AlbumService;