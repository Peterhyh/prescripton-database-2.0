const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    dateOfBirthMonth: {
        type: Number,
        require: true
    },
    dateOfBirthDay: {
        type: Number,
        require: true
    },
    dateOfBirthYear: {
        type: Number,
        require: true
    },
    street: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zip: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;