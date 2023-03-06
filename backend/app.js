var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


//Routers
var retrieveProcedureData = require('./data/retrieveProcedureData');
//http://localhost.com:3001/savingCustomizedData
var savingCustomizedData = require('./data/savingCustomizedData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '1000mb'}));
app.use(express.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Router Connector
app.use('/retrieveProcedureData', retrieveProcedureData);
app.use('/savingCustomizedData', savingCustomizedData)
{
    console.log("hi");
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
