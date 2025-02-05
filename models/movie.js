const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  genre: {
    type: String,
    required: true
  },
  plot: {
    type: String
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
