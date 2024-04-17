// Required Files to make default Connections
require('dotenv').config()
require('./config/index');
require('./models/db');


const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const device = require('express-device');

const app = express();



const whitelistOrigin = [
    'http://localhost:3000',
    'http://localhost:8081',
    'http://localhost:5000',
];
app.use(cors({
    credentials: true,
    origin: whitelistOrigin,
    allowedHeaders: ["X-Access-User", "X-Access-Token", "Device-Type", "Accept", "Accept-Datetime", "Accept-Encoding", "Accept-Language", "Accept-Params", "Accept-Ranges", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Access-Control-Max-Age", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-User", "X-Access-Token", "Authorization", "Age", "Allow", "Alternates", "Authentication-Info", "Authorization", "Cache-Control", "Compliance", "Connection", "Content-Base", "Content-Disposition", "Content-Encoding", "Content-ID", "Content-Language", "Content-Length", "Content-Location", "Content-MD5", "Content-Range", "Content-Script-Type", "Content-Security-Policy", "Content-Style-Type", "Content-Transfer-Encoding", "Content-Type", "Content-Version", "Cookie", "DELETE", "Date", "ETag", "Expect", "Expires", "From", "GET", "GetProfile", "HEAD", "Host", "IM", "If", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Keep-Alive", "OPTION", "OPTIONS", "Optional", "Origin", "Overwrite", "POST", "PUT", "Public", "Referer", "Refresh", "Set-Cookie", "Set-Cookie2", "URI", "User-Agent", "X-Powered-By", "X-Requested-With", "_xser"]
}))
app.use(express.static('views/assets/images'));

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




app.use(cookieParser());
app.use(device.capture());
app.set('trust proxy', true);

/* Middlewares */
const formatRequest = require('./middlewares/formatRequest');
app.use(formatRequest);

const v1Routes = require('./routes');


app.use('/v1', v1Routes);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({
        success: false,
        message: res.locals.message,
        error: res.locals.error
    });
});





module.exports = app;
