var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var data;

/* GET resource "/" aka homepage */
router.get('/', function(req, res, next) {
    data = readUltrasonicSensor();
    res.render('index', { title: 'Coffeefy', distance: data });
    res.end;
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
router.get('/scripts/powerbtn/', function(req, res, next){
    runbuttontest();
    res.end();
});

/* GET resource "/scripts/makecoffee" aka make coffee */
router.get('/scripts/makecoffee/', function(req, res, next){
    makecoffee();
    res.end();
});

/* run script "exampleTimedOutputs.py" */
/*router.get('/scripts/2/', function(req, res, next){
    runscript();

    res.end();
});*/

module.exports = router;

/*function runscript(){
    var pyshell = new pythonshell('../python/exampleTimedOutputs.py');
    pyshell.on('message', function (message){
        console.log(message);
    });
};*/
//TODO: Testen, ob readUltrasonicSensor() und makecoffee() sich nicht gegenseitig behindern. 
function runbuttontest(){
    var pyshell_power = new pythonshell('../python/powerbtn.py');
    pyshell_power.on('message', function (message){
        console.log(message);
    });
}
function makecoffee(){
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
