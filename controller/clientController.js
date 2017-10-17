var client = require('../models/client');


exports.postClients = function(req, res){
    var newClient = new client({
     name: req.body.name,
     id: req.body.id,
     secret: req.body.secret,
     userId: req.user._id,
    });
    console.log(newClient);

//save the new client.
newClient.save(function(err,data){
    if(err){
        res.send(err)
    }
    res.json({message:'new client added',data});
})
}

exports.getClients = function(req,res){
    client.find({},function(err,data){
        if(err){
            throw err
        }
        res.json(data);
    })
}