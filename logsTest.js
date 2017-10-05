var winston = require('winston');
require('winston-mongodb').MongoDB;
logss = require('./models/user_details');
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
function getdata(data)
{
    var data=({
        first_name:data.first_name,
        last_name:data.last_name,
        gender:data.gender
    })
    return data;
}
//var mongoLog = winston.loggers.get('mongoLog')
//mongoLog.info('hello') 
var user = new logss({
    first_name:"rahul",
    last_name:"bajracharya",
    gender:"male",
})

var data = getdata(user);
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
console.log(data);
winston.loggers.add('profileLog',{
    transports : [
        new(winston.transports.MongoDB)({
            db : 'mongodb://localhost/test',
            collection : 'errorlog',
            level : 'error',
            capped : true,
        
        }),
    ]
});
var abc=["this is text","laksjlas","kajsdkajsd"];
var profileLog = winston.loggers.get('profileLog')
profileLog.error("No message",{
    users:data
    
})