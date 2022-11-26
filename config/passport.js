const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


// Authenticated the user-->signed in the user
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function (email, password, done)
    {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user-->passport:', err);
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password!');
                return done(null, false);
            }

            return done(null, user);
        })
    }));

// Set up the cookie with the help of id

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Searched the user/cookie with the id(property)
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user-->passport:', err);
            return done(err);
        }

        return done(null, user);
    });
});


// check if user is authenticated-->creating middlewares

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/users/login');
}

// 
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user and we send this for views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;