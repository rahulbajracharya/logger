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

//get httplogs
module.exports.getHttpLog = function(callback,limit){
    httpLog.find(callback).limit(limit);
}