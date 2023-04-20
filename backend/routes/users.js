const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');


const router = express.Router();




function authToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.sendStatus(403)
    }
    req.user = user
    next()
  })
};

module.exports = authToken;







router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => next(err));
});


router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }
    User.create(user)
      .then(user => {
        console.log(user);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Account registered successfully');
      }
      )
      .catch(err => {
        res.status(409).end('Username/email already been used.')
      });
  } catch { res.send('ERROR') }
});


router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(async user => {
      if (user == null) {
        res.status(201).send('No user found')
      } else if (user) {
        try {
          if (await bcrypt.compare(req.body.password, user.password)) {
            const authUser = user.username
            const accessToken = jwt.sign(authUser, process.env.SECRET_KEY)
            res.json({ accessToken: accessToken, success: 'You are now logged in!' })
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



