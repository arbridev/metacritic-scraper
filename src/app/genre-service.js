var debug = require('debug')('m-s:genre-s');

class GenreService {

  constructor(db) {
    this.db = db;
  }

  async endpointReadAll(req, res) {
    debug('Request headers:', req.headers);
    debug('Request query:', req.query);
    const { onlyids, offset, limit } = req.query;
    try {
      // parse query parameters
      const parsedOnlyIds = onlyids === 'true' ? true : false;
      
      const genres = await this.db.genre.fetchAll(offset, limit);
      let result = null;
      if (parsedOnlyIds) {
        result = genres.map(genre => genre.id);
      } else {
        result = genres;
      }
      res.json(result);
    } catch(error) {
      const endpointError = 'Error reading genres';
      debug(endpointError, error);
      res.status(500).json({error: endpointError});
    }
  }

}

module.exports = GenreService;