//load required packages
var passport = require('passport');
var basicAuth = require('passport-http').BasicStrategy;
var user = require('../models/user');
var client = require('../models/client');
var bearerStrategy = require('passport-http-bearer').Strategy
var Token =require('../models/token');




passport.use(new basicAuth(function(username,password,cb){
    user.findOne({username:username}, function(err, user){
        if(err) return cb(err);
        //user not found
        if(!user) {
            console.log("User not match.");
            return cb(null,false);}
        //check password
        user.verifyPassword(password, function(err, isMatch){
            if(err)  {console.log(err);
                return cb(err)};
            //password not match
            if(!isMatch){ console.log("Invalid Password.");
                return cb(null,false);}
            //success
            console.log("Valid user/Success");
            return cb(null,user);
        })
    })
}))
/*
passport.use('client-basic',new BasicStrategy(
    function(username,password,callback){
        client.findOne({id:username},function(err,client){
            if(err){
                return callback(err);
            }
            if(!client || client.secret !==password){
                return callback(null,false);
            }

            return callback(null,client);
        })
    }
))
*/
passport.use(new bearerStrategy(
    function (accessToken, callback){
        Token.findOne({value:accessToken}, function(err, token){
            if(err){return callback(err);}
            if(!token){
                return callback(null,false);
            }
            user.findOne({_id:token.userId},function(err,user){
                if(err){return callback(err);}
                //no user found
                if(!user){
                    return callback(null,false);
                }

                callback(null,user,{scope:'*'});
            })
        })
    }
))
exports.isbearerAuthenticated = passport.authenticate('bearer',{session:false});
exports.isClientAuthenticated = passport.authenticate('client-basic',{session:false});
exports.isAuthenticated = passport.authenticate(['basic','bearer'], {session:false});