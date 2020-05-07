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

// Endpoints

app.get('/', (req, res) => res.send('Server is running'));

app.post('/artist', artistService.create.bind(artistService));
app.get('/artists', artistService.readAll.bind(artistService));
app.get('/artist/:id', artistService.read.bind(artistService));
app.get('/artist/name/:name', artistService.readByName.bind(artistService));
app.post('/artist/update', artistService.update.bind(artistService));
app.post('/artist/remove/:id', artistService.delete.bind(artistService));

// Start server

app.listen(port, () => console.log(`Server is listening on port ${port}!`));