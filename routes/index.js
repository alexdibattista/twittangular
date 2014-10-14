var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', 
     {  
      helpers: {
        json: function(context) { return JSON.stringify(context); } 
      } 
  });

});

module.exports = router;
