var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
var mongoose = require('mongoose');

module.exports=function(ioSeen,socket){
  


  
      

      
        
 // =====================================
 //    Updating seen messages============
 // =====================================


      socket.on("seenUpdate",function(data){
        console.log('seen')

        Room.updateOne({_id:data.receiverId,"chats.Id":data.senderId},{$set:{"chats.$.messages.$[elem].seen":true}},{arrayFilters: [ { "elem.id": { $eq:data.id }}]} ).then(val=>{
                       
          Room.updateOne({_id:data.senderId,"chats.Id":data.receiverId},{$set:{"chats.$.messages.$[elem].seen":true}},{arrayFilters: [ { "elem.id": { $eq:data.id } }]}).then(val=>{
              
            ioSeen.to(`${data.senderId}`).emit("seenSuccess",data)  //===== seen success message to sender =====================================
          })
                    
        })
      })


          
 }

  
 




