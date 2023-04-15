const express = require('express');
const loginRouter = express.Router();
const User = require('../models/userSchema');

loginRouter.route('/')
    .get((req, res) => {
        res.statusCode = 403;
        res.end('GET method is not supported on /login');
    })
    .post((req, res, next) => {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user.password !== req.body.password) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Incorrect username/password, please try again.')
                } else if (user.password === req.body.password) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Access granted');
                } else {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Server error');
                }
            })
            .catch(error => next(error))
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT method is not supported on /login');
    })
    .delete((req, res) => {
        res.statusCode = 403;
        res.end('DELETE method is not supported on /login');
    })

module.exports = loginRouter;