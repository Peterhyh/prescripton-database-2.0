const express = require('express');
const newRxRouter = express.Router();
const NewRx = require('../models/newRxSchema');

newRxRouter.route('/')
    .get((req, res, next) => {
        NewRx.find()
            .then(rxData => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rxData);
            })
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        NewRx.create(req.body)
            .then(rxData => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rxData);
                console.log(rxData);
            })
            .catch(err => next(err));
    })
    .put((req, res) => {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT method not supported yet')
    })
    .delete((req, res, next) => {
        NewRx.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);
            })
            .catch(err => next(err));
    });

module.exports = newRxRouter;