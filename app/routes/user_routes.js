var User = require('../models/user_model.js');
module.exports=function(io,socket){
        
        
  // =====================================
  //  User is online =============
  // =====================================
        socket.on("join",function(data)
        {
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
                          socket.emit("isOnline",{id:data.id})
                   }})
                })
           });

  // =====================================
  //  User to send a message =============
  // =====================================
          

        socket.on("postingMessage",function(newMessage){
                User.updateOne(
                        { _id: newMessage.recieverId },
                        {
                          $push: {
                            newMessages: {
                              $each: [
                                {
                                  msgBody: newMessage.msgBody,
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
                           io.to(`${newMessage.recieverId}`).emit("recievingMessage",newMessage)
                          }})
                 }) 

  // =====================================
  //  Unread messages updation ===========
  // =====================================


          
          
 }


  




