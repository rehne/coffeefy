var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var gpio = require('rpi-gpio');
var mqtt = require('mqtt');
var client = mqtt.connect("ws://iot.eclipse.org:80/ws");
var data;

/* GET resource "/" aka homepage */
router.get('/', function(req, res, next) {
    data = readUltrasonicSensorPython();
    res.render('index', { title: 'Coffeefy', distance: data });
    res.end();
});

/* GET resource "/test" aka secret page for testing purposes*/
router.get('/test', function(req, res, next){
    res.render('test');
});

/* GET resource "/scripts/1" aka run script "helloworld.py" */
router.get('/scripts/1/', function(req, res, next){
    pythonshell.run('../python/helloworld.py', function(err, results){
        if (err) throw err;
        console.log('results: %j', results);
    });
    res.render('test');
    res.end();
});

// PYTHON
// GET resource "/python/powerButton" aka run powerbutton test
router.get('/python/powerButton', function(req, res, next){
    runbuttontest();
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
  console.log('Test');
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
  gpio.write(19, gpio.DIR_OUT, write);
  function write(){
    gpio.write(19, true, function(err){
      if(err) throw err;
      console.log('written to pin');
    })
  }
  setTimeout(gpio.destroy(), 500);
}
function write(){
  gpio.write(19, true, function(err){
    if(err) throw err;
    console.log('written to pin');
  })
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
//TODO: Testen, ob readUltrasonicSensor() und makecoffee() sich nicht gegenseitig behindern.
function runbuttontest(){
    var pyshell_power = new pythonshell('../python/powerbtn.py');
    pyshell_power.on('message', function (message){
        console.log(message);
    });
}
function makeSmallCoffeePython(){
    var pyshell_makecoffee = new pythonshell('../python/makeSmallCoffee.py');
    pyshell_makecoffee.on('message', function (message){
        console.log(message);
    });
}
function makeBigCoffeePython(){
    var pyshell_makecoffee = new pythonshell('../python/makeBigCoffee.py');
    pyshell_makecoffee.on('message', function (message){
        console.log(message);
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
