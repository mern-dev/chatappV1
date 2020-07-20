var mongoose = require('mongoose');
//var Room = require('../models/room_model.js');
// define the schema for our user model
var userSchema = mongoose.Schema({

   
        username  : { type: String,required: true  },
        password  : { type: String, required: true  },
        isOnline  : { type: Boolean, default:true },
        lastSeen  : { type: Date,default:0},

        path : '',
        status:{type: String},


       


        messagesActive :[{senderId:{type:mongoose.Types.ObjectId,required:true}}],
  
  
   });
   

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);
module.exports = User;