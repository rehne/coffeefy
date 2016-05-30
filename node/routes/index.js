var express = require('express');
var router = express.Router();
var pythonshell = require('python-shell');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coffeefy' });
});

router.get('/test', function(req, res, next){
    res.render('test');
});

router.get('/scripts/1/', function(req, res, next){
    pythonshell.run('../python/helloworld.py', function(err, results){
        if (err) throw err;
        console.log('results: %j', results);
    });
    res.render('test');
    res.end();
});


router.get('/scripts/2/', function(req, res, next){
    runscript();

    res.end();
});

module.exports = router;

function runscript(){
    var pyshell = new pythonshell('../python/exampleTimedOutputs.py');
    pyshell.on('message', function (message){
        console.log(message);
    });
};
    