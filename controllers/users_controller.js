module.exports.profile = function (req, res) {
    res.render('user', {
        title: 'User Profile',
        h1:'Users Profile Page Visited!'
    })
}