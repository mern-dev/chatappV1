
var mongoose = require('mongoose');

module.exports=function(ioDp,socket){
  


  
  //=====================================
 // ====Updating  dp and status==========
 // =====================================

 socket.on("detailUpdate",function(data){

  socket.broadcast.emit("addDetailUpdate",data);
             })

          
 }

  
 




