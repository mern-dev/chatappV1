var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
var mongoose = require('mongoose');
const users = {  }
const userTab = {} 

module.exports = function(ioOnline,socket){
    // =====================================
  //  User is offline ====================
  // =====================================
  socket.on('disconnect', () => {
    
   
  
    let id = users[socket.id]
  
    if(userTab[id]>1)
    {
      userTab[id] = userTab[id] - 1;
    }
    else if(userTab[id]==1)
    {
      userTab[id]=0;
      let lastSeen =  new Date();
      User.updateOne({
        _id:id
        },
        {$set:{
            isOnline:false,
            lastSeen:lastSeen,
        }}).then(val => 
           {
            ioOnline.to("commonRoom").emit("lastSeen",{id:id,lastSeen:lastSeen})
           })

    }
   
    
  });
        
  
  
  // ====================================
  //  User is online =====================
  // =====================================
  socket.on("join",function(data)
  { 
      console.log('onoff');
     users[socket.id] = data.id;
     
     if(userTab[data.id])
     {
      userTab[data.id] = userTab[data.id] + 1;
     }
     else
     {
      
      userTab[data.id] =  1;
      ioOnline.to("commonRoom").emit("isOnline",{id:data.id})   //===================Emitting the user who is come online to other users==================//
     

     }
     
    socket.join("commonRoom");
    socket.join(`${data.id}`,() => {
     
      
     
     User.updateOne({
       _id:data.id
       },
       {$set:{
           isOnline:true 
       }}).then(val => 
          {
             
                
                   Room.aggregate([
                    {
                      $match: {
                        "_id" : mongoose.Types.ObjectId(data.id)
                      }
                    },
                  
                    {
                      $unwind: "$chats"
                    },
                     {
                      $sort: {
                         'chats.messages.sentTime':-1                           
                      }
                    }

                       
                   ]).then(res=>{
                      var chats = [];
                    
                      if(res.length===0)
                      {
                        
                        ioOnline.to(`${socket.id}`).emit("chat",null,false); 
                      }
                      else
                      {
                           var cnt = 0;
                        res.forEach(item =>
                          { 
                             User.findOne({_id:item.chats.Id},{password:0}).then(detail=>{
                                         let len=item.chats.messages.length;
                                        
                                         var latestmsg=[]
                                         if(len<10)
                                         {
                                           latestmsg= item.chats.messages;
                                         }
                                         else
                                         {
                                          latestmsg = item.chats.messages.slice(-10);
                                           if(!latestmsg[0].seen)
                                           { let temp=[]
                                             for(let i=0;item.chats.messages[i].id!=latestmsg[0].id;i++)
                                                {
                                                  if(!item.chats.messages[i].seen)
                                                  {
                                                     temp.push(item.chats.messages[i])
                                                  }
                                                }
                                                if(temp.length)
                                                {
                                                  latestmsg=[...temp,...latestmsg]
                                                }
                                           }

                                             
                                          }
                                          let chat  = {Id:item.chats.Id,username:detail.username,path:detail.path,isOnline:detail.isOnline,lastSeen:detail.lastSeen,status:detail.status,messages:latestmsg}
                                                                if(res.length===cnt)
                                                                {
                                                                  ioOnline.to(`${socket.id}`).emit("chat",chat,true); 
                                                                }
                                                                else
                                                                {
                                                                  ioOnline.to(`${socket.id}`).emit("chat",chat,false); 
                                                                }
                                         
                                        })
                                       
                                         
                               })

                      }
                    
                             
                             
                             
                        })
                       
                  
                    
                
                   
             
          });
        })
      })

        // =====================================
  //  User to send a message =============
  // =====================================
          
                    
  socket.on("postingMessage",function(newMessage){
       
    if(userTab[newMessage.senderId]>1)
    {
      ioOnline.to(`${newMessage.senderId}`).emit("postingMessgaeDevices",newMessage) 
    }
    const msg= {
       
        id:newMessage.id,
      msgBody:newMessage.msgBody,
      senderId:newMessage.senderId,
      receiverId:newMessage.receiverId,
     sentTime:new Date(newMessage.sentTime),
         sent:true,
         delivered:false,
         seen:false
     }
     const msgOnline= {
      id:newMessage.id,
    msgBody:newMessage.msgBody,
   sentTime:new Date(newMessage.sentTime),
       senderId:newMessage.senderId,
       receiverId:newMessage.receiverId,
       sent:true,
       delivered:false,
       seen:false
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
                              isOnline:newMessage.senderisOnline,
                              status:newMessage.senderStatus,
                              lastSeen:newMessage.senderLastSeen,
                               msg:msgOnline
                             }
                           
                             ioOnline.to(`${newMessage.senderId}`).emit("sentMessageSuccess",{receiverId:newMessage.receiverId,id:msgOnline.id})   //===============sent success to sender ===============//
                            ioOnline.to(`${newMessage.receiverId}`).emit("receivingMessage",newmsg) //=======Sending the message to the receiver=============//
                  
                 
               
            
            
            
            
          
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
                                               username:newMessage.senderUsername,
                                               path:newMessage.senderPath,
                                               isOnline:newMessage.senderisOnline,
                                               status:newMessage.senderStatus,
                                               lastSeen:newMessage.senderLastSeen,
                                               msg:msgOnline
                                             }
                                          
                                          ioOnline.to(`${newMessage.senderId}`).emit("sentMessageSuccess",{receiverId:newMessage.receiverId,id:msgOnline.id})  //===============sent success to sender ===============//
                                          ioOnline.to(`${newMessage.receiverId}`).emit("receivingMessage",newmsg) //=======Sending the message to the receiver=============
                                   
                                 
                               
                            
                            
                            
                        
                           }).catch(err =>{
                             console.log(err)
                           })  





                      })

            
       }

   })
})
}