const express = require('express');
const registerUserRouter = express.Router();
const RegisterUser = require('../models/registerUser');

registerUserRouter.route('/')
    .get((req, res) => {
        res.statusCode = 200;
        res.end('GET method is not supported on /registerUser');
    })
    .post((req, res, next) => {
        RegisterUser.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Username already exists')
                } else {
                    RegisterUser.create(req.body)
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
        res.statusCode = 200;
        res.end('delete method is not supported on /registerUser');
    })

module.exports = registerUserRouter;