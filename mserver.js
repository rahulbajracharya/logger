var express =require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose=require('mongoose');

nomlog = require('./models/nomlog');
user_details = require('./models/user_details');
//Connect to Mongoose

var db = mongoose.connect('mongodb://localhost/test',{
    useMongoClient:true,
});

//getnormal logs
app.get('/api/nomlog',function(req,res){
   nomlog.getNomLog(function(err, logs){
       if(err){
           throw err;
       }
       res.json(logs);
   })
});

//get userdetails
app.get('/api/userDetails',function(req,res){
    user_details.getUserDetails(function(err, userdetails){
        if(err){
            throw err;
        }
        res.json(userdetails);
    })
 });
app.listen(3000);
console.log("Listining....");