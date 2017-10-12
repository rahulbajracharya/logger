//load require package

var normalLog = require('../models/nomlog');
var httpLog=require('../models/httplog');
var logger = require('../business/httpLogBl');

//create endpoint /api/httplog
exports.getHttpLog = function(req,res)
{
    var result = logger.getHttpLog(req, function(items){
        res.json(items);
    })
    console.log("GET /api/httplog: HttpLog Detail requested");
}

exports.postHttpLog = function(req,res)
{
    var data = req.body;
    logger.addHttpLog(data,function(err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/httplog: Http Log added");
    res.status(201).set('httplog','/api/httplog/'+req.body).end();
}