const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

// Index
router.get('/', async (req, res) => {
  const genres = await Genre.find();
  res.json(genres);
});

// Show
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.json(genre);
});

// Insert
router.post('/', async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.status(201).json(genre);
});

// Delete
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('Genre not found');
  res.status(204).send();
});

module.exports = router;
