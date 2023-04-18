const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('User', User);