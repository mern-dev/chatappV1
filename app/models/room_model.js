var mongoose = require('mongoose');

const message = {
    msgBody:{ type: String },
  //  senderId:{type:String,required:true},
   // receiverId:{type:String,required:true},
    sentTime:{type:Date},
    read:{type:Boolean,default:false },
    sent:{type:Boolean,default:false },
}

var roomSchema = mongoose.Schema({

     _id :{type:mongoose.Types.ObjectId,required:true},
     chats: { type : Array , "default" : [] },
     
    //  Messages :  { type : Array , "default" : [] },
     //newMessages :  { type : Array , "default" : [] }
    
    
     
      

},{ _id: false });


// create the model for users and expose it to our app
const Room = mongoose.model('room', roomSchema);
module.exports = Room;