
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
var path = require('path')
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser   = require('body-parser');

app.use(bodyParser.json());


app.use(fileUpload());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));

// routes ======================================================================
var login = require('./app/routes/login_routes.js') // load routes and pass in our app 
app.use("/api/",login);

if(process.env.NODE_ENV === "production")
{
   app.use(express.static("Client/build"));

   app.get("*",(req,res) => {
     console.log("ppppp","llllllllllllllll")
           res.sendFile(path.resolve(__dirname,"Client","build","index.html"))
   });  
}
// configuration ===============================================================
mongoose.connect(process.env.MONGO_URL,{
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




