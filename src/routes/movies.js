const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Index
router.get('/', async (req, res) => {
  const movies = await Movie.find().populate('genre');
  res.json(movies);
  console.log('Movies get route--------');

});

// Show
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id).populate('genre');
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
  console.log('Single Movies get route--------');

});

// Insert
router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
  console.log('Add Movies get route--------');

});

// Delete
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send('Movie not found');
  res.status(204).send();
});

module.exports = router;
