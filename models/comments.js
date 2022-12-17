const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }
}, {
    timestamps:true
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;