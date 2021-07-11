var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var eventRouter = require('./routes/events');

var app = express();

let username = process.env.mongoUsername;
let password = process.env.mongoPassword;
let database = process.env.mongoDatabase;

let dbhost = process.env.mongoHost;
let dbport = process.env.mongoPort;

let mongoUrl = `mongodb://${username}:${password}@${dbhost}:${dbport}/${database}`;
console.log(mongoUrl)

mongoose.connect(mongoUrl, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.use(cors())

app.use('/api', eventRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
