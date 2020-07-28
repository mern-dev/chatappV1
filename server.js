
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var bodyParser   = require('body-parser');


const router   = express.Router();
const fileUpload = require('express-fileupload')
const User = require('./app/models/user_model');


// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/testchatappV1', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}); // connect to our database


app.use(fileUpload());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded())

    app.use(bodyParser.urlencoded())


app.use(bodyParser.json());



app.post('/dp',(req,res)=>{
  console.log(req.files,req.files,req.files.image);
 // res.send(req.files);
   let file = req.files.image;

   let ls = file.name.split('.');
   let extension = ls[ls.length-1]
   console.log(extension);
   file.mv(`uploads/${req.body.name}.${extension}`,(err)=>{
     if(err){
       console.log(err)
      // res.status(500).send(err);
     }
     else{
      User.findOneAndUpdate({username:req.body.name},  
        {path:`uploads/${req.body.name}.${extension}`,
     status: req.body.status }, null, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Original Doc : ",docs); 
        } 
    }); 
       res.send(`uploads/${req.body.name}.${extension}`);
     }
   })
 })

// routes ======================================================================
require('./app/routes/login_routes.js')(app); // load routes and pass in our app 


// launch ======================================================================
var server = app.listen(port);
console.log('The magic happens on port ' + port);


var io = require("socket.io")(server);


io.on("connection", (socket) =>{
  require("./app/routes/user_routes")(io,socket) ;
   
  })




