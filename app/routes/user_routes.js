var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
module.exports=function(io,socket){
        
        
  // =====================================
  //  User is online =============
  // =====================================
        socket.on("join",function(data)
        { console.log(data);
          socket.join(`${data.id}`,() => {
            console.log("into chat room")
           User.updateOne({
             _id:data.id
             },{
                 isOnline:true    
             }).then(val => 
                {
                    console.log(val);
                   if (val.nModified == 1){
                  //  {     Room.findOne({_id:data.id}).then(room =>{
                            
                  //            const messages = room.chats.map(chat=>{
                               
                  //             chats.messages[chats.messages.length-1]

                  //            })
                          
                    //   })
                          socket.emit("isOnline",{id:data.id})  //===================Emitting the user who is come online to other users==================//
                   }})
                })
           });

  // =====================================
  //  User to send a message =============
  // =====================================
          
                    
        socket.on("postingMessage",function(newMessage){
          console.log(newMessage)
          const msg= {
              id:newMessage.id,
            msgBody:newMessage.msgBody,
               read:false,
           sentTime:newMessage.sentTime,
               sent:true
           }
           const msgOnline= {
            id:newMessage.id,
          msgBody:newMessage.msgBody,
             read:false,
         sentTime:newMessage.sentTime,
             sent:true,
             senderId:newMessage.senderId
         }
         Room.updateOne({_id:newMessage.senderId,"chats.Id":newMessage.receiverId},{
          $push:{
              "chats.$.messages":{
                $each:[
                 msg 
                ]
              }
            }
         }).then(val => {
             if(val.n)
             {
      
              Room.updateOne({_id:newMessage.receiverId,"chats.Id":newMessage.senderId},{
                  $push:{
                      "chats.$.messages":{
                        $each:[
                         msg 
                        ]
                      }
                    }
                 }).then(val => {
      
               
     
                   
                   
                                   const newmsg = {
                                    senderUsername:newMessage.senderUsername,
                                    senderPath:newMessage.senderPath,
                                     msg:msgOnline
                                   }
                                   console.log("message-sent")
                                  io.to(`${newMessage.receiverId}`).emit("receivingMessage",newmsg) //=======Sending the message to the receiver=============//
                        
                       
                     
                  
                  
                  
                  
                
                 }).catch(err =>{
                   console.log(err)
                 })   
              
      
             }
             else
             {
              Room.updateOne({_id:newMessage.senderId},
                  {$addToSet:{
                    "chats":{Id:newMessage.receiverId,messages:[msg]}}}).then(room =>{
      
                      Room.updateOne({_id:newMessage.receiverId},
                          {$addToSet:{
                            "chats":{Id:newMessage.senderId,messages:[msg]}}}).then(room =>{
                            
                              
                                  
                                   
                                   
                                   
                                                   const newmsg = {
                                                     senderUsername:newMessage.senderUsername,
                                                     senderPath:newMessage.senderPath,
                                                     msg:msgOnline
                                                   }
                                                   console.log("message-sent")
                                                io.to(`${newMessage.receiverId}`).emit("receivingMessage",newmsg) //=======Sending the message to the receiver=============
                                         
                                       
                                     
                                  
                                  
                                  
                              
                                 }).catch(err =>{
                                   console.log(err)
                                 })  
      
      
      
      
      
                            })
      
                  
             }
      
         })
      })
  
      

  // =====================================
  //   Updating Unread messages===========
  // =====================================


  
          
 }


  




