const Comment = require('../models/comments');
const Posts = require('../models/posts');
const Like = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const { post } = require('../routes');

module.exports.createComment = async(req, res) => {
        try {
            let post = await Posts.findById(req.body.post);
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                posts: req.body.post
            });
            
            post.comments.push(comment);
                // populate("user", "name");
            post.save();

            // Automatically get the comment id and push into array(Comments is an arr in post schema)
            comment = await comment.populate("user", "name email");
            // console.log(comment);
            
            // This is to send the mail when user comments
            // commentsMailer.newComment(comment);

            let job = queue.create('emails', comment).save((err) => {
                if (err) { console.log("Error in sending to queue", err); return; }

                console.log("job enqueued", job.id);
            })
            // console.log('@');
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: 'Comment created'
                })
            }
            // req.flash('success', 'Successfully commented');
            return res.redirect('back');   
        }

        catch (err) {
            if (err) { req.flash('error', 'Cant comment on this post'); return; }
        }
}

module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id); 

        if (comment) {
           if (comment.user == req.user.id) {
            // Because we need to remove the deleted comment from post also and update
            let postID = comment.post;
            comment.remove();
               let post = Posts.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });
               await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' });
            
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message:'Comment Deleted'
                })
            }
            req.flash('success', 'Comment deleted');
            return res.redirect('back');
            } 
        }
        else
        return res.redirect('back');
    }
    catch (err) {
         req.flash('error', 'Error in deleting comment');
    }
}