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
    },
    //logged in user
    userid:{
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
        userid:log.user_id,
        httpverb:log.http_verb,
        transid:log.trans_id,
        parameters:log.parameters,
        devicetype:log.device_type,
        servicetype:log.service_type
    })
    return data;
}
module.exports.getQuery = function (reqs, callback)
{
    var limit=0;
    var query={};
    if(reqs.query.user_id)
        {
            query1 = { "meta.details.userid" :  reqs.query.user_id };
            query = Object.assign({},query,query1);
        }
    if(reqs.query.limit)
        {
            limit = parseInt(reqs.query.limit);
        }
    if(reqs.query.logid)
        {
            var logid = new objectId(reqs.query.logid);
            query1 = { "_id": logid };
            query=Object.assign({},query,query1);
        }
    if(reqs.query.transid)
        {
            query1 = { "meta.details.transid" :  reqs.query.transid };
            query = Object.assign({},query,query1);
        }
    if(reqs.query.level)
        {
            query1 = {"level": reqs.query.level};
            query = Object.assign({},query,query1);
        }
    if(reqs.query.devicetype)
        {
            query1 = {"meta.details.devicetype": reqs.query.devicetype}
            query = Object.assign({},query,query1);         
        }
    if(reqs.query.servicetype)
        {
            query1 = {"meta.details.servicetype": reqs.query.servicetype}
            query = Object.assign({},query, query1);
        }
        return callback(query);
}

