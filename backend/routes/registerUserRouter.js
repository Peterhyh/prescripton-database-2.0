const express = require('express');
const registerUserRouter = express.Router();
const User = require('../models/userSchema');

registerUserRouter.route('/')
    .get((req, res, next) => {
        User.find()
            .then(user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(error => next(error));
    })

    .post((req, res, next) => {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    console.log(user)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Username already exists');
                } else {
                    User.create(req.body)
                        .then(user => {
                            console.log(user)
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end('Account was created successfully!')
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    })


    .put((req, res) => {
        res.statusCode = 200;
        res.end('PUT method is not supported on /registerUser');
    })
    .delete((req, res) => {
        User.deleteMany()
            .then(response => {
                console.log(response);
            })
    })

module.exports = registerUserRouter;