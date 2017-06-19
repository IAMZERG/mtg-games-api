var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var config = require('./config/main.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var port = process.env.PORT || config.port;
app.set('port', config.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.use(bodyParser.json());

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/games");

var db = mongoose.connection;

db.on("error", function(err) {
        console.error("connection error: ", err);
});

db.once("open", function() {
        console.log("Database connection successful!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
// /api/v1/games....

app.use('/users', users);
// /api/v1/register
// /api/v1/login

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



/***********************************
	End of auth setup, start of requiring auth
	**********************************/

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

//Roles

// Constants for role types
const REQUIRE_ADMIN = "Admin",  
			REQUIRE_OWNER = "Owner",
			REQUIRE_CLIENT = "Client",
			REQUIRE_MEMBER = "Member";





// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(port, function(){
        console.log("Express server is listening on port: " + port);
});

module.exports = app;
