module.exports.home = function (req, res) {
    return res.render('home', {
        title:"Home"
    })
}

// module.exports.user = function (req, res) {
//     return res.send("User creation!");
// }

// module.exports.actionName = function(req,res);