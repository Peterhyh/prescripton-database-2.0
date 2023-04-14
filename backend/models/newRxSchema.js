const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newRxSchema = new Schema({
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
    },
    drug: {
        type: String,
        require: true
    },
    quanity: {
        type: Number,
        require: true
    },
    refills: {
        type: Number,
        require: true
    },
    daySupply: {
        type: Number,
        require: true
    },
    direction: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

const NewRx = mongoose.model('NewRx', newRxSchema);

module.exports = NewRx;