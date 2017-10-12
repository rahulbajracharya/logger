
//load require package

var normalLog = require('../models/nomlog');
var httpLog=require('../models/httplog');
var logger = require('../business/normalLogBl');



//Get NormalLog
exports.getNormalLog = function(req,res)
{
    logger.getNormalLog(req,function(result){
        res.json(result);
    })
  console.log("GET /api/normlog: Normal Log requested.");
}

//Post NormalLog
exports.postNormalLog = function(req,res)
{
    var data =req.body;
    logger.addNormLog(data, function (err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/normlog: Normal Log added.");
    res.status(201).set('normlLog','/api/normlog/'+req.body).end();
} 

