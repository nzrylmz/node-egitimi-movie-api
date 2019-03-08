const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// models
const Director = require('../models/Director'); // Director modeli

// new director
router.post('/', (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((director) => {
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

// get directors
router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: { 
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

// get director
router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);

    promise.then((director) => {
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

// update director
router.put('/:director_id', (req,res,next) => {
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new:true});

    promise.then((director) => {
      if(!director){
        next({message: 'This director is not found!', code: 100 });
      } else {
      res.json(director);
    }
    }).catch((err) => {
      next({message: 'This director is not found!', code: 101 });
    });
});

// delete director 
router.delete('/:director_id', (req, res, next) => {
    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((director) => {
        if(!director){
            next({message: 'This director is not found!', code: 100 });
        }else{
        res.json(director);
        }
    }).catch((err) => {
        next({message: 'This director is not found!', code: 101 })
    });
});

module.exports = router;