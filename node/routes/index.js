var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var gpio = require('rpi-gpio');
var mqtt = require('mqtt');
var client = mqtt.connect("mqtt://iot.eclipse.org", 1883, 60);
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

/* GET resource "/scripts/powerbtn/" aka run powerbutton test */
/* PYTHON */
/*router.get('/scripts/powerbtn/', function(req, res, next){
    runbuttontest();
    res.end();
});*/
/* NODE.JS */
router.get('scripts/powerbtn/', function(req, res){
  buttonOnOffTest();
  res.end();
});

/* GET resource "/scripts/makecoffee" aka make coffee */
/* PYTHON */
/*router.get('/scripts/makecoffee/', function(req, res, next){
    makecoffeePython();
    res.end();
});*/
/* NODE.JS */
router.get('/scripts/makecoffee/', function(req, res, next){
  makeCoffeePython();
  res.end();
});

module.exports = router;

function buttonOnOffTest(){
  var sig = 19;
  gpio.setMode(MODE_BCM);
  gpio.setup(sig, gpio.DIR_OUT);
  gpio.write(sig, 0, function(err){
    if(err) throw err;
    console.log('written to pin (off)');
  });
  gpio.write(sig, 1, function(err){
    if(err) throw err;
    console.log('written to pin (on)');
  });
  setTimeout(500);
  gpio.write(sig, 0, function(err){
    if(err) throw err;
    console.log('written to pin (off)');
  });
  mqtt.publish('coffeefy/messages', 'Maschine laeuft.');
  console.log('ON');
  setTimeout(1000);
  gpio.write(sig, 1, function(err){
    if(err) throw err;
    console.log('written to pin (on)');
  });
  setTimeout(500);
  gpio.write(sig, 0, function(err){
    if(err) throw err;
    console.log('written to pin (off)');
  })
  gpio.destroy(function(){
    mytt.publish('coffeefy/messages', 'Maschine ist ausgeschaltet.');
    console.log('OFF');
  });
}

function makeCoffee(){
  var pow = 19;
  var cup1 = 13;
  gpio.setMode(MODE_BCM);
  gpio.setup(pow, gpio.DIR_OUT);
  gpio.setup(cup1, gpio.DIR_OUT);

  // Kaffeemaschine einschalten
  pressPowerButton();

  // 90 Sekunden warten
  for(var i = 90; i == 0; i--){
    mqtt.publish('coffeefy/messages', 'Heating water.. ' + i);
    console.log('Heating water.. ' + i);
    setTimeout(1000);
  }

  // Auswahl des 1Cup Programms
  press1CupButton();

  // 30 Sekunden warten
  for(var i = 30; i == 0; i--){
    mqtt.publish('coffeefy/messages', 'Brewing the coffee for 1 cup.. ' + i);
    console.log('Brewing coffee.. ' + i);
    setTimeout(1000);
  }
  mqtt.publish('coffeefy/messages', 'Done!');
  pressPowerButton();
}
function pressPowerButton(){
  gpio.write(sig, 1, function(err){
    if(err) throw err;
    mqtt.publish('coffeefy/messages', 'On Knopf gedrueckt');
    consol.log('On Knopf gedrueckt');
  });
  setTimeout(500);
  gpio.write(sig, 0, function(err){
    if(err) throw err;
    mqtt.publish('coffeefy/messages', 'On Knopf losgelassen. Maschine laeuft');
    console.log('On Knopf losgelassen. Maschine laeuft.');
  });
}
function press1CupButton(){

}
function press2CupButton(){

}

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
