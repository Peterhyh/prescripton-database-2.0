const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newRxSchema = new Schema({
    rxNumber: {
        type: Number,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    drug: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const NewRx = mongoose.model('NewRx', newRxSchema);

module.exports = NewRx;