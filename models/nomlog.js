var mongoose =require('mongoose');
var objectId = require('mongodb').ObjectID;
//normal log schema
var nomLogScheme = mongoose.Schema({
    parameters: {
        type: String,
    },
    result:{
        type:String,
    },
    trans_id:{
        type:String,
    },
	//health status
	trans_health_type:{
	    type:Number
    },
    //info,debug,...
    status:{
        type:String,
    },
    exception_type:{
        type:String,
    },
    exception_detail:{
        type:String,
    },
    //logged in user
    user_id:{
        type:String,
    },
    //perticular method called
    method:{
        type:String,
    },
    device_type:{
        type:String,
    },
    service_type:{
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
        user_id:log.user_id,
        status:log.status,
        trans_id:log.trans_id,
        trans_health_type:log.trans_health_type,
        exception_type:log.exception_type,
        exception_detail:log.exception_detail,
        method:log.method,
        device_type:log.device_type,
        service_type:log.service_type,
    })
    return data;
}

//convert datetime to ISOdatetime
function convertToISO(datetime1)
{
    var datetime = new Date(datetime1);
    //converting to ISO datetime
    datetime.setHours(datetime.getHours() + 5);
    datetime.setMinutes(datetime.getMinutes()+ 45);
    //conversion end
    return datetime;
}
//query builder for get
module.exports.getQuery = function (reqs, callback)
{
    console.log("here");
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
     //query for timestamp range
    if(reqs.query.start && reqs.query.end)
     {
         start = convertToISO(reqs.query.start);
         end = convertToISO(reqs.query.end);
         query1={ timestamp:{$gte:start, $lte:end}};
         query= Object.assign({},query,query1);
     }
    else if(reqs.query.start)
     {
         start = convertToISO(reqs.query.start);
         query1={ timestamp:{$gte:start}};
         query= Object.assign({},query,query1);
     }
     else if(reqs.query.end)
     {
         end = convertToISO(reqs.query.end);
         query1={ timestamp:{$lte:end}};
         query= Object.assign({},query,query1);
     }
     ///
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
    if(reqs.query.trans_health_type)
        {
            query1 = {"meta.details.trans_health_type": reqs.query.trans_health_type}
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