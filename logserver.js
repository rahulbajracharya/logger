//load required packages.
var express= require('express');
var mongoose = require('mongoose');

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var passport = require('passport');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var httpLogController = require('./controller/httpLogController');
var normalLogController = require ('./controller/normalLogController');
var authController = require('./controller/authController');
var userController = require('./controller/userController');
app.use(bodyParser.json());
app.use(passport.initialize());
//Create our Express router
var router = express.Router();

//router configuration for users

router.route('/users')
.post(userController.postUsers)
.get(userController.getUsers)

//router configuration for httplog
router.route('/httplog')
    .get(authController.isAuthenticated,httpLogController.getHttpLog)
    .post(authController.isAuthenticated,httpLogController.postHttpLog)

//router configuration for normallog    
router.route('/normlog')
    .get(authController.isAuthenticated,normalLogController.getNormalLog)
    .post(authController.isAuthenticated,normalLogController.postNormalLog)





//Register all our routes with /api
    app.use('/api',router);
    app.listen(3000);
    console.log("Logger Listining....");
