
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var bodyParser   = require('body-parser');


const router   = express.Router();
const fileUpload = require('express-fileupload')
const User = require('./app/models/user_model');


// configuration ===============================================================
mongoose.connect("", {
  useUnifiedTopology: true,
  useNewUrlParser: true, useFindAndModify: false 
}); // connect to our database


app.use(fileUpload());
app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));





app.use(bodyParser.json());

app.post("/status",(req,res)=>
{
     User.findOneAndUpdate({username:req.body.username},{status:req.body.status},null,function(err,docs){

       if(err)
       {
         console.log(err);
         res.json({status:"error"})
       }
       else{
         res.json({
           status:"success"

         })
       }
     })
})

app.post('/dp',(req,res)=>{

   let file = req.files.image;
  
   let ls = file.name.split('.');

 
   file.mv(`uploads/${file.name}`,(err)=>{
     if(err){
       console.log(err)
      
     }
     else{
      User.findOneAndUpdate({username:req.body.name},  
        {path:`uploads/${file.name}`}, null, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
       
    }); 
       res.send(`uploads/${file.name}`);
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




