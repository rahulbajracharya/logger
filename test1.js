
var express= require('express');
var app =express();
var mongoose=require('mongoose');

var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var normalLog = require('./models/nomlog');
var httpLog=require('./models/httplog');
var logger = require('./logsTest');

app.use(bodyParser.json());
var db = mongoose.connect('mongodb://localhost/test',{
    useMongoClient:true,
});
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/test";

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
     logger.getHttpLog("",function(err, data){
        if(err){
            throw err;
        }
    })
    console.log("GET /api/http: Log Detail requested");
  
    res.json("asdasd");
    /*
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("httpLog").find().toArray(function(err, result) {
          if (err) throw err;
          db.close();
          res.json(result);
        });
      });
    */
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