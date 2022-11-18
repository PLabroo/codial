const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                res.render('user_profile', {
                    title: 'My Profile',
                    user:user
                })
            }
        })     
    } else {
        res.redirect('/users/login');
    }
}

// Render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('signup', {
        title:"Codeial | SignUp"
    })
}

// Render the sign in page
module.exports.login = function (req, res) {
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

// get the sign  in data

module.exports.createSession = function (req, res)
{
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding the signed in user', err);
            return res.redirect('/sign-up');
        }
        
        if (user) {
            if (user.password != req.body.password)
            {
                return res.redirect('back');    
            }
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else
        {
            return res.redirect('back');    
        }
    })
}

module.exports.logout = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/');
}