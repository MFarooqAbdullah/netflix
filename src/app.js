const express = require('express');
const mongoose = require('mongoose');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');
const homeRouter = require('./routes/home');

const app = express();
app.use(express.json());
app.use('/genres', genresRouter);
app.use('/movies', moviesRouter);
app.use('/', homeRouter);

mongoose.connect(process.env.DATABASE_URL|| 'mongodb://netflix_lightpond:e54d96ec76d86f657f2fd22cddb0f81ed277d0df@u1z.h.filess.io:27017/netflix_lightpond', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = app;
