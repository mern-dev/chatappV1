
var mongoose = require('mongoose');

module.exports=function(ioDp,socket){
  


  
  //=====================================
 // ====Updating  dp and status==========
 // =====================================

 socket.on("detailUpdate",function(data){

  ioDp.to("commonRoom").emit("addDetailUpdate",data);
             })

          
 }

  
 




