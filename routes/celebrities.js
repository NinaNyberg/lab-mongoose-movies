const express = require('express');
const { default: mongoose } = require('mongoose');
const Celebrity = require('../models/celebrity');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      console.log('Failed to list celebrities', error);
      next(error);
    });
});

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

router.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      console.log('Failed to load', error);
      next(error);
    });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      console.log('Failed to edit', error);
      next(error);
    });
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      console.log(celebrity);
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log('There was an error creating the celebrity.');
      res.render('celebrities/create');
      next(error);
    });
});

router.post('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log('There was an error updating the celebrity.');
      next(error);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then((celebrity) => {
      console.log('Celebrity removed', celebrity);
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log('There was an error deleting the celebrity.');
      next(error);
    });
});

module.exports = router;
