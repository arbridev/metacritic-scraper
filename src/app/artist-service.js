var debug = require('debug')('m-s:artist-s');

class ArtistService {

  constructor(db) {
      this.db = db;
  }

  // async endpointCreate(req, res) {
  //   debug('Request headers:', req.headers);
  //   debug('Request body:', req.body);
  //   const { name } = req.body;
  //   try {
  //     await this.create(name);
  //     res.status(200).send('Artist created');
  //   } catch(error) {
  //     debug(error);
  //     res.status(500).send('Error creating artist');
  //   }
  // }

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

  // async update(req, res) {
  //   debug('Request headers:', req.headers);
  //   debug('Request body:', req.body);
  //   const { id, name } = req.body;
  //   try {
  //     const artist = await this.db.artist.fetch(id);
  //     if (!artist) {
  //       throw 'Artist not found';
  //     }
  //     artist.name = name;
  //     await this.db.artist.update(artist);
  //     res.status(200).send('Artist updated');
  //   } catch(error) {
  //     debug(error);
  //     res.status(500).send('Error updating artist');
  //   }
  // }

  // async delete(req, res) {
  //   debug('Request headers:', req.headers);
  //   debug('Request params:', req.params);
  //   const { id } = req.params;
  //   try {
  //     await this.db.artist.remove(id);
  //     res.status(200).send('Artist removed');
  //   } catch(error) {
  //     debug(error);
  //     res.status(500).send('Error removing artist');
  //   }
  // }

}

module.exports = ArtistService;