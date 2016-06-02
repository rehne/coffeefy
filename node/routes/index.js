var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');
var data;


//var zerorpc = require("zerorpc");
//var client = new zerorpc.Client();
//client.connect("tcp://127.0.0.1:4242");

/* GET home page. */
router.get('/', function(req, res, next) {
    pythonshell.run('../python/ultrasonic.py', function(err, results){
        if (err) throw err;
        data = results;
    })
  res.render('index', { title: 'Coffeefy', distance: data });
});

/* GET Test page */
router.get('/test', function(req, res, next){
    res.render('test');
});

/* run script "helloworld.py" */
router.get('/scripts/1/', function(req, res, next){
    pythonshell.run('../python/helloworld.py', function(err, results){
        if (err) throw err;
        console.log('results: %j', results);
    });
    res.render('test');
    res.end();
});

/* run script "exampleTimedOutputs.py" */
router.get('/scripts/2/', function(req, res, next){
    runscript();

    res.end();
});

router.get('/scripts/3/', function(req, res, next){
    invoke();

    res.end();
});



module.exports = router;

function runscript(){
    var pyshell = new pythonshell('../python/exampleTimedOutputs.py');
    pyshell.on('message', function (message){
        console.log(message);
    });
};

function invoke(){
    client.invoke("test", function(error, res, more){
        console.log(res);
    });
};