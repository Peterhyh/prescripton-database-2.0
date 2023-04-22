const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const authorization = require('../authorization');

const router = express.Router();


const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: 3600 })
}





router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(err => next(err));
});






router.post('/signup', async (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.sendStatus(409)
      } else {
        User.findOne({ email: req.body.email })
          .then(email => {
            if (email) {
              return res.sendStatus(410);
            } else {
              res.sendStatus(200);
              return next()
            }
          })
          .catch(err => console.log('---Email Error: ', err))
      }
    })
    .catch(err => console.log('---Username Error: ', err))

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = {
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };
  User.create(user)
    .then(user => {
      console.log('---NEW USER:', user);
    })
    .catch(err => console.log(err));
});







router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(async (user) => {
      if (user == null) {
        return res.sendStatus(400);
      }
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const user = { username: req.body.username };
          const accessToken = generateAccessToken(user);
          const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY);
          refreshTokens.push(refreshToken);
          res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
          res.sendStatus(409);
        }
      } catch {
        res.sendStatus(500);
      }
    })
    .catch(err => next(err));
});










let refreshTokens = [];

router.get('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken: accessToken })
  });
});







router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204);
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



