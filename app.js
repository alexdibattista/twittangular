var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var everyauth = require('everyauth');
var connect = require('connect');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var conf = require('./conf');
var app = express();

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}


everyauth.everymodule
    .findUserById(function (id, callback) {
    callback(null, usersById[id]);
});

var usersByTwitId = {};

everyauth
  .twitter
    .consumerKey(conf.twitter.consumerKey)
    .consumerSecret(conf.twitter.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
        return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/user_timeline');


// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('alex'));
app.use(session({secret: "cat in the hat"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(everyauth.middleware());

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
