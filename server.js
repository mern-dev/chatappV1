
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser   = require('body-parser');


const router   = express.Router();
const fileUpload = require('express-fileupload')
const User = require('./app/models/user_model');

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


app.use(fileUpload());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));





app.use(bodyParser.json());



// routes ======================================================================
var login = require('./app/routes/login_routes.js')(app) // load routes and pass in our app 
app.use("/api/",login);
// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


io.on("connection", (socket) =>{
  
  require("./app/routes/user_routes")(io,socket)
   
  })




