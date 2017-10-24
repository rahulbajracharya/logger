var mongoose =require('mongoose');
var objectId = require('mongodb').ObjectID
//HttpLog Schema
var httpLogScheme = mongoose.Schema({
    header: {
        type: String,
    },
    url:{
        type:String,
    },
    body:{
        type:String,
    },
    http_verb:{
        type:String,
    },
    trans_id:{
        type:String,
    },
    tran_health_type:{
	    type:Number
    },
    parameters:{
        type:String,
    },
    device_type:{
        type:String,
    },
    service_type:{
     type:String,
    },
    //logged in user
    user_id:{
        type:String
    }
})
//
var httpLog = module.exports = mongoose.model('httpLog',httpLogScheme);

//
module.exports.getHttpLog = function(log){
    var data=({
        header:log.header,
        body:log.body,
        url:log.url,
        user_id:log.user_id,
        http_verb:log.http_verb,
        trans_id:log.trans_id,
        parameters:log.parameters,
        device_type:log.device_type,
        service_type:log.service_type
    })
    return data;
}
module.exports.getQuery = function (reqs, callback)
{
    var limit=0;
    var query={};
    if(reqs.query.user_id)
        {
            query1 = { "meta.details.user_id" :  reqs.query.user_id };
            query = Object.assign({},query,query1);
        }
    if(reqs.query.limit)
        {
            limit = parseInt(reqs.query.limit);
        }
    if(reqs.query.log_id)
        {
            var logid = new objectId(reqs.query.log_id);
            query1 = { "_id": logid };
            query=Object.assign({},query,query1);
        }
    if(reqs.query.trans_id)
        {
            query1 = { "meta.details.trans_id" :  reqs.query.trans_id };
            query = Object.assign({},query,query1);
        }
    if(reqs.query.level)
        {
            query1 = {"level": reqs.query.level};
            query = Object.assign({},query,query1);
        }
    if(reqs.query.device_type)
        {
            query1 = {"meta.details.device_type": reqs.query.device_type}
            query = Object.assign({},query,query1);         
        }
    if(reqs.query.service_type)
        {
            query1 = {"meta.details.service_type": reqs.query.service_type}
            query = Object.assign({},query, query1);
        }
        return callback(query);
}

