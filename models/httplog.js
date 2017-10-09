var mongoose =require('mongoose');
//HttpLog Schema
var httpLogScheme = mongoose.Schema({
    header: {
        type: String,
    },
    body:{
        type:String,
    },
    httpverb:{
        type:String,
    },
    transid:{
        type:String,
    },
    parameters:{
        type:String,
    },
    devicetype:{
        type:String,
    },
    servicetype:{
     type:String,
    }
})
//
var httpLog = module.exports = mongoose.model('httpLog',httpLogScheme);

//http
module.exports.getHttpLog = function(log){
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
module.exports.getAllHttpLog = function(){
  httpLog.find({},function(err,result){
      console.log(result);
  });
}