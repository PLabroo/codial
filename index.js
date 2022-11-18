const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// app.use(cookieParser);
app.use(cookieParser());

// Accessing forms and data-->requests
app.use(express.urlencoded({ extended: true }));

// Accessing Static Files - Assests
app.use(express.static('./assests'));
// Layout Usage
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Setting up static files using express
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/'));

// setting up view engine-ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err)
    {
        console.log(`Error in firing express server: ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})