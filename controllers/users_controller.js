const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async (req, res)=> {
    let user = await User.findById(req.params.id);
      return res.render('user', {
        title: 'User Profile',
          h1: 'Users Profile Page Visited!',
            profile_user:user
        })
}

// Updating user's profile
// module.exports.update = (req, res) => {
//     if (req.user.id == req.params.id) {
//         User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//             return res.redirect('back');
//         })
//     }else
//     return res.status(404);
// }
module.exports.update = async (req, res) => {
        if (req.user.id == req.params.id)
        {
            try
            {
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req, res, (err) => {
                    if (err) { console.log('********* MULTER', err) };
                
                    user.name = req.body.name;
                    user.email = req.body.email;

                    if (req.file) {

                        if (user.avatar)
                        {
                            fs.unlinkSync(path.join(__dirname, "..", user.avatar));    
                        }
                        user.avatar = User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    req.flash('success', 'Profile updated succesfully');
                    return res.redirect('back');
                });
            }
            catch (err) {
                req.flash('error', "Failed to upload file");
                return res.redirect('back');
            }    
        }
}

// Render the sign up page
module.exports.signUp = (req, res)=>{

    if (req.isAuthenticated())
    {
        return res.redirect('/users/profile/:id');    
    }
    return res.render('signup', {
        title:"Codeial | SignUp"
    })
}

// Render the sign in page
module.exports.login = (req, res)=>{
    if (req.isAuthenticated())
    {
        return res.redirect('/users/profile/:id');    
    }

    return res.render('login', {
        title:"Codeial | SignIn"
    })
}

// get the sign up data

module.exports.create = (req, res) =>{
    if (req.body.password != req.body.confirmpass) {
        req.flash('error', 'Password doesnt match');
        return res.redirect('back');
    }
    
        User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {  req.flash('error', 'Mail id doesnt exist'); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { req.flash('error', 'User Not Found'); return; }
                req.flash('success', 'User Successfully created');
                return res.redirect('/users/login');
            })
        } else
        {
            return res.redirect('back');    
        }
    });
}

// sign in and create a session

module.exports.createSession = (req, res) => {
    req.flash('success','Succesfully Logged In!')
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) { console.log('Error in destroying session'); return; }
        req.flash('sucess', 'Logged Out!!');
    });
    return res.redirect('/');
}