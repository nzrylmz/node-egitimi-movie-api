const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// register
router.post('/register', (req, res, next) => {
  const {username, password } = req.body;
  
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

// authenticate
router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  const promise = User.findOne({username});
  promise.then((user) => {
    if(!user){
      next({message: 'User not found!', code: 102}); // error handle middleware ine next etme
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if(!result){
          next({message: 'Wrong password!', code: 103});
        } else {
          const payload = { username };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {expiresIn: 720});
          res.json({user, token});
        }
      });
    }
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
