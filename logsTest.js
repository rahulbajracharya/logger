var winston = require('winston');
require('winston-mongodb').MongoDB;
normalLog = require('./models/nomlog');
httpLog=require('./models/httplog');

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

//test
module.exports.showResult =function(log){
    console.log(log);
}


