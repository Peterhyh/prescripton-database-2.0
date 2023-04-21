const express = require('express');
const newRxRouter = express.Router();
const NewRx = require('../models/newRxSchema');
const authorization = require('../authorization');

newRxRouter.route('/')
    .get(authorization.verifyToken, (req, res, next) => {
        NewRx.find()
            .then(rxData => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rxData);
            })
            .catch(err => next(err));
    })

    .post(authorization.verifyToken, (req, res, next) => {
        NewRx.findOne({ lastName: req.body.lastName })
            .then(data => {
                if (data) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('Last name has already been added to the database.');
                } else {
                    NewRx.create(req.body)
                        .then(data => {
                            console.log(data);
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.json('Data was added to the database successfully.');
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    })

    .put(authorization.verifyToken, (req, res) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT method not supported yet')
    })

    .delete(authorization.verifyToken, (req, res, next) => {
        NewRx.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = newRxRouter;