const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

// Setting up auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');

// Used to save the login(session-cookie) even after the server restart in db
const MongoStore = require('connect-mongo')(session);

// Scss/Sass-->Middleware(to css)
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: 'true',
    outputStyle: 'extended',
    prefix: '/css'
}));

// Accessing forms and data-->requests(only used for post/PUT requests)
app.use(express.urlencoded({ extended: true }));

// Accessing Static Files - Assests
app.use(express.static('./assests'));
// Layout Usage
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Setting up static files using express
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up view engine-ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Codeial',
    // TODO change secret before deployment
    secret: 'blahsometing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
    {
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes/'));

app.listen(port, function (err) {
    if (err)
    {
        console.log(`Error in firing express server: ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);
})