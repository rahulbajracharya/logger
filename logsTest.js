var winston = require('winston');
var express= require('express');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
normalLog = require('./models/nomlog');
httpLog=require('./models/httplog');

app.use(bodyParser.json());


winston.configure({
transports:[
    new(winston.transports.File)({filename:'file.log'})
]
});
//winston.loggers.add('mongoLog',{
   // transports : [
   //     new(winston.transports.MongoDB)({
   //         db : 'mongodb://localhost/test',
  //          collection : 'infolog',
   //         level : 'info',
  //          capped : true
   //     }),
  //  ]
//});

function getNomLogData(log)
{
    var data=({
        parameters:log.parameters,
        result:log.result,
        error:log.error,
        status:log.status,
        exceptiontype:log.exceptiontype,
        exceptiondetail:log.exceptiondetail,
        user:log.user,
        method:log.method,
        device:log.device
    })
    return data;
}
function getHttpLogData(log)
{
    var data=({
        header:log.header,
        body:log.body,
        httpverb:log.httpverb,
        transid:log.transid,
        parameters:log.parameters,
        devicetype:log.devicetype,
        servicetype:log.servicetype
    })
    return data;
}
//var mongoLog = winston.loggers.get('mongoLog')
//mongoLog.info('hello') 
var test = new httpLog({
    header:"testHeader",
    body:"testBody",
    httpverb:"/api/getUsers",
    transid:"5",
    parameters:"testParameters",
    devicetype:"testDevice",
    servicetype:"testServiceType"
})
var testData = new normalLog({
    parameters:"testParameters",
    result:"",
    error:"Error",
    status:"Success",
    exceptiontype:"Divided by zero",
    exceptiondetail:"exceptionDetail",
    user:"testUser",
    method:"testMethod",
    device:"Mobile"
})
/*
var user = new logss({
    first_name:"rahul",
    last_name:"bajracharya",
    gender:"male",
})*/


//var data = getdata(user);
//var logs = new logs({
    //Parameters: "a,b,c",
  //  Result:"nothing",
  //  Status:"Ok",
  //  TotalTimeMs:5,
  //  TotalTicks:10,
  //  ExceptionType:"",
  //  ExceptionDetail:"",
  //  User:"rahul",
  //  Method:"AddData"
//}); 
//console.log(data);

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

/*var normalLog = winston.loggers.get('normalLog')
normalLog.error("","error","No message",{
    users:data
    
})*/
//add normal Log
module.exports.addNormLog = function(log){
    var normalTestLog=getNomLogData(log);
    var normalLog=winston.loggers.get('normalLog')
    normalLog.info("No message",{
        details:normalTestLog
    })
}
module.exports.showResult =function(log){
    console.log(log);
}
/*
module.exports.addHttpLog=function(log){
    var httpTestLog = getHttpLogData(log);
    var httpLog=winston.loggers.get('httpLog')
    httpLog.info("No message",{
        details:httpTestLog
    })
}
*/