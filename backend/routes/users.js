const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    })
    .catch(err => next(err));
});


router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword }
    User.create(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
});


router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(async user => {
      if (user == null) {
        res.status(201).send('No user found')
      } else if (user) {
        try {
          if (await bcrypt.compare(req.body.password, user.password)) {
            return res.send('Success!')
          } else {
            res.status(201).send('Not allowed')
          }
        } catch {
          res.status(500).send()
        }
      } else {
        res.status(500).send()
      }
    })
    .catch(error => {
      console.log(error);
    })
});









router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    const error = new Error('You are not logged in!');
    error.status = 401;
    return next(error);
  }
});

router.delete('/', (req, res, next) => {
  User.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
});

module.exports = router;