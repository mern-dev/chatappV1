var mongoose = require('mongoose');
const time = {
        hours:{type:Number},
        minutes:{type:Number},
}
const date = {
        month:{type:Number},
        day:{type:Number},
        time:time

   }
const message = {
         msgBody:{ type: String },
         senderId:{type:String},
         senderName:{type:String},
         sentTime:date,
         read:{type:Boolean,default:false },
         sent:{type:Boolean,default:false },
}

// define the schema for our user model
var userSchema = mongoose.Schema({

   
        username  : { type: String,required: true  },
        password  : { type: String, required: true  },
        isOnline  : { type: Boolean, default:false },
        oldMessages : [message],
        newMessages : [message]  
  
   });
   

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);
module.exports = User;