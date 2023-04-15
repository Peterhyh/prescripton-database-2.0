const express = require('express');
const registerUserRouter = express.Router();
const RegisterUser = require('../models/registerUser');

registerUserRouter.route('/')
    .get((req, res, next) => {
        RegisterUser.find()
            .then(user => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            })
            .catch(error => next(error));
    })

    .post((req, res, next) => {
        RegisterUser.findOne({ username: req.body.username })
            .then(user => {
                if (user) {
                    console.log(user)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Username already exists');
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
        RegisterUser.deleteMany()
            .then(response => {
                console.log(response);
            })
    })

module.exports = registerUserRouter;