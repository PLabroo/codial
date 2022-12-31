const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

// Used for view helpers after minifying
require('./config/view_helper')(app);
const port = 3000;
const db = require('./config/mongoose');

// Setting up auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth');

// Used to save the login(session-cookie) even after the server restart in db
const MongoStore = require('connect-mongo')(session);

// Scss/Sass-->Middleware(to css)
const sassMiddleware = require('node-sass-middleware');

// Connect flash for animated notifications
const flash = require('connect-flash');

const customMware = require('./config/middleware');

// Setting up for socket
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server listening on 5k")

const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname,env.assetPath,'scss'),
    dest: path.join(__dirname,env.assetPath,'css'),
    debug: false,
    outputStyle: 'extended',
    prefix: '/css'
}));

// Accessing forms and data-->requests(only used for post/PUT requests)
app.use(express.urlencoded({ extended: true }));

// Accessing Static Files - Assests
app.use(express.static(env.assetPath));

// make the uploads path available to user(static method);
app.use('/uploads', express.static(__dirname + '/uploads'));

// FOR RFS
app.use(logger(env.morgan.mode, env.morgan.options));
// Layout Usage
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// Setting up static files using express for layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up view engine-ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Codeial',
    // TODO change secret before deployment
    secret: env.sessionCookie,
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
app.use(flash());
app.use(customMware.setFlash);

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