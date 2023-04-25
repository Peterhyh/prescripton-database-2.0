const express = require('express');
const selectedPatientRouter = express.Router();
const Patient = require('../models/patient');

selectedPatientRouter.route('/')
    .get((req, res) => {
        res.sendStatus(400);
    })
    .post((req, res, next) => {
        Patient.findOne(req.body._id)
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            })
            .catch(err => next(err));
    })

    .put((req, res) => {
        res.sendStatus(400);
    })

    .delete((req, res) => {
        res.sendStatus(400);
    })

module.exports = selectedPatientRouter;