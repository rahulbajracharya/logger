var mongoose =require('mongoose');
//HttpLog Schema
var httpLogScheme = mongoose.Schema({
    Header: {
        type: String,
    },
    Body:{
        type:String,
    },
    HttpVerb:{
        type:String,
    },
    TransId:{
        type:String,
    },
    Parameters:{
        type:String,
    },
    DeviceType:{
        type:String,
    },
    ServiceType:{
     type:String,
    }
})
//
var httpLog = module.exports = mongoose.model('httpLog',httpLogScheme);

//get httplogs
module.exports.getHttpLog = function(callback,limit){
    httpLog.find(callback).limit(limit);
}