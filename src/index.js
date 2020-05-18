// -- Server -- //

// Setup

const port = process.env.PORT || 4000;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const Db = require('./data/db').db;
const db = new Db();

// Middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Controllers

const ArtistService = require('./app/artist-service');
const artistService = new ArtistService(db);
const AlbumService = require('./app/album-service');
const albumService = new AlbumService(db);

// Endpoints

app.get('/', (req, res) => res.send('Server is running'));

app.get('/artists', artistService.endpointReadAll.bind(artistService));
app.get('/artist/:id', artistService.endpointRead.bind(artistService));
app.get('/artist', artistService.endpointReadByName.bind(artistService));

app.post('/album', albumService.endpointCreate.bind(albumService));
app.get('/albums', albumService.endpointReadAll.bind(albumService));
app.get('/album/:id', albumService.endpointRead.bind(albumService));
app.get('/album', albumService.endpointReadByTitle.bind(albumService));

// Start server

app.listen(port, () => console.log(`Server is listening on port ${port}!`));