const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// Accessing forms and data-->requests
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser);
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