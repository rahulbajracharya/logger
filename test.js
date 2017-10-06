var express= require('express');
var app =express();
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
var logger = require('./logsTest');
var httpLog = require('./models/httplog');
var nomLog = require('./models/nomlog');

app.use(bodyParser.json());

var connAttrs={
    "user"          : "hr",
    "password"      : "welcome",
    "connectString" : "localhost/XE"
}

app.get('/user_profiles',function(req,res){
    "use strict";
    logger.addHttpLog(function(err, logs){
        if(err){
            throw err;
        }
    })
    oracledb.getConnection(connAttrs,function(err,connection){
        if(err){
        res.set('Content-Type','application/json');
        res.status(500).send(JSON.stringify({
            status:500,
            message:"Error connecting to DB",
            detailed_message:err.message
        }));
        return;
        }

        connection.execute("Select * from user_profiles",{},{
            outFormat:oracledb.OBJECT
        },function(err,result){
            if(err){
                res.set('Content-Type','application/json');
                res.status(500).send(JSON.stringify({
                    status:500,
                    message:"Error getting the user profile",
                    detailed_message: err.message
                }));
            }
            else{
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(result.rows));
            }
            //Release Connection
            connection.release(
                function(err){
                    if(err){
                        console.error(err.message);
                    }
                    else{
                        console.log("GET /user_profiles: Connection released");
                    }
                });
        });

    });
});

app.get('/user_profiles/:user_name',function(req,res){
    "user strict";
    oracledb.getConnection(connAttrs,function(err,connection){
        if(err){
            res.set('Content-Type','application/json');
            res.status(500).send(JSON.stringify({
                status:500,
                message:"Error connecting to DB",
                detailed_message:err.message
            }));
            return;
            }
            connection.execute("Select * from user_profiles where user_name = :user_name",[req.params.user_name],{
             outFormat: oracledb.OBJECT //return the result as object   
            }, function(err, result){
                if(err || result.rows.length < 1){
                    res.set('Content-Type','application/json');
                    var status =err? 500:404;
                    res.status(status).send(JSON.stringify({
                        status:status,
                        message: err ? "Error getting the user profile" : "User doesn't exist",
                        detailed_message:err? err.message :""
                    }));
                }else{
                    res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
                }
                connection.release(
                    function(err){
                        if(err){
                            console.error(err.message);
                        }
                        else{
                            console.log("GET /user_profiles/"+req.params.user_name+": Connection released");
                        }
                    });
            });
    });
    
});
app.post('/user_profiles',function(req,res){
    if("application/json"!==req.get('Content-Type')){
        res.set('Content-Type','application/json').status(415).send(JSON.stringify({
            status:415,
            message:"Wrong content-type, Only application/json is supported",
            detailed_message:null
        }));
        return;
    }
    oracledb.getConnection(connAttrs,function(err,connection){
        if(err){
            res.set('Content-Type','application/json').status(500).send(JSON.stringify({
                status:500,
                message:"Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        connection.execute("Insert into user_profiles Values "+
        "(:user_name,:display_name,:description,:gender,:age,:country,:theme)",
        [req.body.user_name, req.body.display_name, req.body.description, req.body.gender, 
            req.body.age, req.body.country, req.body.theme],{
            autoCommit:true,
            outFormat: oracledb.OBJECT
        },
        function(err,result){
            if(err){
                res.set('Content-Type','application/json');
                res.status(400).send(JSON.stringify({
                    status:400,
                    message:err.message.indexOf("ORA-00001")>-1?"User already exists":"Input Error",
                    detailed_message:err.message
                }));
                }
                else{
                    res.status(201).set('Location','/user_profiles/'+req.body.user_name).end();
                }
                connection.release(function(err){
                    if(err){
                        console.error(err.message);
                    }else{
                        console.log("POST /user_profile: Connection released");
                    }
                });
        });
    });
});

var server = app.listen(3000, function () {
    "use strict";

    var host = server.address().address,
        port = server.address().port;

    console.log(' Server is listening at http://%s:%s', host, port);
});