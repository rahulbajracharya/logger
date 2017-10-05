var mongoose = require('mongoose');

var user_details = mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    gender:String
})

var userDetails = module.exports = mongoose.model('user_details',user_details);

//get nomlogs
module.exports.getUserDetails = function(callback,limit){
    userDetails.find(callback).limit(limit);
}