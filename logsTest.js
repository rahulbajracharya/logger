var winston = require('winston');
require('winston-mongodb').MongoDB;
normalLog = require('./models/nomlog');
httpLog=require('./models/httplog');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/test";


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

module.exports.getHttpLog=function(query){
    var result; 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
    result= db.collection("httpLog").find().toArray(function(err) {
          if (err) throw err;
          db.close();
        
        });
      });
      console.log(result);
      return result;
   
}
//test
module.exports.showResult =function(log){
    console.log(log);
}


