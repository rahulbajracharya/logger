//load required packages
var passport = require('passport');
var basicAuth = require('passport-http').BasicStrategy;
var user = require('../models/user');

passport.use(new basicAuth(function(username,password,cb){
    user.findOne({username:username}, function(err, user){
        if(err) return cb(err);
        //user not found
        if(!user) return db(null,false);
        //check password
        user.verifyPassword(password, function(err, isMatch){
            if(err)  {console.log(err);
                return cb(err)};
            //password not match
            if(!isMatch){ console.log("not match");
                return cb(null,false);}
            //success
            console.log("success");
            return cb(null,user);
        })
    })
}))

exports.isAuthenticated = passport.authenticate('basic', {session:false});