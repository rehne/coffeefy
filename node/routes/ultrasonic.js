var express = require('express');
var python = require('python-shell');
var script = new python('../python/test.py');
var router = express.Router();
var data;

/* running python script */
script.on('message', function(message){
  data = message;
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('ultrasonic', {title: 'Ultrasonic', distance: data});
  res.status(200).end();
});

module.exports = router;
