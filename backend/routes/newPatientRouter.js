const express = require('express');
const Patient = require('../models/patient');
const newPatientRouter = express.Router();

newPatientRouter.route('/')
    .get((req, res, next) => {
        Patient.find()
            .then(patient => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(patient.splice(0, 5))
            })
            .catch(err => {
                console.log(err);
            })
    })

    .post((req, res, next) => {
        Patient.create(req.body)
            .then(patient => {
                console.log(patient);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('success')
            })
            .catch(err => {
                console.log(err);
            })
    })

    .put((req, res, next) => {
        Patient.findOneAndUpdate(req.body.lastName)
            .then(patient => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(patient)
            })
            .catch(err => {
                console.log(err);
            })
    })

    .delete((req, res, next) => {
        Patient.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            })
            .catch(err => {
                console.log(err);
            })
    });

module.exports = newPatientRouter;