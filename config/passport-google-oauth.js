const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// Tell passport to use new Strategy(social/3rd party in this)
passport.use(new googleStrategy({
        clientID: env.google_clientID,
        clientSecret: env.google_clientSecret,
        callbackURL:env.google_callbackURL
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