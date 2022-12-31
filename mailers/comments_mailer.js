const nodemailer = require('../config/nodemailer');


// Another way of exporting
// module.exports = newComment(where newComment will be defined above)
exports.newComment = (comment) => {
    console.log("Inside new comment mailer");

    let htmlString = nodemailer.renderTemplate({ comment: comment }, 'comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'labrooprateek@gmail.com',
        to: comment.user.email,
        subject: "New Comment published",
        html:htmlString
    }, (err, info) => {
        if (err) { console.log("Error in sending mail", err); return; }

        console.log("Mail delivered", info);
        return;
    })
}