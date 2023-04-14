const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerUserSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const RegisterUser = mongoose.model('RegisterUser', registerUserSchema);

module.exports = RegisterUser;