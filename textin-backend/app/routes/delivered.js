var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
var mongoose = require('mongoose');

module.exports=function(ioDelivered,socket){
  


  
      

  // =====================================
  //   Updating delivered messages========
  // =====================================
 





      socket.on("deliverUpdate",function(data){
        
            
        Room.updateOne({_id:data.receiverId,"chats.Id":data.senderId},{$set:{"chats.$.messages.$[elem].delivered":true}},{arrayFilters: [ { "elem.id": { $eq:data.id } } ]}).then(val=>{
                         
         
          Room.updateOne({_id:data.senderId,"chats.Id":data.receiverId,},{$set:{"chats.$.messages.$[elem].delivered":true}},{arrayFilters: [ { "elem.id": { $eq:data.id } } ]}).then(val=>{
   
            ioDelivered.to(`${data.senderId}`).emit("deliverSuccess",data)  //===== deliver success message to sender =====================================
          })
                    
        })
      })



      
        

          
 }

  
 




