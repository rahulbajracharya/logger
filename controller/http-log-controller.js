//load require package


var httpLog=require('../models/http-log');
var logger = require('../business/http-log-bl');

//create endpoint /api/httplog
exports.getHttpLog = function(req,res)
{
    var result = logger.getHttpLog(req, function(items){
        //res.json(items);
        res.status(200).send({'status':'200','data':items});
    })
    console.log("GET /api/httplog: HttpLog Detail requested");
}

exports.postHttpLog = function(req,res)
{
    var data = req.body.data;
    logger.addHttpLog(data,function(err,result){
        if(err){
            throw err;
        }
    })
    console.log("POST /api/httplog: Http Log added");
    res.status(201).send({'status':'201','message':'Http Log added successfully.'})
    // res.status(201).set('httplog','/api/httplog/'+req.body).end();
}