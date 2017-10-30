var winston = require('winston');
require('winston-mongodb').MongoDB;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/test";
var objectId = require('mongodb').ObjectID
var normalLog = require('../models/normal-log');


winston.loggers.add('normalLog',{
    transports : [
        new(winston.transports.MongoDB)({
            db : 'mongodb://localhost/test',
            collection : 'normalLog',
            capped : false
        }),
    ]
});

//add Normal Log function
module.exports.addNormLog = function(log){
    var normalTestLog=normalLog.getNomLog(log);
    var Log=winston.loggers.get('normalLog')
    Log.info("No message",{
        details:normalTestLog
    })
}
//get Normal Log function
module.exports.getNormalLog = function(reqs,callback){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err 
        normalLog.getQuery(reqs, function(result){
            if(err) throw err;
            console.log(result);//returned query
            var limit = 0;
            if(reqs.query.limit)
             {
                 limit = parseInt(reqs.query.limit);
             }
            db.collection("normalLog").find(result).limit(limit).toArray(function(err, result) {
            if (err) throw err;
              db.close();
              return callback(result);
        });
         });
       });
     }
