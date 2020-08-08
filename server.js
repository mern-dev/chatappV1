
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
var path = require('path')
var mongoose = require('mongoose');
require("dotenv").config();
var bodyParser = require('body-parser');

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
  require("./app/routes/onOffSocket")(ioOnline, socket)

})


var ioDelivered = io.of('/socketDelivered')

ioDelivered.on("connection", (socket) => {
  console.log('ioDelivered--');
  require("./app/routes/delivered")(ioDelivered, socket)

})

var ioTyping = io.of('/socketTyping')

ioTyping.on("connection", (socket) => {
  console.log('ioTyping--');
  require("./app/routes/typing")(ioTyping, socket)

})

var ioSeen = io.of('/socketSeen')

ioSeen.on("connection", (socket) => {
  console.log('ioSeen--');
  require("./app/routes/seen")(ioSeen, socket)

})

var ioDp = io.of('/socketDp')

ioDp.on("connection", (socket) => {
  console.log('ioDp--');
  require("./app/routes/dp")(ioDp, socket)

})



