var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
var mongoose = require('mongoose');

module.exports=function(ioTyping,socket){
  


  //=======================================
 // ======Typing online update=============
 // =======================================


             socket.on("isTyping",function(data){

              
              ioTyping.to(`${data.rid}`).emit("isTypingUpdate",{id:data.uid});
                         
              
             })
             socket.on("isTypingEnd",function(data){


              ioTyping.to(`${data.rid}`).emit("isTypingEndUpdate",{id:data.uid});
                         
              
             })
          
 }

  
 




