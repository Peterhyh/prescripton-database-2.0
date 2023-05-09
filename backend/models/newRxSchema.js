const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({

}, {
    timestamps: true
});


const newRxSchema = new Schema({
    patientId: {
        type: String,
        require: true
    },
    drug: {
        type: String,
    },
    direction: {
        type: String,
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
}, {
    timestamps: true
});

const NewRx = mongoose.model('NewRx', newRxSchema);

module.exports = NewRx;