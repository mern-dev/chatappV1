
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
var path = require('path')
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser = require('body-parser');

const {Onoff,Post} = require("./app/routes/onOffSocket")

app.use(bodyParser.json());


app.use(fileUpload());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));

// routes ======================================================================
var login = require('./app/routes/login_routes.js') // load routes and pass in our app 
app.use("/api/", login);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));

  app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"))
  });
}
// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/testchatappV1', {
  useUnifiedTopology: true,
  useNewUrlParser: true, useFindAndModify: false
}); // connect to database





// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


io.on("connection", (socket) => {
  console.log('io--')
  //  require("./app/routes/user_routes")(io, socket)

})

var ioOnline = io.of('/socketOnline')

ioOnline.on("connection", (socket) => {
  console.log('ioOnline--');
  
  Onoff(ioOnline, socket)


})

var ioPost = io.of('/socketPost')

ioPost.on("connection", (socket) => {
  console.log('ioPost--');
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  
  Post(ioPost, socket)

})


var ioDelivered = io.of('/socketDelivered')

ioDelivered.on("connection", (socket) => {
  console.log('ioDelivered--');
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/delivered")(ioDelivered, socket)

})

var ioTyping = io.of('/socketTyping')

ioTyping.on("connection", (socket) => {
  console.log('ioTyping--');
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/typing")(ioTyping, socket)

})

var ioSeen = io.of('/socketSeen')

ioSeen.on("connection", (socket) => {
  console.log('ioSeen--');
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/seen")(ioSeen, socket)

})

var ioDp = io.of('/socketDp')

ioDp.on("connection", (socket) => {
  console.log('ioDp--');
  socket.on("join",(data)=>{
    socket.join(`${data.id}`)
  })
  require("./app/routes/dp")(ioDp, socket)

})



