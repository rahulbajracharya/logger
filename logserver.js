//load required packages.
var express= require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var passport = require('passport');
var session = require('express-session');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var httpLogController = require('./controller/httpLogController');
var normalLogController = require ('./controller/normalLogController');
var authController = require('./controller/authController');
var userController = require('./controller/userController');
var clientController = require('./controller/clientController');
var oauth2Controller = require('./controller/oauth2Controller');
var ejs = require('ejs');

app.set('view-engine','ejs');

app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    saveUninitialized:true,
    resave:true
}));
app.use(passport.initialize());
//Create our Express router
var router = express.Router();

//router configuration for users

router.route('/users')
.post(userController.postUsers)
.get(userController.getUsers)

//router configuration for httplog
router.route('/httplog')
    .get(httpLogController.getHttpLog)
    .post(httpLogController.postHttpLog)

//router configuration for normallog    
router.route('/normlog')
    .get(normalLogController.getNormalLog)
    .post(normalLogController.postNormalLog)

router.route('/clients')
.get(authController.isAuthenticated,clientController.getClients)
.post(authController.isAuthenticated,clientController.postClients)

router.route('/oauth2/authorize')
.get(authController.isAuthenticated, oauth2Controller.authorization)
.post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
.post(authController.isClientAuthenticated, oauth2Controller.token);


//Register all our routes with /api
    app.use('/api',router);
    app.listen(3000);
    console.log("Logger Listining....");
