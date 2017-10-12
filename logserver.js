//load required packages.
var express= require('express');
var app =express();
var bodyParser = require('body-parser');
require('winston-mongodb').MongoDB;
var httpLogController = require('./controller/httpLogController')
var normalLogController = require ('./controller/normalLogController')
app.use(bodyParser.json());

//Create our Express router
var router = express.Router();

//router configuration for httplog
router.route('/httplog')
    .get(httpLogController.getHttpLog)
    .post(httpLogController.postHttpLog)

//router configuration for normallog    
router.route('/normlog')
    .get(normalLogController.getNormalLog)
    .post(normalLogController.postNormalLog)


//Register all our routes with /api
    app.use('/api',router);
    app.listen(3000);
    console.log("Logger Listining....");
