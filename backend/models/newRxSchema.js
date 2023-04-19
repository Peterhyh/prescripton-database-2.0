const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newRxSchema = new Schema({
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