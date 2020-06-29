
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

    app.use(bodyParser.urlencoded())

app.use(bodyParser.json());
// routes ======================================================================
require('./app/routes/login_routes.js')(app); // load routes and pass in our app 


// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


io.on("connection", (socket) =>{
  require("./app/routes/user_routes")(io,socket) ;
   
  })




