const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async (req, res) => {
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path:'user'
            }
        })
    return res.status(200).json({
        message: "List of posts",
        posts:posts
    })    
}

module.exports.destroy = async (req, res) => {
    try {
            let post = await Post.findById(req.params.id);
            // .id means converting the object ID to string
            // Check whether user has access to delete the post so comparing
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
            // req.flash('success', 'Post successfully deleted!');
            return res.status(200).json({
                message: 'Post and comments deleted'
                })
            }
        else {
            return res.status(401).json({
                message:"You can't delete this post"
            })
            }
        }
        catch (err) {
        // req.flash('error', 'U dont have access to delete the post!');
            console.log(err);
            return res.status(500).json({
                message: "Internal Server Error"
                })
        }
}