var client = require('../models/client');

exports.postClients = function(req, res){
    var newClient = new client();
    newClient.name = req.body.name;
    newClient.id=req.body.id;
    newClient.secret= req.body.secret;
    newClient.userId = req.user._id;
    console.log(newClient);

//save the new client.
newClient.save(function(err){
    if(err){
        res.send(err)
    }
    res.json({message:'new client added'});
})
}

exports.getClients = function(req,res){
    client.find({userId:res.user._Id},function(err,data){
        if(err){
            throw err
        }
        res.json(data);
    })
}