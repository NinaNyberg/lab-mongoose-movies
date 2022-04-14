const express = require('express');
const Celebrity = require('../models/celebrity');
const router = express.Router();

// Handle GET request for website root
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
