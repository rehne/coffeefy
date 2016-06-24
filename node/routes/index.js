var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var gpio = require('rpi-gpio');
var mqtt = require('mqtt');
var client = mqtt.connect("ws://iot.eclipse.org:80/ws");
var data;

/* GET resource "/" aka homepage */
router.get('/', function(req, res, next) {
    data = readUltrasonicSensor();
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
// GET resource "/scripts/powerbtn/" aka run powerbutton test
/* router.get('/scripts/powerbtn/', function(req, res, next){
    runbuttontest();
    res.end();
}); */
// GET resource "/scripts/makecoffee" aka make coffee
/* router.get('/scripts/makecoffee/', function(req, res, next){
    makecoffeePython();
    res.end();
}); */

// NODE.JS
//GET resource "/scripts/powerbtn" aka run powerbutton test */
router.get('/powerbtn', function(req, res){
  pressPowerButton();
  res.end();
});
// GET resource "/scripts/makesmallcoffee" aka make coffee
router.get('/makesmallcoffee', function(req, res, next){
  makeSmallCoffee();
  res.end();
});
// GET resource "/scripts/makebigcoffee" aka make coffee
router.get('/makebigcoffee', function(req, res, next){
  makeBigCoffee();
  res.end();
});

module.exports = router;

// NODE.JS functions
function pressPowerButton(){
  gpio.setMode(MODE_BCM);
  gpio.setup(19, gpio.DIR_OUT);
  gpio.write(19, 1, function(err){
    if(err) throw err;
    client.publish('coffeefy/messages', 'On Knopf gedrueckt');
    console.log('On Knopf gedrueckt');
  });
  setTimeout(500);
  gpio.write(19, 0, function(err){
    if(err) throw err;
    client.publish('coffeefy/messages', 'On Knopf losgelassen. Maschine laeuft');
    console.log('On Knopf losgelassen. Maschine laeuft.');
  });
}
function makeSmallCoffee(){
  pressPowerButton();
  wait(90);
  gpio.setMode(MODE_BCM);
  gpio.setup(13, gpio.DIR_OUT);
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
  gpio.setup(26, gpio.DIR_OUT);
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
function wait(time){
  for(var i = time; i == 0; i--){
    client.publish('coffeefy/messages', 'waiting.. ' + i);
    console.log('waiting.. ' + i);
    setTimeout(1000);
  }
}

// PYTHON functions
//TODO: Testen, ob readUltrasonicSensor() und makecoffee() sich nicht gegenseitig behindern.
function runbuttontest(){
    var pyshell_power = new pythonshell('../python/powerbtn.py');
    pyshell_power.on('message', function (message){
        console.log(message);
    });
}
function makecoffeePython(){
    var pyshell_makecoffee = new pythonshell('../python/makecoffee.py');
    pyshell_makecoffee.on('message', function (message){
        console.log(message);
    });
}
function readUltrasonicSensor(){
    var data;
    pythonshell.run('../python/ultrasonic.py', function(err, results){
        if (err) throw err;
        data = results;
    });
    return data;
}
