const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {

        // populate likes also for each each post and each comment
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            }).populate('likes');
        
            let users = await User.find({});
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users
    });
    } catch (err) {
        console.log('Error', err);
    }
     
}