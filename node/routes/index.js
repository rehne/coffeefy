var fs = require('fs');
var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var os = require('os');
var gpio = null;
var config = require('../public/config.json');
var mqtt = require('mqtt');
var distance;
var device_is_working = 0;

/* Check whether the server is running on a win32- or darwin-based machine.
Useful for testing the node.js-part on a machine other than a raspberry pi */
if (!(os.platform() === 'darwin' || os.platform() === 'win32')) {
  gpio = require('rpi-gpio');
};

var mqtt_client = mqtt.connect("mqtt://" + config.address + ":" + config.mqtt);
var ws_client = "ws://" + config.address + ":" + config.ws;

/* GET resource "/" aka homepage */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coffeefy',
                        distance: distance,
                        status: device_is_working,
                        address: ws_client
  });
  res.end();
});

// GET resource "/python/makeSmallCoffee" aka make small coffee
router.get('/python/makeSmallCoffee', function(req, res, next){
  makeSmallCoffee();
  res.end();
});
// GET resource "/python/makecoffee" aka make big coffee
router.get('/python/makeBigCoffee', function(req, res, next){
  makeBigCoffee();
  res.end();
});

module.exports = router;

// Functions
function makeSmallCoffee(){
  device_is_working = 1;
  console.log(device_is_working);
  var pyshell_makecoffee = new pythonshell('../python/makeSmallCoffee.py');
  pyshell_makecoffee.on('message', function (message){
    console.log(message);
  });
  pyshell_makecoffee.end(function (err) {
    device_is_working = 0;
    console.log(device_is_working);
  });
}
function makeBigCoffee(){
  device_is_working = 1;
  var pyshell_makecoffee = new pythonshell('../python/makeBigCoffee.py');
  pyshell_makecoffee.on('message', function (message){
    console.log(message);
  });
  pyshell_makecoffee.end(function (err) {
    device_is_working = 0;
    console.log(device_is_working);
  });
}
