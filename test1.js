
var express= require('express');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var normalLog = require('./models/nomlog');
var httpLog=require('./models/httplog');
var logbl = require('./logsTest');

app.use(bodyParser.json());

//addlogger
app.post('/api/logger', function(req,res){
    var data =req.body;
    console.log(data);
    logbl.addNormLog(data, function (err){
        if(err){
            throw err;
        }
        
    })
    console.log("OK");
    res.json(data);
})

app.listen(3000);
console.log("LoggerListining....");