var mongoose =require('mongoose');
//normal log schema
var nomLogScheme = mongoose.Schema({
    parameters: {
        type: String,
    },
    result:{
        type:String,
    },
    error:{
        type:String,
    },
    status:{
        type:String,
    },
    exceptiontype:{
        type:String,
    },
    exceptiondetail:{
        type:String,
    },
    user:{
        type:String,
    },
    method:{
        type:String,
    },
    device:{
        type:String,
    }
})
//
var nomLog = module.exports = mongoose.model('nomLog',nomLogScheme);

//get nomlogs
module.exports.getNomLogs = function(callback,limit){
    nomLog.find(callback).limit(limit);
}