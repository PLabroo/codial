const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Codeial'
}

passport.use(new JWTStrategy(opts, (jwtPayLoad, done) => {
    
    User.findById(jwtPayLoad._id, (err, user) => {
        
        if (err) { console.log("Error in finding user from JWT"); return; }

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })

}))

module.exports = passport;