var mongoose =require('mongoose');
//normal log schema
var nomLogScheme = mongoose.Schema({
    parameters: {
        type: String,
    },
    result:{
        type:String,
    },
    tranid:{
        type:String,
    },
    //info,debug,...
    status:{
        type:String,
    },
    exceptiontype:{
        type:String,
    },
    exceptiondetail:{
        type:String,
    },
    //logged in user
    userid:{
        type:String,
    },
    //perticular method called
    method:{
        type:String,
    },
    devicetype:{
        type:String,
    },
    servicetype:{
        type:String
    }
})
//
var nomLog = module.exports = mongoose.model('nomLog',nomLogScheme);

//get nomlogs
module.exports.getNomLog = function(log){
    var data=({
        parameters:log.parameters,
        result:log.result,
        userid:log.userid,
        status:log.status,
        tranid:log.tranid,
        exceptiontype:log.exceptiontype,
        exceptiondetail:log.exceptiondetail,
        method:log.method,
        devicetype:log.devicetype,
        servicetype:log.servicetype,
    })
    return data;
}