var express = require('express');
var router = express.Router();
var request = require('request');
var crypto = require('crypto');
var oAuth = require('oauth');
var conf = require('../conf');



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', 
     {  
      helpers: {
        json: function(context) { return JSON.stringify(context); } 
      } 
  });

});


router.get('/user_timeline', function(req, res) {
    console.log(req.session.auth.twitter.accessToken);
    console.log("sec"+req.session.auth.twitter.accessTokenSecret);
    var oauth = new oAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  conf.twitter.consumerKey,
  conf.twitter.consumerSecret,
  '1.0A',
  null,
  'HMAC-SHA1'
);
    oauth.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json',
      req.session.auth.twitter.accessToken, 
      req.session.auth.twitter.accessTokenSecret,


      function (e, data, resp){
        console.log(data);
        var feed = JSON.parse(data);
        res.render('user_timeline', 
           {  
            user: data,
            helpers: {
              json: function(context) { return JSON.stringify(context); } 
            } 
        });
      });
});

module.exports = router;
