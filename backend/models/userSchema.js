const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose); //provides authenticate method and hashing and salting the passwords.

const User = mongoose.model('User', userSchema);

module.exports = User;