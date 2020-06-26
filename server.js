// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var bodyParser   = require('body-parser');

//var cors = require('cors');



// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/testchatappV1', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }); // connect to our database

    app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
// routes ======================================================================
require('./app/routes/login_routes.js')(app); // load our routes and pass in our app 
require('./app/routes/user_routes.js')(app); 

// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);

require("./app/routes/user_routes.js")(app);

