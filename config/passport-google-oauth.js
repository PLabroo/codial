const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');


// Tell passport to use new Strategy(social/3rd party in this)
passport.use(new googleStrategy({
        clientID: "940435809531-mu7ssguudffae15s31dp3o7im06dmtg3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL:"http://localhost:3000/users/auth/google/callback"
    },
    (accessToken, refreshToken,profile,done) => {
        User.findOne({ email: profile.emails[0].value }).exec((err, user) => {
            if (err) { console.log("Error in oauth"); return; }

            console.log(profile);

            if (user) {
                // if found set this user as req.user(signed in user)
                return done(null,user)
            } else
            {
                // Otherwise create user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, (err, user) => {
                    if (err) { console.log("Error in creating user within oauth"); return; }

                    return done(null, user);
                })
            }
        })
    }
))

module.exports = passport;