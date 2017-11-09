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

// PYTHON
// GET resource "/python/powerButton" aka run powerbutton test
router.get('/python/powerButton', function(req, res, next){
  pressPowerButton();
  res.end();
});
// GET resource "/python/makeSmallCoffee" aka make small coffee
router.get('/python/makeSmallCoffee', function(req, res, next){
  makeSmallCoffeePython();
  res.end();
});
// GET resource "/python/makecoffee" aka make big coffee
router.get('/python/makeBigCoffee', function(req, res, next){
  makeBigCoffeePython();
  res.end();
});

// NODE.JS
// GET resource "/node/powerButton" aka run powerbutton test */
router.get('/node/powerButton', function(req, res, next){
  pressPowerButton();
  res.end();
});
// GET resource "/node/makeSmallCoffee" aka make small coffee
router.get('/node/makeSmallCoffee', function(req, res, next){
  makeSmallCoffee();
  res.end();
});
// GET resource "/node/makeBigCoffee" aka make big coffee
router.get('/node/makeBigCoffee', function(req, res, next){
  makeBigCoffee();
  res.end();
});

module.exports = router;

// NODE.JS functions
function pressPowerButton(){
  gpio.setMode(MODE_BCM);
  gpio.setup(19, DIR_OUT, write);
  gpio.write(19, 1, function(err){
    console.log('pwr Button gedrueckt');
  });
  setTimeout(500);
  gpio.write(19, 0, function(err){
    console.log('pwr Button losgelassen');
  });
  gpio.destroy();
}
function makeSmallCoffee(){
  pressPowerButton();
  wait(90);
  gpio.setMode(MODE_BCM);
  gpio.setup(13, gpio.DIR_OUT, write);
  gpio.write(13, 1, function(err){
    client.publish('coffeefy/messages', '1Cup Button gedrueckt');
    console.log('1Cup Button gedrueckt');
  });
  setTimeout(500);
  gpio.write(13, 0, function(err){
    client.publish('coffeefy/message', '1Cup Button losgelassen');
    console.log('1Cup Button losgelassen');
  });
  wait(40);
  pressPowerButton();
  gpio.destroy();
}
function makeBigCoffee(){
  pressPowerButton();
  wait(90);
  gpio.setMode(MODE_BCM);
  gpio.setup(26, gpio.DIR_OUT, write);
  gpio.write(26, 1, function(err){
    client.publish('coffeefy/messages', '2Cup Button gedrueckt');
    console.log('2Cup Button gedrueckt');
  });
  setTimeout(500);
  gpio.write(26, 0, function(err){
    client.publish('coffeefy/messages', '2Cup Button losgelassen');
    console.log('2Cup Button losgelassen');
  });
  wait(40);
  pressPowerButton();
  gpio.destroy();
}

// PYTHON functions
function runbuttontest(){
  var pyshell_power = new pythonshell('../python/powerbtn.py');
  pyshell_power.on('message', function (message){
    console.log(message);
  });
}
function makeSmallCoffeePython(){
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
function makeBigCoffeePython(){
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
function readUltrasonicSensorPython(){
  var data;
  pythonshell.run('../python/ultrasonic.py', function(err, results){
    if (err) throw err;
    data = results;
  });
  return data;
}
