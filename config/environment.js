const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    assetPath: './assests',
    sessionCookie: 'blahsometing',
    db: 'codeial-dev',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:'koulnipun1@gmail.com',
            pass: 'pvyxebiznxpyprur'
        },
    },
    google_clientID: "940435809531-mu7ssguudffae15s31dp3o7im06dmtg3.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:3000/users/auth/google/callback",
    jwt_secretKey: 'Codeial',
    morgan: {
        mode: 'dev',
        options:{stream:accessLogStream}
    }
}


const production = {
    name: 'production',
    assetPath: process.env.ASSET_PATH,
    sessionCookie: process.env.sessProdCookie,
    db: 'codeial-prod',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:process.env.smtpUSER,
            pass:process.env.smtpPASS
        },
    },
    google_clientID: process.env.GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CALLBACK_URL,
    jwt_secretKey: process.env.jwtProdKey,
    morgan: {
        mode: 'combined',
        options:{stream:accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENV) == undefined ? development : eval(process.env.CODEIAL_ENV);




