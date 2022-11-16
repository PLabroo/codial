const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial-dev');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connectong to Mongo DB'));

db.once('open', function () {
    console.log('Connected to database::Mongo-DB');
})

module.exports = db;