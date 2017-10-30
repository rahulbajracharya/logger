
//load require package

var normalLog = require('../models/normal-log');
var logger = require('../business/normal-log-bl');



//Get NormalLog
exports.getNormalLog = function(req,res)
{
    logger.getNormalLog(req,function(result){
        res.status(200).send({'status':'200','data':result});
        //res.json(result);
    })
  console.log("GET /api/normlog: Normal Log requested.");
}

//Post NormalLog
exports.postNormalLog = function(req,res)
{
    var data =req.body.data;
    var headers = req.header.toString('utf8');
    console.log(data);
    console.log(headers);
    logger.addNormLog(data, function (err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/normlog: Normal Log added.");
    res.status(201).send({'status':'201', 'message':'Normal Log added successfully'});
  //  res.status(201).set('normlLog','/api/normlog/'+req.body).end();
} 

