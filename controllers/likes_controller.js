const Like = require('../models/like');
const Post = require('../models/posts');
const Comment = require('../models/comments');


module.exports.toggleLikes = async (req, res) => {
    try {
        // url--likes/toggle/?id=abcd&type=Post(case sensitive)

        let likeable;
        let deleted = false;

        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exists then delete it
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();

            deleted = true;
        }
        else {
            // make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel:req.query.type
            })

            likeable.likes.push(newLike._id);
            likeable.save();
        }

        return res.json(200, {
            message: "Request success",
            data: {
                deleted: deleted
            }
        })
    }
    catch (err) {
        console.log("error");
        return res.status(500).json({
            message:"Server error"
        })
    }
}