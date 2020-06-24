// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');



// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/testchatappV1', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }); // connect to our database

//require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.urlencoded({ extended: true }));// get information from html forms


// routes ======================================================================
require('./app/routes/login_routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);