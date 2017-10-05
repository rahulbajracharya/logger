var mongoose =require('mongoose');
//normal log schema
var nomLogScheme = mongoose.Schema({
    Parameters: {
        type: String,
    },
    Result:{
        type:String,
    },
    Error:{
        type:String,
    },
    Status:{
        type:String,
    },
     ExceptionType:{
        type:String,
    },
    ExceptionDetail:{
        type:String,
    },
    User:{
        type:String,
    },
    Method:{
        type:String,
    },
    Device:{
        type:String,
    }
})
//
var nomLog = module.exports = mongoose.model('nomLog',nomLogScheme);

//get nomlogs
module.exports.getNomLogs = function(callback,limit){
    nomLog.find(callback).limit(limit);
}