const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');

queue.process('emails', (job, done) => {
    console.log("Emails worker", job.data);

    commentMailer.newComment(job.data);

    done();
})