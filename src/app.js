const express = require('express');
const mongoose = require('mongoose');
const genresRouter = require('./routes/genres');
const moviesRouter = require('./routes/movies');

const app = express();
app.use(express.json());
app.use('/genres', genresRouter);
app.use('/movies', moviesRouter);

mongoose.connect('mongodb://127.0.0.1:27017/netflix_competitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

module.exports = app;
