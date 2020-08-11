
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cors = require('cors');
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser = require('body-parser');

const {Onoff,Post} = require("./app/routes/onOffSocket")

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())

// routes ======================================================================
require('./app/routes/login_routes.js')(app) // load routes and pass in our app 


// ===============================================================================

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("Client/build"));

//   app.get("*", (req, res) => {

//     res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
//   });
// }
// configuration ===============================================================

mongoose.connect(process.env.MONGO_URL, {

  useUnifiedTopology: true,
  useNewUrlParser: true, useFindAndModify: false
}); // connect to database





// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


var ioOnline = io.of('/socketOnline')

ioOnline.on("connection", (socket) => {
 
  
  Onoff(ioOnline, socket)


})

var ioPost = io.of('/socketPost')

ioPost.on("connection", (socket) => {
  
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  
  Post(ioPost, socket)

})


var ioDelivered = io.of('/socketDelivered')

ioDelivered.on("connection", (socket) => {
  
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/delivered")(ioDelivered, socket)

})

var ioTyping = io.of('/socketTyping')

ioTyping.on("connection", (socket) => {
 
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/typing")(ioTyping, socket)

})

var ioSeen = io.of('/socketSeen')

ioSeen.on("connection", (socket) => {

  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/seen")(ioSeen, socket)

})

var ioDp = io.of('/socketDp')

ioDp.on("connection", (socket) => {
  
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/dp")(ioDp, socket)

})



