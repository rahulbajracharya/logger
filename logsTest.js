var winston = require('winston');
require('winston-mongodb').MongoDB;
normalLog = require('./models/nomlog');
httpLog=require('./models/httplog');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/test";
var objectId = require('mongodb').ObjectID


winston.loggers.add('httpLog',{
transports:[
    new(winston.transports.MongoDB)({
        db:'mongodb://localhost/test',
        collection:'httpLog',
        capped:false
    }),
]
});
winston.loggers.add('normalLog',{
    transports : [
        new(winston.transports.MongoDB)({
            db : 'mongodb://localhost/test',
            collection : 'normalLog',
            capped : false
        }),
    ]
});

//add Normal Log
module.exports.addNormLog = function(log){
    var normalTestLog=normalLog.getNomLog(log);
    var Log=winston.loggers.get('normalLog')
    Log.info("No message",{
        details:normalTestLog
    })
}

//add Http Log
module.exports.addHttpLog=function(log){
    var httpTestLog = httpLog.getHttpLog(log);
    var Log=winston.loggers.get('httpLog')
    Log.info("No message",{
        details:httpTestLog
    })
}
//get Normal Log
module.exports.getNormalLog = function(res,callback){
    MongoClient.connect(url, function(err,db){
        if(err) throw err;
        db.collection("normalLog").find(query).toArray(function(err,result){
            if(err) throw err;
            db.close();
            return callback(result);
        })
    })

}

//get Http Log
module.exports.getHttpLog=function(reqs, callback){
    MongoClient.connect(url, function(err, db) {
       if (err) throw err 
       httpLog.getQuery(reqs, function(result){
           if(err) throw err;
           console.log(result);
           var limit = 0;
           if(reqs.query.limit)
            {
                limit = parseInt(reqs.query.limit);
            }
           db.collection("httpLog").find(result).limit(limit).toArray(function(err, result) {
           if (err) throw err;
             db.close();
             return callback(result);
       })
        });
      });
    }
//test
module.exports.showResult =function(log){
    console.log(log);
}


