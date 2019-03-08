const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Movie = require('../models/Movie');

// get movies
router.get('/', (req,res) => {
  const promise = Movie.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// new movie
router.post('/', (req, res, next) => {
  // const { title, imdb_score, category, country, year } = req.body; // post dan alınan veriyi değişkenlere atama
  
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// top 10 movies
router.get('/top10', (req,res) => {
  const promise = Movie.find({}).sort({ imdb_score: -1 }).limit(10);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// get movie
router.get('/:movie_id', (req,res,next) => {
  const promise = Movie.findById(req.params.movie_id);
  
  promise.then((movie) => {
    if(!movie){
      next({message: 'This movie is not found!', code: 98 });
    } else {
    res.json(movie);
  }
  }).catch((err) => { // eğer id mongo db kurallarına uymuyorsa 
    console.log(mongoose.Types.ObjectId.isValid(req.params.movie_id));
    next({message: 'This movie is not found!', code: 99 });
  });
});

// update movie
router.put('/:movie_id', (req,res,next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new:true}); 
                                        // güncellenen veriyi dönmesi için {new: true}
                                        // ikinci parametre güncellenecek bilgiler 
                                        // body den alınacak alanlar veritabanında güncellenecek
  promise.then((movie) => {
    if(!movie){  // if döngüsü doğru çalışmadığı için {} içine aldım
      next({message: 'This movie is not found!', code: 98 });
    } else {
    res.json(movie);
  }
  }).catch((err) => { // eğer id mongo db kurallarına uymuyorsa
    next({message: 'This movie is not found!', code: 99 });
  });
});

// delete movie
router.delete('/:movie_id', (req,res,next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  
  promise.then((movie) => {
    if(!movie){
      next({message: 'This movie is not found!', code: 98 });
    } else {
    res.json(movie);
    }
  }).catch((err) => { // eğer id mongo db kurallarına uymuyorsa mongodbden default error olarak catch e düşer
    console.log(mongoose.Types.ObjectId.isValid(req.params.movie_id));
    next({message: 'This movie is not found!', code: 99 });
  });
});

// between
router.get('/between/:start_year/:end_year', (req,res) => { // /:start_year.. burdan gelecek olan değer string olur
  const { start_year, end_year} = req.params;
  const promise = Movie.find(
    {
      year: { '$gte': parseInt(start_year), '$lte': parseInt(end_year) } // $gte: büyük veya eşit, $lte: küçük veya eşit
    }                // parseInt ile string i sayıya dönüştürme          // $gt ve $lt sadece büyük ve küçük demek 
  );
  
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
