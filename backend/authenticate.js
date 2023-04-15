const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/userSchema');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); //create, sign, and verify tokens
const config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate())) //adding specific strategy plugin we want to our passport implementation. This requires a verify callback function to verify the locally stored usernames and passwords, we will be using the authenticate method from the passport-local-mongoose plugin.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = user => {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 }) //creating a token with this .sign() method. 1st argu. is the user, 2nd is the secretkey, and 3rd is the token expiration time (1 hour).
};

//configuring the jwt strategy
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() //fromAuthHeaderAsBearerToken is a method from ExtractJwt. This will send the token through the header (most simpliest way).
options.secretOrKey = config.secretKey; //secretOrKey option lets us supply the JwtStrategy with the key to sign the token.


exports.jwtPassport = passport.use(
    new JwtStrategy( //JwtStrategy requires 2 arguments: 1st: object with configuration options & 2nd: verify callback function which contains: 'jwt_payload'(obj litteral that contains the decoded JWT payload) and 'done'(accepts only 'error', 'user', and 'info')
        options,
        (jwt_payload, done) => {
            console.log('JWT payload object:', jwt_payload);
            User.findOne({ _id: jwt_payload._id }, (err, user) => {
                if (err) {
                    return done(err, false); //to indicate no user was found
                } else if (user) {
                    return done(null, user); //if the wasnt an error, we will check if a user was found, if so, return the done with a null to indicate there wasn't an error. Passport will be using this done callback to access the user document so it could load information from it to the request obj. this done callback is written in the passport-jwt module
                } else {
                    return done(null, false); //if we reach this else block, it means that there were no error and no user doc was found that matches the token
                }
            });
        }
    )
);

exports.verifyUser = passport.authenticate('jwt', { session: false }); //use this to verify the incoming request from an authenticated user with 'jwt' strategy. 'session: false' means that we are not using sessions