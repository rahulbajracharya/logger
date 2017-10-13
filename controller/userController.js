//Load required pacakges
var user = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
//Create 

exports.postUsers = function(req, res){
    var user1 = new user({
        username: req.body.username,
        password:req.body.password
    });
    user1.save(function(err){
    if(err) res.send(err);
    res.json({message:'New user added'});
});
}

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    user.find(function(err, users) {
      if (err) res.send(err);
      res.json(users);
    });
  };