const User = require('../models/user');

module.exports.profile = function (req, res) {
    res.render('user', {
        title: 'User Profile',
        h1:'Users Profile Page Visited!'
    })
}

// Render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated())
    {
        return res.redirect('/users/profile');    
    }
    return res.render('signup', {
        title:"Codeial | SignUp"
    })
}

// Render the sign in page
module.exports.login = function (req, res) {
    if (req.isAuthenticated())
    {
        return res.redirect('/users/profile');    
    }
    return res.render('login', {
        title:"Codeial | SignIn"
    })
}

// get the sign up data

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmpass)
        return res.redirect('back');
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding the user with mail id:', err); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log("Error in creating the user", err); return; }
                return res.redirect('/users/login');
            })
        } else
        {
            return res.redirect('back');    
        }
    });
}

// sign in and create a session

module.exports.createSession = function (req, res)
{
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}