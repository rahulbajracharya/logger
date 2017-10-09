
var express= require('express');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var normalLog = require('./models/nomlog');
var httpLog=require('./models/httplog');
var logger = require('./logsTest');

app.use(bodyParser.json());

//normallog Post request
app.post('/api/normlog', function(req,res){
    var data =req.body;
    logger.addNormLog(data, function (err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/normlog: Normal Log added.");
    res.status(201).set('httplog','/api/normlog/'+req.body).end();
})

//httplog Post request
app.post('/api/httplog',function(req,res){
    var data = req.body;
    logger.addHttpLog(data,function(err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/httplog: Http Log added");
    res.status(201).set('httplog','/api/httplog/'+req.body).end();
})

app.listen(3000);
console.log("Logger Listining....");