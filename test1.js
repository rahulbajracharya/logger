 var express= require('express');
var app =express();
var mongoose=require('mongoose');

var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var normalLog = require('./models/nomlog');
var httpLog=require('./models/httplog');
var logger = require('./logsTest');
app.use(bodyParser.json());



//normallog get request
app.get('/api/normlog',function (req,res){
      logger.getNormalLog(req,function(result){
          res.json(result);
      })
    console.log("GET /api/normlog: Normal Log requested.");
})

//normallog Post request
app.post('/api/normlog', function(req,res){
    var data =req.body;
    logger.addNormLog(data, function (err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/normlog: Normal Log added.");
    res.status(201).set('normlLog','/api/normlog/'+req.body).end();
})

//httplog get request
app.get('/api/httplog',function(req, res){
    console.log(req.query.transid);
  var result = logger.getHttpLog(req, function(items){
        res.json(items);
    })
    console.log("GET /api/httplog: HttpLog Detail requested");
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