const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  releaseDate: Date,
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  duration: Number,
  rating: Number
});

module.exports = mongoose.model('Movie', movieSchema);
