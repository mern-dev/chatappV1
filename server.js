
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var path = require('path')
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser   = require('body-parser');

app.use(bodyParser.json());



// routes ======================================================================
var login = require('./app/routes/login_routes.js') // load routes and pass in our app 
app.use("/api/",login);

if(process.env.NODE_ENV === "production")
{
   app.use(express.static("Client/build"));

   app.get("*",(req,res) => {
     
           res.sendFile(path.resolve(__dirname,"Client","build","index.html"))
   });  
}
// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/app1',{
  useUnifiedTopology: true,
  useNewUrlParser: true, useFindAndModify: false 
}); // connect to database





// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


io.on("connection", (socket) =>{
  
  require("./app/routes/user_routes")(io,socket)
   
  })




