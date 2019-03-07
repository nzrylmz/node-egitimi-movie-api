const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body; // post dan alınan veriyi değişkenlere atama
  
  const movie = new Movie(req.year);
  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
