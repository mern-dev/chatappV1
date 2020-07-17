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
                   if (val.nModified == 1)
                   {
                          socket.emit("isOnline",{id:data.id})  //===================Emitting the user who is come online to other users==================//
                   }})
                })
           });

  // =====================================
  //  User to send a message =============
  // =====================================
          
                    
        socket.on("postingMessage",function(newMessage){
          const msg= {
              id:newMessage.id,
            msgBody:newMessage.msgBody,
               read:false,
          //  sentTime:newMessage.sentTime,
               sent:true
           }
           const msgOnline= {
            id:newMessage.id,
          msgBody:newMessage.msgBody,
             read:false,
        //  sentTime:newMessage.sentTime,
             sent:true,
             senderId:newMessage.senderId
         }
            Room.update({_id:newMessage.senderId},
              {$addToSet:{
                "chats.Id":newMessage.receiverId}}).then(room =>{
                Room.update({_id:newMessage.senderId,"chats.Id":newMessage.receiverId},{
                  $push:{
                      "chats.$.messages":{
                        $each:[
                         msg 
                        ]
                      }
                    }
                 })
               }).then(val => {
               
                Room.update({_id:newMessage.receiverId},
                  {$addToSet:{
                    "chats.Id":newMessage.senderId}}).then(room =>{
                    Room.update({_id:newMessage.receiverId,"chats.Id":newMessage.senderId},{
                      $push:{
                          "chats.$.messages":{
                            $each:[
                             msg 
                            ]
                          }
                        }
                     })
                   }).then(val => {
  
                    User.updateOne(
                      { _id: newMessage.receiverId,isOnline:false },
                      {
                        $push: {
                          messagessActive: {
                            $each: [
                              {
                                senderId : newMessage.senderId
                              }
                            ]
                          }
                        }
                      }
                    )
                      .then(val => {
                        console.log(val);
                       
                        if (val.nModified == 1) {
                          // io.to(`${newMessage.senderId}`).emit("msgSent",{msgId:newMessage.msgId, sent:true, receiverId:newMessage.receiverId}) //=======Message added notification to the sender =======//
                          
                         }
                         else 
                         {
                           User.findOne({_id:newMessage.senderId},{password:0,messagessActive:0}).then(user =>
                             {
                                       const newmsg = {
                                         senderUsername:user.username,
                                         senderPath:user.path,
                                         msg:msgOnline
                                       }
                                       io.to(`${newMessage.receiverId}`).emit("receivingMessage",newmsg) //=======Sending the message to the receiver=============//
                             })
                           
                         }
                      
                      
                      
                      
                      })
                     }) 
                   }) 
  
  
              })

  // =====================================
  //   Updating Unread messages===========
  // =====================================


  
          
 }


  




