var mongoose = require('mongoose');
//var Room = require('../models/room_model.js');
// define the schema for our user model
var userSchema = mongoose.Schema({

   
        username  : { type: String,required: true  },
        password  : { type: String, required: true  },
        isOnline  : { type: Boolean, default:true },
        lastSeen  : { type: Date,default:0},

        path : {type:String,default:"https://firebasestorage.googleapis.com/v0/b/texting--dp.appspot.com/o/dp%2Fnodp.png?alt=media&token=533360ed-39f7-4938-b56d-1bd945818cbe"},
        status:{type: String},



  
   });
   

// create the model for users and expose it to our app
const User = mongoose.model('User', userSchema);
module.exports = User;