const express = require('express');
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const router = express.Router();

router.get('/movies', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.render('movies/index', { movies });
    })
    .catch((error) => {
      console.log('Failed to list movies', error);
      next(error);
    });
});

router.get('/movies/create', (req, res, next) => {
  res.render('movies/create');
});

router.get('/movies/:id', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => {
      console.log('Failed to load', error);
      next(error);
    });
});

router.get('/movies/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => {
      console.log('Failed to edit', error);
      next(error);
    });
});

router.post('/movies', (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then((movie) => {
      console.log(movie);
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log('There was an error creating the movie.');
      res.render('movies/create');
      next(error);
    });
});

router.post('/movies/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(id, { title, genre, plot })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log('There was an error updating the movie.');
      next(error);
    });
});

router.post('/movies/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then((movie) => {
      console.log('Movie removed', movie);
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log('There was an error deleting the movie.');
      next(error);
    });
});

module.exports = router;
