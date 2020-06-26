var User = require('../models/user_model.js');
const isLoggedIn = require("./middleware.js");


module.exports = function (app) {

   

    app.post("/postmessage/:id",isLoggedIn,function(req,res)
    {
    
        const newMessage = {
            msgBody:req.body.msgBody,
           // senderName : req.body.senderName,
           senderId : req.params.id,
           //  sentTime : req.body.sentTime
        }
        
          
       const recieverId = req.body.recieverId;
       User.updateOne(
        { _id: recieverId },
        {
          $push: {
            newMessages: {
              $each: [
                {
                  msgBody: newMessage.msgBody,
                  date: new Date(),
                  senderId : newMessage.senderId
                }
              ],
              $sort: { date: -1 }
            }
          }
        }
      )
        .then(val => {
          console.log(val);
          if (val.nModified == 1) {

       
                 const io=req.app.get("io");
                   let listenObj = `user/sent/message/${recieverId}`;
                   //  console.log(io);
                      io.emit(listenObj, newMessage);
                  res.json({
                       status:"success",
                         message:"ur message was sent"
                          })
           }
   });
    })


  





}