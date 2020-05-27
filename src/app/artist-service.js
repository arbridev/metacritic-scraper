var debug = require('debug')('m-s:artist-s');

class ArtistService {

  constructor(db) {
      this.db = db;
  }

  async create(name) {
    return await this.db.artist.create(name);
  }

  async endpointReadAll(req, res) {
    debug('Request headers:', req.headers);
    debug('Request query:', req.query);
    const { onlyids, offset, limit } = req.query;
    try {
      // parse query parameters
      const parsedOnlyIds = onlyids === 'true' ? true : false;

      const artists = await this.db.artist.fetchAll(offset, limit);
      let result = null;
      if (parsedOnlyIds) {
        result = artists.map(artist => artist.id);
      } else {
        result = artists;
      }
      res.json(result);
    } catch(error) {
      const endpointError = 'Error reading artists';
      debug(endpointError, error);
      res.status(500).json({error: endpointError});
    }
  }

  async endpointRead(req, res) {
    debug('Request headers:', req.headers);
    debug('Request params:', req.params);
    const { id } = req.params;
    try {
      const artist = await this.read(id);
      res.json(artist);
    } catch(error) {
      const endpointError = 'Error reading artist';
      debug(endpointError, error);
      res.status(500).json({error: endpointError});
    }
  }

  async read(id) {
    return await this.db.artist.fetch(id);
  }

  async endpointReadByName(req, res) {
    debug('Request headers:', req.headers);
    debug('Request query:', req.query);
    const { name } = req.query;
    try {
      const artist = await this.readByName(name);
      res.json(artist);
    } catch(error) {
      const endpointError = 'Error reading artist';
      debug(endpointError, error);
      res.status(500).json({error: endpointError});
    }
  }

  async readByName(name) {
    return await this.db.artist.fetchByName(name);
  }

}

module.exports = ArtistService;