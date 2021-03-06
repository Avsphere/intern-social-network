const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config()
const app = express();
const logger = require('./utils/logger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if ( !process.env.NODE_ENV ) {
  logger.log({ level : 'info', message : 'No NODE_ENV supplied, setting to development' })
  process.env.NODE_ENV = 'development'
}
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true
}).then(
  () => {
    logger.log({ level : 'info', message : 'Connected to database!' })
  },
  err => {
    logger.log({ level : 'error', message : 'ERROR - Database connection failed' })
  }
)

require('./passport.js')(passport);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: '12345QWERTY-SECRET',
  name: 'graphNodeCookie',
  resave: false,
  saveUninitialized: false,
  //cookie: {secure: true} // For development only
}));
app.use(passport.initialize());
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routing/masterRouter') );


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
  res.render('error');
});

module.exports = app;
