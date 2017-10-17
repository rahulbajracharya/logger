var oauth2orize = require('oauth2orize')
var user = require('../models/user');
var client = require('../models/client');
var token = require('../models/token');
var code = require('../models/code');

var server = oauth2orize.createServer();

server.deserializeClient(function(id,callback){
    client.findOne({_id:id},function(err,client){
        if(err){return callback(err);}
        return callback(null,client);
    });
});

server.grant(oauth2orize.grant.code(function(client, redirecturi, user, ares, callback){
    var newCode = new code({
        value:uid(16),
        clientId:client._id,
        redirecturi : redirecturi,
        userId: user._id
    });
    newCode.save(function(err){
        if(err){return callback(err);}

        callback(null, newCode.value);
    })
}))

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    Code.findOne({ value: code }, function (err, authCode) {
      if (err) { return callback(err); }
      if (authCode === undefined) { return callback(null, false); }
      if (client._id.toString() !== authCode.clientId) { return callback(null, false); }
      if (redirectUri !== authCode.redirectUri) { return callback(null, false); }
  
      // Delete auth code now that it has been used
      authCode.remove(function (err) {
        if(err) { return callback(err); }
  
        // Create a new access token
        var token = new Token({
          value: uid(256),
          clientId: authCode.clientId,
          userId: authCode.userId
        });
  
        // Save the access token and check for errors
        token.save(function (err) {
          if (err) { return callback(err); }
  
          callback(null, token);
        });
      });
    });
  }));

  exports.authorization = [
    server.authorization(function(clientId, redirectUri, callback) {
  
      Client.findOne({ id: clientId }, function (err, client) {
        if (err) { return callback(err); }
  
        return callback(null, client, redirectUri);
      });
    }),
    function(req, res){
      res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
  ]