var User = require('../models/user_model.js');



 module.exports = function(server)
    {     const io = require("socket.io")(server)
          io.on("connection",function(socket)
        {
               //  socket.join("room");
                 
                 socket.on("/postingMessage",newMessage =>
                 { 
                    User.updateOne(
                    { _id: newMessage.recieverId },
                    {
                      $push: {
                        newMessages: {
                          $each: [
                            {
                              msgBody: newMessage.msgBody,
                              date: new Date(),
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
                       // socket.emit('/messageSent',)
                        socket.emit(`/recievingMessage/${newMessage.recieverId}`,newMessage);
                     
                    }})

                
                 
               })

              //  socket.on("/read", data =>{
                   
              //  })
                      
        });
     
      }

  


  





