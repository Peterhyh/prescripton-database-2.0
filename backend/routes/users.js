const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = require('../authenticate');
const User = require('../models/userSchema');


router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    })
    .catch(err => next(err));
});

router.post('/signup', passport.authenticate('local'), (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    } else {
      if (req.body.firstName) {
        user.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.lastName = req.body.lastName;
      }
      if (req.body.email) {
        user.email = req.body.email
      }
      user.save(err => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ success: true, status: 'Registration Successful!' });
        });
      });
    }
  }
  );
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const token = authenticate.getToken({ _id: req.user._id }); //once username and password are authenticated, we issue the jwt token. This obj. container a payload that is === to req.user._id
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' }); //provide the user the token here so that every time the user makes a req, the token will be in the header to verify access.
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