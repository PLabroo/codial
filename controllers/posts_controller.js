const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');


module.exports.createPost = async (req, res) => {  
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        // Use to find name from user schema
        // post = await post.populate("user", "name");
        // console.log(post);
        if (req.xhr) {
            // console.log("Hello!");
            post.user = req.user;
            return res.status(200).json({
                data: {
                    post:post
                },
                message:"Post created!"
            })
        }
        // req.flash('success', 'Post published!!');
        return res.redirect('back'); 
    } catch (err) {
        req.flash('Error', err);
         return res.redirect('back'); 
    }
}


module.exports.destroy = async (req, res) => {

    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object ID to string
        // Check whether user has access to delete the post so comparing

        if (post.user == req.user.id) {
            // delete the associated likes for the post and all its comments also
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.comments } })
            await Comment.deleteMany({ post: req.params.id });

            post.remove();

            
            if (req.xhr) {
                
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message:'Post Deleted'
                })
                
            }
            // req.flash('success', 'Post successfully deleted!');
            return res.redirect('back');
        }
        else
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'U dont have access to delete the post!');
        return res.redirect('back');
    }
}